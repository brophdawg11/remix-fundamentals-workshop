# Exercise 2 - Data

This example is all about **Data**, specifically loading data and displaying it in a Remix application. We'll start with an empty page and build that into an E-Commerce "Product Listing Page" that shows products, prices, descriptions, and allows for pagination and sorting. The skeleton of this page is available in `app/routes/_index.tsx`, along with some comment hints to help you get started.

## Running the app

```sh
# From the repository root
npm run dev -w 2-data

# From the 2-data/ directory:
npm run dev
```

## Steps

1. Let's get some products rendering on the page by adding a `loader` to our route using the provided `fakGetProducts()` "API" call ([hint](https://remix.run/docs/en/main/route/loader), [hint](https://remix.run/docs/en/main/hooks/use-loader-data))
   - To load products: `let { products } = await fakeGetProducts()`
   - You can render the loaded products using the existing `ProductGrid`/`ProductCard` components
2. Add pagination of the products showing 4 products per page
   - Before you reach for `useState`, try to do your sorting on the server in the `loader` to avoiding shipping sorting logic to the client bundle ([hint](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams))
   - `fakeGetProducts` accepts an optional page number as the first parameter and returns pagination data you can destructure off the result
     - `let { products, totalPages, hasPrevPage, hasNextPage } = await fakeGetProducts(2)`
   - Provide the user "Previous Page" and "Next Page" links
   - Provide a "Page X of Y" indicator so the user can orient themselves
3. Add a sorting option to sort products by Ascending or Descending price
   - `fakeGetProducts()` accepts an optional sorting parameter: `fakeGetProducts("Ascending")` or `fakeGetProducts("Descending")`
4. Add a Pending UI spinner to `root.tsx` that shows when sorting or pagination is processing ([hint](https://remix.run/docs/en/main/hooks/use-navigation))
   - There is a `<FullPageSpinner/>` component in the root route that you can leverage, or feel free to make your own!
   - Throttle your network connection to Slow 3G to slow down the pagination/sorting operations

### Extra Credit

1. Can you enable a dropdown to let the uer choose the page size (4, 8, or "All")?
2. Do your sorting and pagination options work with JS Disabled?
   - This is easiest to do with links, but bonus points if you can do this with a `<select>`/`<Form>`
3. Do you see a flicker of the loading spinner on non-throttled navigations? Can you avoid this and only show it when the navigation takes >250ms?
