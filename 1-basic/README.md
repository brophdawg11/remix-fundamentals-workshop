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

1. Customize the Remix server handler and add a custom `X-Remix: Rocks!` header to the HTML document response. ([hint](https://remix.run/docs/en/main/file-conventions/entry.server))
2. Extract the links in your `root.tsx` file into a `<Header>` component in a pathless layout and nest your `/` and `/about` pages inside the layout ([hint](https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls))
   - The URLs should remain `/` and `/about`
   - This will require re-naming your current route files

## Other Stuff

- Make some changes to markup or styles while the app is running. Do you see them automatically reflected in the browser?
  - HMR/HDR (Hot Module Revalidation and Hot Data Revalidation) work out of the box with `npm run dev` in Remix
- Check out what happens if you disable Javascript in your browser (or remove the [`<Scripts>`](https://remix.run/docs/en/main/components/scripts)'s component)? Does your app still work the same?
  - Remix is built to work with our without Javascript 🤯
- Add a bunch of stubbed content to your index route to make it super tall and add a link to `/about` way down at the bottom. Scroll down, click the link, and then click he back button. did you end up at the same scroll position on the index route?
  - Scroll position is handled automatically for you via the [`<ScrollRestoration>`](https://remix.run/docs/en/main/components/scroll-restoration) component in your root route
