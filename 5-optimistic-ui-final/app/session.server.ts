import { Session, createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface SessionData {
  emailAddress: string;
  cartItems: CartItem[];
  flashMessage: string;
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

export async function addItemToCartInSession(
  session: Session<SessionData>,
  variantId: string,
  quantity = 1,
) {
  await sleep(1000);
  let cartItems = session.get("cartItems") || [];
  cartItems?.push({ variantId, quantity: quantity });
  session.set("cartItems", cartItems);
  return session;
}

// Utility sleep function to slow down your data loads for Pending/Optimistic UI work
function sleep(ms = 500) {
  return new Promise((r) => setTimeout(r, ms));
}

export { getSession, commitSession, destroySession, requireSession };
