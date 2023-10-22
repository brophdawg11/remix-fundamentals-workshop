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
      secrets: ["s3crets"],
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

export function addItemToCartInSession(
  session: Session<SessionData>,
  variantId: string,
  quantity = 1
) {
  let cartItems = session.get("cartItems") || [];
  let existingItem = cartItems.find((c) => c.variantId === variantId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ variantId, quantity: quantity });
  }
  session.set("cartItems", cartItems);
  return session;
}

export { getSession, commitSession, destroySession, requireSession };
