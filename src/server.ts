import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

import { usersRoute } from "./routes/usersRoute";
import { auth } from "./utils/auth";
import { limiter } from "./config/rateLimiter";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use("*", logger());
// app.use(
//   "/api/auth/*",
//   cors({
//     origin: process.env.CLIENT_URL as string,
//     allowHeaders: ["Content-Type", "Authorization"],
//     allowMethods: ["POST", "GET", "OPTIONS"],
//     exposeHeaders: ["Content-Length"],
//     maxAge: 600,
//     credentials: true,
//   })
// );

// Apply the rate limiting middleware to all requests.
app.use("*", limiter);

// app.use(csrf({ origin: process.env.CLIENT_URL }));

// Allow specific sec-fetch-site values
// app.use(csrf({ secFetchSite: "same-origin" }));

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });
//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     await next();
//     return;
//   }
//   c.set("user", session.user);
//   c.set("session", session.session);
//   await next();
// });

// app.on(["POST", "GET"], "/api/auth/*", (c) => {
//   return auth.handler(c.req.raw);
// });

// util to get Buffer from FormData file
async function fileToBuffer(file: File) {
  const ab = await file.arrayBuffer();
  return Buffer.from(ab);
}

app.post("/api/optimize", async (c) => {
  const form = await c.req.formData();
  const file = form.get("file") as File | null;
  if (!file) return c.text("No file provided", 400);

  const width = Number(form.get("width") || 800);
  const height = Number(form.get("height") || 600);
  const fit = (form.get("fit") as string) || "cover";
  const quality = Number(form.get("quality") || 80);
  const position = (form.get("position") as string) || "center";

  const inputBuffer = await fileToBuffer(file);
  const sharp = await import("sharp");

  const outputBuffer = await sharp
    .default(inputBuffer)
    .rotate() // respect EXIF
    .resize(width, height, {
      fit, // "cover", "contain", etc.
      position, // 👈 crop position added here
    })
    .webp({ quality })
    .toBuffer();

  return c.body(outputBuffer, 200, { "Content-Type": "image/webp" });
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
