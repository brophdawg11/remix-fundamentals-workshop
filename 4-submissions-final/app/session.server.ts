import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

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
    },
  });

async function requireSession(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.has("emailAddress")) {
    let sp = new URLSearchParams();
    sp.set("redirectTo", new URL(request.url).pathname);
    throw redirect(`/login?${sp.toString()}`);
  }
  return session;
}

export { getSession, commitSession, destroySession, requireSession };
