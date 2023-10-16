# Exercise 0 - Shell

This shell contains the _simplest possible_ Remix application, consisting of a single `app/root.jsx` file (plus a `package.json` for dependencies).

## Running the app

To start your app in development mode, rebuilding assets on file changes, run the following from your terminal:

```sh
npm run dev
```

## Steps

None! This is just to strip away the cruft and show you what Remix can be at it's simplest. We'll start the exercises in `1-basic` with a slightly fuller starting point (favicon, Tailwind CSS, linting, TypeScript, `remix.config.js`), but to get started with Remix all you actually need is:

- Dependencies
  - `@remix-run/node` - Needed for Remix to run in a node environment
  - `@remix-run/serve` - Remix App Server, so you don't need to configure your own `express`/`koa`/etc. server
  - `@remix-run/dev` - Remix compiler and dev server
  - `isbot` - Used by the default Remix entry.server template
  - `react`
  - `react-dom`
- `root.tsx` - Renders your `<html>` document
