import {
  ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { fakeGetProduct, type Product } from "../data/api";
import { commitSession, requireSession } from "../session.server";

export async function action({ request, params }: ActionFunctionArgs) {
  let session = await requireSession(request);

  let fd = await request.formData();
  let productId = fd.get("productId") as string;
  let variantId = fd.get("variantId") as string;
  let quantity = fd.get("quantity") || ("1" as string);

  if (!productId || !variantId || !quantity) {
    return json({ ok: false, error: "Unable to add item to cart" });
  }

  let cartItems = session.get("cartItems") || [];
  cartItems?.push({ productId, variantId, quantity: Number(quantity) });
  session.set("cartItems", cartItems);

  return json(
    { ok: true, error: null },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireSession(request);

  let product = await fakeGetProduct(params.slug!);

  if (!product) {
    throw new Response(`No product found for slug: ${params.slug}`, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({ product });
}

export default function Component() {
  let data = useLoaderData<typeof loader>();

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-4">
        <ProductImage product={data.product} />
        <div>
          <ProductInfo product={data.product} />
          <AddToBagForm product={data.product} />
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center">
        <h1 className="mt-10 text-xl">
          {error.status} {error.statusText}
        </h1>
        <p className="mt-2 text-sm">{error.data}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="text-center">
        <h1 className="mt-10 text-xl">Unknown Server Error</h1>
        <p className="mt-2 text-sm">{error.message}</p>
      </div>
    );
  }

  return <h1 className="mt-10 text-center text-xl">Unknown Server Error</h1>;
}

function ProductImage({ product }: { product: Product }) {
  return (
    <div className="aspect-h-10 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
      <img
        src={product.variants[0].image.url}
        alt=""
        className="object-cover"
      />
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  let formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: product.variants[0].price.currencyCode,
  }).format(parseFloat(product.variants[0].price.amount));

  return (
    <div>
      <h1 className="mb-2 text-3xl">{product.title}</h1>
      <p className="block text-sm font-light text-gray-500">
        {product.description}
      </p>
      <div className="my-2 flex items-center justify-between">
        <div className="text-gray-700">{formattedPrice}</div>
      </div>
    </div>
  );
}

function AddToBagForm({ product }: { product: Product }) {
  return (
    <Form method="post">
      <input type="hidden" name="productId" value={product.id} />
      <fieldset className="mb-4">
        {product.variants.map((v, idx) => (
          <label key={v.id} className="mr-4">
            <input
              type="radio"
              name="variantId"
              value={v.id}
              defaultChecked={idx === 0}
            />
            <img
              src={v.image.url}
              alt=""
              className="ml-1 inline-block h-20 w-20"
            />
          </label>
        ))}
      </fieldset>
      <label className="mb-4 block">
        Quantity:
        <select
          name="quantity"
          className="ml-2 inline-block rounded-lg border p-1"
        >
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="ml-1 rounded bg-gray-200 p-1 pl-2 pr-2 text-sm hover:bg-gray-300"
      >
        Add to Bag
      </button>
    </Form>
  );
}
