import { Form } from "@remix-run/react";

export default function LoginForm() {
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
