import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface SessionData {
  userId: string;
  cartItems: CartItem[];
}

interface SessionFlashData {
  error: string;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>();

async function requireSession(request: Request) {
  let session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    throw redirect("/login");
  }
  return session;
}

export { getSession, commitSession, destroySession, requireSession };
