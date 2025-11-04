import { Context } from "hono";
import { auth } from "../utils/auth";

export async function usersRoute(c: Context) {
  const session = await auth.api.getSession(c.req.raw);

  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({
    message: "Welcome to protected user route!",
    user: session.user,
  });
}
