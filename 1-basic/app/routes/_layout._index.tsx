import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => [
  {
    title: "Index Page",
  },
];

export default function Index() {
  return <h1 className="text-center text-xl">Index Page</h1>;
}
