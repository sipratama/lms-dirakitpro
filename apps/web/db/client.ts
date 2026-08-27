import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// `postgres()` itself is lazy (no connection attempt at construction), so this module can be
// safely imported during `next build`'s static page-data collection even when DATABASE_URL isn't
// set yet (e.g. building a Docker image before runtime env is injected). A missing/invalid
// DATABASE_URL will only surface as an error once a query actually runs.
const queryClient = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(queryClient, { schema });
