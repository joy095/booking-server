import { rateLimiter } from "hono-rate-limiter";

export const limiter = rateLimiter({
  windowMs: 60_1000, // seconds → 1 minute
  limit: 100, // 100 requests per IP per minute
  keyGenerator: (c) => {
    // Identify each client uniquely by IP
    return (
      c.req.header("x-forwarded-for") ||
      c.req.header("cf-connecting-ip") ||
      c.req.header("x-real-ip") ||
      "unknown-ip"
    );
  },
  message: "Too many requests from your IP — please try again later.",
  statusCode: 429,
  standardHeaders: true,
});