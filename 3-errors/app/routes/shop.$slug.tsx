import { json, type LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { type Product, fakeGetProduct } from "../data/api";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.slug) {
    throw new Error("No slug provided");
  }

  let product = await fakeGetProduct(params.slug);

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
      <h1 className="mb-2 text-3xl">{data.product.title}</h1>
      <div className="grid grid-cols-2 gap-4">
        <ProductImage product={data.product} />
        <ProductInfo product={data.product} />
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
      <p className="block text-sm font-light text-gray-500">
        {product.description}
      </p>
      <div className="my-2 flex items-center justify-between">
        <div className="text-gray-700">{formattedPrice}</div>
      </div>
      <div>⭕️ Add variants here...</div>
      <button
        type="submit"
        className="rounded bg-gray-200 p-1 pl-2 pr-2 text-sm hover:bg-gray-300"
      >
        Add to Cart
      </button>
    </div>
  );
}
