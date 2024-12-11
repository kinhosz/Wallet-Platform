# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

### Routes

If you want to create a new route, you need to add it manually in the `vite.config.ts` within `defineRoutes`.
It is better than remix default routes, as it allow us organize the code structure for each route separately.

However, you need to follow some conventions. For example, let's suppose you want to create an edit route for a transaction.
The expected path would be something like `/transactions/4/edit`, meaning you want to edit the transaction with an ID
equal to 4. Like the majority of our routes (for an authenticated user), all pages have a layout, in our case the `finance`
layout. Therefore, the folder hierarchy must be:

```sh
routes
|_ finance/
  |__ layout.tsx
  |__ ...
  |__ transactions/
     |__ layout.tsx
     |__ ...
     |__ edit.tsx
```

So, in the `vite.config.ts` route declaration, it must be:

```ts
route("/", "routes/finance/layout.tsx", () => {
    ... // any other nested routes
    route("transactions", "routes/finance/transactions/layout.tsx", () => {
        ... // any other nested routes
        route("/:id/edit", "routes/finance/transactions/edit.tsx");
    });
});
```

The `route` method expects 3 params, but the third is optional; it's for nested routes definitions.
The first param is the *relative path* compared to its parent, while the second one is the path for the file within
the `app` folder.

You can name the files anything you want, but we encourage use some conventions to help with project maintenance.

* Use `layout` for the files where the layout of the current folder is defined.
* Use the `index`, `edit`, `show` ... for views like `CRUD`.

It's now possible add in the same folder code that is used in a unique and specific route; it isn't necessary
add those files in the `components` anymore. For example, A table to display the transactions for a specific date
(which is very specific for the transactions route, right?)

documentation: https://remix.run/docs/en/main/file-conventions/vite-config
