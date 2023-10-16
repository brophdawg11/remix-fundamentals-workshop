# Exercise 3 - Errors

So far we've been pretty optimistic about our application code and data loading. But inevitably something's going to go wrong, so let's see how Remix handles errors in your application.

This builds on Example 2 and adds a "Product Detail Page" you can click to to see individual product details. But what happens if the product can't be loaded or you provide a product slug that doesn't exist? You'll be working primarily in `app/root.tsx` `app/routes/shop.$slug.tsx` in this exercise.

Let's see what happens when we force an error - our `fakeGetProduct()` call will throw a an error if we try to load a product with the slug `error`, so try loading http://localhost:3000/shop/error and see what happens.

## Running the app

```sh
# From the repository root
npm run dev -w 3-errors

# From the 3-errors/ directory:
npm run dev
```

## Steps

1. Let's make our error UI a bit more user-friendly by adding an `ErrorBoundary` in `app/root.tsx` to display the `error.message` ([hint](https://remix.run/docs/en/main/route/error-boundary), [hint](https://remix.run/docs/en/main/hooks/use-route-error), [hint](https://remix.run/docs/en/main/guides/errors))
   - Remix automatically catches any errors thrown from `loader` or `action` functions and renders them into the `ErrorBoundary`. Neat!
2. It's a bummer we lose the header when we render the `ErrorBoundary`, let's see if we can update our app to render it at the `shop.$slug.tsx` route instead of the root route ([hint](https://remix.run/docs/en/main/guides/errors#nested-error-boundaries))
3. What happens if we load an invalid slug, such as http://localhost:3000/shop/junk? We get an `undefined` `product` returned from our `loader`, and we throw an error from our `Component` which _also_ gets caught by our `ErrorBoundary`
   - Remix also automatically catches any render errors renders them into the `ErrorBoundary`!
4. We don't want a render-error for an invalid slug though, we should probably be returning a [404 Response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404). Let's update the loader to detect when a product is not found for the given slug and return a 404 Response instead - and display a message slug as "No product found for slug: {slug}" in our `ErrorBoundary` ([hint](https://remix.run/docs/en/main/guides/not-found), [hint](https://remix.run/docs/en/main/utils/is-route-error-response))

## Extra Credit

1. What if we want to log our errors to the server-console in a custom manner, or send them to a third party service such as Sentry or BugSnag? Go ahead and run `npx remix reveal` to gain the ability to customize your `entry.server.tsx` and look into adding custom logging for uncaught SSR errors ([hint](https://remix.run/docs/en/main/file-conventions/entry.server#handleerror))

## Notes

- Remix renders an `ErrorBoundary` any time a `loader`/`action`/`Component` _throws_ something. Usually that's an `Error` for something unexpected, but you can also throw `Response` instances for handled scenarios such as 4xx errors.
- Notice the stack trace you see in the browser for `npm run dev`. In development mode, you can see where the server-side error came from for easy debugging. However, if you run `npm run build`/`npm run start` to run a production application - you'll see that Remix automatically strips any stack traces from server errors and sends a generic `error.message` so as not to leak any server-side sensitive information to the client.
