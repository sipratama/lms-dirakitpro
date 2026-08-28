import { beforeEach, describe, expect, it, vi } from "vitest";
import { orders, payments } from "@/db/schema";

const { createSnapTransaction } = vi.hoisted(() => ({
  createSnapTransaction: vi.fn(),
}));

vi.mock("@/lib/midtrans", () => ({
  createSnapTransaction,
}));

const { db } = vi.hoisted(() => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("@/db/client", () => ({ db }));

// A minimal stand-in for Drizzle's fluent query builder: every chained method
// (`.from()`, `.where()`, `.limit()`, `.values()`, `.set()`, `.returning()`)
// returns the same chainable object, and the object itself is thenable so
// `await` resolves to `result` no matter where in the chain the caller stops
// (checkout.ts awaits some chains after `.limit()`, others after `.returning()`,
// and the payments insert directly after `.values()`).
function chain(result: unknown) {
  const node: Record<string, unknown> = {
    from: () => node,
    where: () => node,
    limit: () => node,
    values: () => node,
    set: () => node,
    returning: () => node,
    then: <TResult1 = unknown, TResult2 = never>(
      onFulfilled?:
        ((value: unknown) => TResult1 | PromiseLike<TResult1>) | null,
      onRejected?:
        ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
    ) => Promise.resolve(result).then(onFulfilled, onRejected),
  };
  return node as PromiseLike<unknown> & Record<string, unknown>;
}

const { createCheckoutOrder } = await import("./checkout");

describe("createCheckoutOrder — orphan PENDING order on Midtrans failure (Bug 1)", () => {
  const course = {
    id: "course-1",
    title: "Belajar TypeScript",
    isFree: false,
    priceAmount: 150000,
    currency: "IDR",
  };
  const newOrder = { id: "order-1", totalAmount: 150000 };
  const user = { displayName: "Budi", email: "budi@example.com" };

  beforeEach(() => {
    vi.clearAllMocks();

    db.select
      .mockReturnValueOnce(chain([course])) // course lookup
      .mockReturnValueOnce(chain([])) // existing enrollment
      .mockReturnValueOnce(chain([])) // existing pending order
      .mockReturnValueOnce(chain([user])); // user lookup

    db.insert.mockReturnValueOnce(chain([newOrder])); // orders insert (.returning())

    db.delete.mockReturnValueOnce(chain(undefined));
  });

  it("deletes the orphaned order and rethrows when createSnapTransaction fails", async () => {
    const midtransError = new Error(
      "Midtrans Snap transaction gagal (status 500)",
    );
    createSnapTransaction.mockRejectedValueOnce(midtransError);

    await expect(
      createCheckoutOrder("user-1", "belajar-typescript"),
    ).rejects.toThrow(midtransError);

    expect(db.delete).toHaveBeenCalledTimes(1);
    expect(db.delete).toHaveBeenCalledWith(orders);

    // The payments row must never be created for the order that got rolled back.
    expect(db.insert).not.toHaveBeenCalledWith(payments);
  });

  it("creates the payments row and returns a snap token on success", async () => {
    createSnapTransaction.mockResolvedValueOnce({
      token: "snap-token-abc",
      redirectUrl: "https://example.com/redirect",
    });
    db.insert.mockReturnValueOnce(chain(undefined)); // payments insert

    const result = await createCheckoutOrder("user-1", "belajar-typescript");

    expect(result).toEqual({
      ok: true,
      orderId: "order-1",
      snapToken: "snap-token-abc",
    });
    expect(db.delete).not.toHaveBeenCalled();
    expect(db.insert).toHaveBeenCalledWith(payments);
  });
});
