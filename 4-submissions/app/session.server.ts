import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

// This is the data we'll be storing in our session
export interface SessionData {
  emailAddress: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      // All params here are optional with reasonable default values
      name: "my-session",
      httpOnly: true,
      maxAge: 3600, // 1 hour
      secure: true,
      secrets: ["s3crets"],
    },
  });

export { getSession, commitSession, destroySession };
