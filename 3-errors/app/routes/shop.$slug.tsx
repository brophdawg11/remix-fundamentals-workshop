import { json, MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { type Product, fakeGetProduct } from "../data/api";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.product?.title || "Product Page",
    },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  let product = await fakeGetProduct(params.slug!);

  // 💡 Step 4 - You'll be adding some checks and a different return value here

  return json({ product });
}

export default function Component() {
  let data = useLoaderData<typeof loader>();

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-4">
        <ProductImage product={data.product} />
        <ProductInfo product={data.product} />
      </div>
    </div>
  );
}

// 💡 Step 2 - You'll need to export a new function from this file

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
