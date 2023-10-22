import {
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// 💡 You'll need to export a few new functions from here to complete this example

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 💡 And you'll need to render a few new components here as well */}
      </head>
      <body className="bg-gray-300">
        <h1 className="text-center text-3xl">Welcome to Remix Fundamentals</h1>

        <nav>
          {/* 💡 You can render links to the pages in the exercise here */}
        </nav>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
