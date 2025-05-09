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
      <h1>Login</h1>
      <label></label>
      <Form method="post">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
