# Exercise 1 - Basic

This example starts with a very basic Remix application consisting of a single application file (`app/root.tsx`). In order to review the basic aspects of Remix, we're going to build that into a small app with a header/footer layout and a few pages we can navigate between.

## Running the app

```sh
# From the repository root
npm run dev -w 1-basic

# From the 1-basic/ directory:
npm run dev
```

## Steps

1. Add a `<title>` element and a `<meta>` tag of your choosing to your Remix app from the `root.tsx` route ([hint](https://remix.run/docs/route/meta))
2. Load the tailwind styles from `app/styles/tailwind.css` using a `<link>` tag in `root.tsx` ([hint](https://remix.run/docs/route/links))
   - This should apply a light grey background to the page and center the `Welcome to Remix Fundamentals` heading
3. Add two `<Link>`'s to your `root.tsx` route that link to `/` and `/about` ([hint](https://remix.run/docs/en/main/components/link))
   - These links will generate a 404 when clicked initially
4. Add route files for the 2 links above ([hint](https://remix.run/docs/en/main/discussion/routes))
5. Add page-specific `<title>`'s to your `/` and `/about` routes

## Extra Credit

1. Extract the links in your `root.tsx` file into a `<Header>` component in a pathless layout and nest your pages inside the layout ([hint](https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls))
   - The URLs should remain `/` and `/about`
   - This will require re-naming your current route files
2. Run `npx remix reveal` and check out the 2 new files it creates (`app/entry.client.tsx` and `app/entry.server.tsx`). These are the entry points for your server and client build. Remiox has default implementations so you onoly need them in your repo if you need to customie the behavior.
   - Try customizing the Remix server handler and add a custom `X-Remix: Rocks!` header to the HTML document response. ([hint](https://remix.run/docs/en/main/file-conventions/entry.server))

## Other Stuff

- Navigate between the two routes and keep an eye on the dev tools. Notice how the JS fields for the route only load when you load that page?
  - Remix automatically code-splits at the route level to keep you initial JS bundles small and your app speedy
  - This also includes any CSS files imported in your route and rendered via `links`!
- Make some changes to markup or styles while the app is running. Do you see them automatically reflected in the browser?
  - HMR/HDR (Hot Module Revalidation and Hot Data Revalidation) works out of the box with `npm run dev` in Remix
- Check out what happens if you disable Javascript in your browser (or remove the [`<Scripts>`](https://remix.run/docs/en/main/components/scripts)'s component)? Does your app still work the same?
  - Remix is built to work without/before Javascript 🤯
- Make your index route taller than the viewport and add a link to `/about` way down at the bottom. Scroll down, click the link, and then click the back button. did you end up at the same scroll position on the index route?
  - Here's a quick way to make it tall `<div className="mt-[3000px]">Spacer div</div>`
  - Scroll position is handled automatically for you via the [`<ScrollRestoration>`](https://remix.run/docs/en/main/components/scroll-restoration) component in your root route
