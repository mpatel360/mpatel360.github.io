import { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Manan's Blog",
      description: "This is my blog",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-xl text-red-500 font-bold">
        Hello world! Manan here yea!
      </h1>
    </div>
  );
}
