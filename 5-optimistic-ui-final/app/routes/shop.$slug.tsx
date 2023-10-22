import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import React from "react";

import { fakeGetProduct, type Product } from "../data/api";
import {
  addItemToCartInSession,
  commitSession,
  requireSession,
} from "../session.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data ? data.product.title : "Product Page",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  let session = await requireSession(request);

  let fd = await request.formData();
  let variantId = fd.get("variantId") as string;
  let quantity = fd.get("quantity") || ("1" as string);

  if (!variantId || !quantity) {
    return json({ ok: false, error: "Unable to add item to cart" });
  }

  addItemToCartInSession(session, variantId, Number(quantity));

  session.flash("flashMessage", "Item added to bag!");

  // 💡 Uncomment to slowdown your add to cart for the Pending/Optimistic UI work
  // await sleep(1000)

  throw redirect(".", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  let session = await requireSession(request);

  let product = await fakeGetProduct(params.slug!);

  if (!product) {
    throw new Response(`No product found for slug: ${params.slug}`, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json(
    {
      product,
      flashMessage: session.get("flashMessage"),
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function Component() {
  let data = useLoaderData<typeof loader>();

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-4">
        <ProductImage product={data.product} />
        <div>
          <ProductInfo product={data.product} />
          <AddToBagForm
            product={data.product}
            flashMessage={data.flashMessage}
          />
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
  let selectedVariant = useSelectedVariant(product);
  let variant =
    product.variants.find((v) => v.id === selectedVariant.id) ||
    product.variants[0];
  return (
    <div className="aspect-h-10 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
      <img src={variant.image.url} alt="" className="object-cover" />
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  let selectedVariant = useSelectedVariant(product);
  let formattedPrice = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: selectedVariant.price.currencyCode,
  }).format(parseFloat(selectedVariant.price.amount));

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

function AddToBagForm({
  product,
  flashMessage,
}: {
  product: Product;
  flashMessage: string | undefined;
}) {
  let navigation = useNavigation();
  let isAddingToBag = navigation.formData?.get("variantId") != null;
  let [, setSearchParams] = useSearchParams();
  let selectedVariant = useSelectedVariant(product);
  let [localFlashMessage, setLocalFlashMessage] = React.useState<
    string | undefined
  >(flashMessage);
  let idRef = React.useRef<number>(0);

  React.useEffect(() => {
    let id = idRef.current;
    if (navigation.state === "idle" && flashMessage) {
      clearTimeout(id);
      setLocalFlashMessage(flashMessage);
      idRef.current = setTimeout(
        () => setLocalFlashMessage(undefined),
        1000
      ) as unknown as number;
    } else {
      clearTimeout(id);
    }
  }, [flashMessage, navigation.state]);

  function onVariantSelected(e: React.ChangeEvent<HTMLInputElement>) {
    let variantId = e.currentTarget.value;
    if (variantId != null && selectedVariant.id !== variantId) {
      setSearchParams(new URLSearchParams({ variantId }), { replace: true });
    }
  }

  return (
    <Form method="post">
      <fieldset className="mb-4">
        {product.variants.map((v, idx) => (
          <label key={v.id} className="mr-4">
            <input
              type="radio"
              name="variantId"
              value={v.id}
              defaultChecked={
                selectedVariant ? selectedVariant.id === v.id : idx === 0
              }
              onChange={onVariantSelected}
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
        disabled={isAddingToBag}
        className={`ml-1 rounded bg-gray-200 p-1 pl-2 pr-2 text-sm hover:bg-gray-300 ${
          isAddingToBag ? "opacity-50" : ""
        }`}
      >
        {isAddingToBag ? "Adding to Bag..." : "Add to Bag"}
      </button>
      {flashMessage ? (
        <span className="ml-2 inline-block text-sm text-green-500">
          {localFlashMessage}
        </span>
      ) : null}
    </Form>
  );
}

function useSelectedVariant(product: Product) {
  let [searchParams] = useSearchParams();
  let selectedVariant = searchParams.get("variantId");
  return (
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0]
  );
}

// Utility sleep function to slow down your add to cart
function sleep(ms = 500) {
  return new Promise((r) => setTimeout(r, ms));
}
