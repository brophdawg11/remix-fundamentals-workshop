import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => [
  {
    title: "About Page",
  },
];

export default function About() {
  return <h1 className="text-center text-xl">About Page</h1>;
}
