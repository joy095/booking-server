import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

import { usersRoute } from "./routes/users";
import { auth } from "./utils/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use("*", logger());
app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.use(csrf({ origin: "http://localhost:5173" }));

// Allow specific sec-fetch-site values
app.use(csrf({ secFetchSite: "same-origin" }));

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// 🟢 Simple hello route
app.get("/api/hello", (c) =>
  c.json({ message: "Hello from Hono + Better Auth!" })
);

// 🟢 Test session route
app.get("/api/me", async (c) => {
  const session = await auth.api.getSession(c.req.raw);
  return c.json({ session });
});

app.get("/api/users", usersRoute);

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
