import fakeProductsResponse from "./data/products";

export async function fakeGetProducts(
  page?: number,
  pageSize = 8,
  sort?: string | null,
) {
  let products = fakeProductsResponse.data.products.edges.map((p) => {
    return { ...p.node, variants: p.node.variants.edges.map((v) => v.node) };
  });

  if (sort) {
    products = sortProducts(products, sort === "desc");
  }

  if (page && pageSize && page > 0 && pageSize > 0) {
    let start = (page - 1) * pageSize;
    return {
      products: products.slice(start, start + pageSize),
      numPages: Math.ceil(products.length / pageSize),
      hasPrevPage: page > 1,
      hasNextPage: start + pageSize < products.length,
    };
  }
  return { products, hasPrevPage: false, hasNextPage: false };
}

export type Product = Awaited<
  ReturnType<typeof fakeGetProducts>
>["products"][0];

function sortProducts(products: Product[], descending: boolean) {
  let mutated = [...products];
  return mutated.sort((_a, _b) => {
    let a = parseFloat(_a.variants[0].price.amount);
    let b = parseFloat(_b.variants[0].price.amount);
    return (a < b ? -1 : a > b ? 1 : 0) * (descending ? -1 : 1);
  });
}
