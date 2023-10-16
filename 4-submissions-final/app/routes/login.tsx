import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { validateEmailAndPassword } from "../data/api";
import { commitSession, getSession } from "../session.server";

export async function action({ request }: ActionFunctionArgs) {
  let fd = await request.formData();
  let email = fd.get("email") as string;
  let password = fd.get("password") as string;

  if (!(await validateEmailAndPassword(email, password))) {
    return json({ error: "Invalid login attempt" });
  }

  let session = await getSession(request.headers.get("Cookie"));
  session.set("userId", email);

  throw redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: ActionFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    throw redirect("/");
  }
  return null;
}

export default function Component() {
  let actionData = useActionData<typeof action>();
  return (
    <Form method="post" className="m-auto mt-10 w-[50%]">
      <p className="mb-6 text-center">Please login to continue</p>
      <div className="mb-6">
        <label className="mb-2 block text-sm">
          Email Address:
          <input
            name="email"
            type="email"
            className="block w-full rounded-lg border p-2.5"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm">
          Password:
          <input
            name="password"
            type="password"
            className="block w-full rounded-lg border p-2.5"
            required
          />
        </label>
      </div>
      {actionData ? <p className="text-red-500">{actionData.error}</p> : null}
      <div className="text-right">
        <button
          type="submit"
          className="ml-1 rounded bg-gray-200 p-1 pl-2 pr-2 text-sm hover:bg-gray-300"
        >
          Login
        </button>
      </div>
    </Form>
  );
}
