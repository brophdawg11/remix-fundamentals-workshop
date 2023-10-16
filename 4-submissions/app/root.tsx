import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import * as React from "react";

import { getSession } from "./session.server";
import styles from "./styles/tailwind.css";

export const meta: MetaFunction = () => [
  {
    title: "The Remix Shop",
  },
];

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  let session = await getSession(request.headers.get("Cookie"));
  return json({
    emailAddress: session.get("emailAddress"),
  });
}

export default function App() {
  let data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mt-4 grid grid-cols-3 text-center">
          <div className="grow"></div>
          <div className="grow align-middle">
            <Link to="/" className="text-3xl">
              The Remix Shop
            </Link>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <div>
              {data.emailAddress ? (
                <Form
                  method="post"
                  action="/api/logout"
                  replace
                  className="inline-block"
                >
                  <span>{data.emailAddress}</span> (
                  <button type="submit" className="underline">
                    Logout
                  </button>
                  )
                </Form>
              ) : (
                <Link to="/login" className="underline">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
        <Outlet />
        <DelayedSpinner />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function DelayedSpinner() {
  let navigation = useNavigation();
  let [showSpinner, setShowSpinner] = React.useState(false);
  let idRef = React.useRef(0);

  React.useEffect(() => {
    let id: number;
    if (navigation.state !== "idle") {
      id = setTimeout(() => setShowSpinner(true), 250) as unknown as number;
      idRef.current = id;
    } else {
      clearTimeout(idRef.current);
      setShowSpinner(false);
    }
    return () => clearTimeout(id);
  }, [navigation.state]);

  return showSpinner ? <FullPageSpinner /> : null;
}

function FullPageSpinner() {
  return (
    <div className="absolute left-0 top-0 h-full w-full items-center bg-white opacity-70">
      <div
        role="status"
        className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
