import fakeProductsResponse from "./products";

export type Product = ReturnType<typeof getNormalizedProducts>[0];

export async function fakeGetProducts(
  page?: number,
  pageSize = 8,
  sort?: string | null,
): Promise<{
  products: Product[];
  numPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}> {
  // Uncomment to slow down your data loads
  // await sleep();

  let products = getNormalizedProducts();

  if (sort === "Descending") {
    products = sortProducts(products, true);
  } else if (sort === "Ascending") {
    products = sortProducts(products, false);
  }

  if (page && pageSize && page > 0 && pageSize > 0) {
    let start = (page - 1) * pageSize;
    // Return paginated products
    return {
      products: products.slice(start, start + pageSize),
      numPages: Math.ceil(products.length / pageSize),
      hasPrevPage: page > 1,
      hasNextPage: start + pageSize < products.length,
    };
  }

  // Not using pagination, return all products
  return {
    products,
    numPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
  };
}

export async function fakeGetProduct(
  slug: string,
): Promise<Product | undefined> {
  // Uncomment to slow down your data loads
  // await sleep();

  if (slug === "error") {
    throw new Error("Fake Network Error");
  }

  return getNormalizedProducts().find((p) => p.slug === slug);
}

export function validateEmailAndPassword(username: string, password: string) {
  return username.length > 0 && password === "remixrocks";
}

function getNormalizedProducts() {
  return fakeProductsResponse.data.products.edges.map((p) => {
    return {
      ...p.node,
      variants: p.node.variants.edges.map((v) => v.node),
      slug: p.node.title.replace(/[^a-z]/i, "-").toLowerCase(),
    };
  });
}

function sortProducts(products: Product[], descending: boolean) {
  let mutated = [...products];
  return mutated.sort((_a, _b) => {
    let a = parseFloat(_a.variants[0].price.amount);
    let b = parseFloat(_b.variants[0].price.amount);
    return (a < b ? -1 : a > b ? 1 : 0) * (descending ? -1 : 1);
  });
}

// Utility sleep function to slow down your data loads for Pending/Optimistic UI work
function sleep(ms = 500) {
  return new Promise((r) => setTimeout(r, ms));
}
