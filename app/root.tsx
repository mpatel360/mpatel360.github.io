import { Links, Meta, Outlet, Scripts } from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <h1>Hello world! Manan here yea!</h1>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
