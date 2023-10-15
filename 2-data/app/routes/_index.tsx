import { json, type LoaderFunctionArgs } from "@remix-run/node";
import * as React from "react";

import { type Product, fakeGetProducts } from "../data/api";

export async function loader({ request }: LoaderFunctionArgs) {
  // 💡 Step 1 - let's return and render some products via fakeGetProducts!
  return json({ products: [] });
}

export default function Component() {
  return (
    <>
      <div className="p-10">
        <div className="m-auto w-[50%] pb-4">
          {/* 💡 Steps 2 & 3 - Add your pagination and sorting controls in here */}
        </div>

        <ProductGrid>
          {/*
            💡 Step 1 - render products from your loader in here with:
                 <ProductCard product={product} />
          */}
        </ProductGrid>
      </div>
    </>
  );
}

function ProductGrid({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {children}
    </ul>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <li className="relative">
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </li>
  );
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
    <>
      <div className="my-2 flex items-center justify-between">
        <div>
          <p className="block truncate font-medium text-gray-900">
            {product.title}
          </p>
          <div className="text-gray-700">{formattedPrice}</div>
        </div>
      </div>
      <p className="block text-sm font-light text-gray-500">
        {product.description}
      </p>
    </>
  );
}
