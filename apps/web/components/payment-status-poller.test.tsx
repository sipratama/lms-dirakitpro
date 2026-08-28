import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PaymentStatusPoller } from "./payment-status-poller";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

describe("PaymentStatusPoller", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    refresh.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders nothing", () => {
    const { container } = render(<PaymentStatusPoller />);
    expect(container).toBeEmptyDOMElement();
  });

  it("calls router.refresh() every 3 seconds while mounted", () => {
    render(<PaymentStatusPoller />);

    expect(refresh).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);
    expect(refresh).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(3000);
    expect(refresh).toHaveBeenCalledTimes(2);
  });

  it("stops polling after unmount", () => {
    const { unmount } = render(<PaymentStatusPoller />);

    vi.advanceTimersByTime(3000);
    expect(refresh).toHaveBeenCalledTimes(1);

    unmount();

    vi.advanceTimersByTime(9000);
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});
