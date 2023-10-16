import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { validateEmailAndPassword } from "../data/api";
import { commitSession, getSession } from "../session.server";

export async function action({ request }: ActionFunctionArgs) {
  let fd = await request.formData();
  let emailAddress = fd.get("emailAddress") as string;
  let password = fd.get("password") as string;

  if (!validateEmailAndPassword(emailAddress, password)) {
    return json({ error: "Invalid login attempt" });
  }

  let session = await getSession(request.headers.get("Cookie"));
  session.set("emailAddress", emailAddress);

  let redirectTo = fd.get("redirectTo") as string;
  throw redirect(redirectTo || "/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request }: ActionFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  if (session.has("emailAddress")) {
    throw redirect("/");
  }
  return {
    redirectTo: new URL(request.url).searchParams.get("redirectTo") || "/",
  };
}

export default function Component() {
  let data = useLoaderData<typeof loader>();
  let actionData = useActionData<typeof action>();
  return (
    <Form method="post" className="m-auto mt-10 w-[50%]">
      <input type="hidden" name="redirectTo" defaultValue={data.redirectTo} />
      <p className="mb-6 text-center">Please login to continue</p>
      <div className="mb-6">
        <label className="mb-2 block text-sm">
          Email Address (anything will work):
          <input
            name="emailAddress"
            type="email"
            defaultValue="test@test.com"
            className="block w-full rounded-lg border p-2.5"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm">
          Password (hint: remixrocks):
          <input
            name="password"
            type="password"
            defaultValue="remixrocks"
            className="block w-full rounded-lg border p-2.5"
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
