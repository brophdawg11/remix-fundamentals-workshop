import * as React from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import { type Product, fakeGetProducts } from "../data";

export async function loader({ request }: LoaderFunctionArgs) {
  let searchParams = new URL(request.url).searchParams;

  // Pagination
  let page = parseInt(searchParams.get("page") || "1", 10);
  let pageSize: number | "All" =
    searchParams.has("page-size") && searchParams.get("page-size") !== "All"
      ? parseInt(searchParams.get("page-size") || "8", 10)
      : "All";

  let isPaginated = pageSize !== "All";
  let sort = searchParams.get("sort");
  let { products, numPages, hasPrevPage, hasNextPage } = isPaginated
    ? await fakeGetProducts(page as number, pageSize as number, sort)
    : await fakeGetProducts(undefined, undefined, sort);

  let prevPageHref = null;
  let nextPageHref = null;
  if (isPaginated) {
    if (hasPrevPage) {
      let prevParams = new URLSearchParams(searchParams);
      if (page === 2) {
        prevParams.delete("page");
      } else {
        prevParams.set("page", String((page as number) - 1));
      }
      prevPageHref = `?${prevParams.toString()}`;
    }

    if (hasNextPage) {
      let nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String((page as number) + 1));
      nextPageHref = `?${nextParams.toString()}`;
    }
  }

  return json({
    page,
    pageSize,
    products,
    isPaginated,
    numPages,
    prevPageHref,
    nextPageHref,
  });
}

export default function Component() {
  let data = useLoaderData<typeof loader>();

  return (
    <>
      <div className="p-10">
        <div className="m-auto w-[50%] pb-4">
          <PageSizeDropdown />
          {data.isPaginated ? <PaginationBar /> : null}
        </div>
        <ProductGrid>
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </div>
    </>
  );
}

function PaginationBar() {
  let data = useLoaderData<typeof loader>();

  return (
    <div className="flex pt-2 text-center text-sm">
      <div className="grow">
        {data.prevPageHref ? (
          <Link to={data.prevPageHref} className="grow underline">
            ⬅️ Previous
          </Link>
        ) : (
          <span className="grow opacity-50">⬅️ Previous Page</span>
        )}
      </div>

      <div className="grow">
        Page {data.page} of {data.numPages}
      </div>

      <div className="grow">
        {data.nextPageHref ? (
          <Link to={data.nextPageHref} className="grow underline">
            Next ➡️
          </Link>
        ) : (
          <span className="grow opacity-50">Next Page ➡️</span>
        )}
      </div>
    </div>
  );
}

function PageSizeDropdown() {
  let data = useLoaderData<typeof loader>();
  let navigate = useNavigate();

  return (
    <div className="flex text-center">
      <label className="grow">
        <span>Products per page:</span>{" "}
        <select
          defaultValue={data.pageSize}
          className="rounded-lg border p-1 text-sm"
          onChange={(e) => navigate(`?page-size=${e.target.value}`)}
        >
          {["4", "8", "All"].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
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
