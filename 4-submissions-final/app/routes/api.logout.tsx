import { ActionFunctionArgs, redirect } from "@remix-run/node";

import { destroySession, getSession } from "../session.server";

export async function action({ request }: ActionFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
