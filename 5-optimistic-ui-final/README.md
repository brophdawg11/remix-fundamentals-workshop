# Exercise 5 - Pending and Optimistic UI

Every web application has to deal with a little slowness due to network latency. even on our high speed connections, things will be slow from time to time. And on our mobile devices, we're almost guaranteed to experience apps slower than developers experience them. It's crucial to consider these experiences when building apps for our users.

Thankfully, Remix makes Pending and Optimistic UI really straightforward out of the box with some of it's built-in hooks. This exercise builds on all of the previous onces and now adds the `Add to Bag` form to our product page.

We learned about creating Forms in Exercise 4, so we already created the Add to Bag form for you on the page. You can't tell from the UI - but if you submit it, it'll add to bag in your `action` via the `addItemToCartInSession()` call!

## Running the app

```sh
# From the repository root
npm run dev -w 5-optimistic-ui

# From the 5-optimistic-ui/ directory:
npm run dev
```

## Steps

1. First, let's slow down our Slow down add to bag so we have some "pending" time we can add a Pending UI in. You can do this by throttling your network connection to Slow 3G, or you can uncomment out the `await sleep(1000)` call in your action to sleep for a specified number of milliseconds.
2. Once slowed down, you can already see the full-page overlay spinner we wired up earlier in `root.tsx`, but instead - we want a more contextual pending indicator right on our button:
   - First, stop showing global loading indicator _only when the active navigation is an Add to Cart operation_ ([hint](https://remix.run/docs/en/main/hooks/use-navigation#navigationformdata))
   - Then, change the "Add to Cart" button to a disabled "Adding to bag..." button during submission
3. Let's add a cart count to the users header so they can see how many items they have, and see that update when they add to bag. Add the cart count to value returned from the `root.tsx` loader and then display it in your header next to the email address. (hint: you can get the cart items from the session).
4. Now, with your network throttled, click add to bag. See how the update for the count in the header is delayed? Let's _optimistically_ add the additional in-flight quantity to the value we're displaying so that it shows up immediately ([hint](https://remix.run/docs/en/main/hooks/use-navigation#navigationformdata)).
5. Sometimes, we also want a more obvious confirmation message that something worked. Let's try adding a success message below our Add to Cart button with [`session.flash`](https://remix.run/docs/en/main/utils/sessions#sessionflashkey-value).

## Extra Credit

1. Can you make the selected variant change the image on the left?
2. Add query param for selected variant for shareable URLs
3. Change the Add to Bag button to use a `<fetcher.Form>` ([hint](https://remix.run/docs/en/main/discussion/form-vs-fetcher), [hint](https://remix.run/docs/en/main/hooks/use-fetcher))
