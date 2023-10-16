# Exercise 4 - Submissions (and Sessions)

Our app would be pretty boring if all we could do was _load_ data, right? We also need to be able to _submit_ and _store_ data if we're going to build anything interesting. LEt's see how we can do that in Remix.

This builds on Example 3 and adds user authentication and a protected "Product Detail Page" that you must be logged in to access. You'll be working mostly in new routes for this exercise: `routes/login.tsx`, `routes/api.logout.tsx`, and `routes/shop.$slug.tsx`. Clicking on an item in the PLP (Product Listing Page) will navigate you to the PDP.

## Running the app

```sh
# From the repository root
npm run dev -w 4-submissions

# From the 4-submissions/ directory:
npm run dev
```

## Steps

In `session.server.tsx`, we provide a Remix session instance you can use to track if a user is logged in via an email address ([Sessions](https://remix.run/docs/utils/sessions)). The session will be stored in a `__session` cookie in the browser.

If you need to inspect the cookie contents for debugging, you can do so with:

```js
atob(decodeURIComponent("cookie-value".split(".")[0]));
```

1. Let's start in `routes/login.tsx` - create a simple `<Form method="post">` with 2 `<input>`'s (`emailAddress` and `password`) and a submit button to log in ([hint](https://remix.run/docs/en/main/components/form), [hint](https://remix.run/docs/en/main/guides/form-validation))
2. Oh no! I see `405 Method Not Allowed` when I submit the form! We need to add an `action` to our login route to handle the form POST submission ([hint](https://remix.run/docs/en/main/route/action))
   - You can use [`request.formData`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) to grab the data submitted for the form
   - Use the provided `validateEmailAndPassword(email, password)` to check if the user provided a valid email and password combination (any email and the password `remixrocks` will validate)
3. For successful login attempts, store the email address in the [`session`](https://remix.run/docs/en/main/utils/sessions) using `session.set()` and redirect the user back to the `/` route ([hint](https://remix.run/docs/en/main/utils/sessions#session-api), [hint](https://remix.run/docs/en/main/utils/redirect))
   - Don't forget to commit the session and update the cookie with a `Set-Cookie` header! ([hint](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie))
   - If done right, you should see the logged-in email address displayed in the header
4. For unsuccessful login attempts, return an error message and display it in the form ([hint](https://remix.run/docs/en/main/guides/form-validation))
5. Once you've got the login wired up, we need to wire up the `Logout` button in the header. Implement the `action` in `api.logout.tsx` to destroy the session and clear the cookie ([hint](https://remix.run/docs/en/main/utils/sessions#using-sessions))

## Extra Credit

1. Let's pretend this is a VIP E-Commerce store and we only want logged-in users to be able to see the PDP page (`slop.$slug.tsx`). Detect if the user is logged in for that route and redirect them to the `/login` page if not.
2. Even more bonus points if you can send them back to the redirecting PDP on successful login!
3. Redirect logged in users from `/login -> /`

## Notes

- Normally, you'd probably be using a backend data store of some sort to track the logged-in user information, and you'd only store a session identifier in the session cookie. For simplicity in this workshop, we're storing all of our data in the cookie so we don't need to wire up a Database or anything.
- We use HTTP only cookies for our session for added security, since they cannot be read by client-side Javascript.
- The Remix session API is a convenience wrapper around the Remix [Cookie](https://remix.run/docs/en/main/utils/cookies) APIs. So if you want to go a bit lower level or have other cookie requirements you cn check those out too.
