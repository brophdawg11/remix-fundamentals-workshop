import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteContact } from "../data";

export async function action({ request, params }: ActionArgs) {
  invariant(params.contactId, "Missing contactId param");

  let contact = await deleteContact(params.contactId);

  return redirect("/");
}
