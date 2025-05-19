import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "./index.css";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();
  // return status text for anything that isn't 404,
  // otherwise show the NotFound component (or w/e you want to do)
  if (isRouteErrorResponse(error) && error.status !== 404) {
    return error.statusText;
  }
  return (
    <html>
      <head>
        <title>Oops! Not Found</title>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
            ? error.message
            : "Unknown Error"}
        </h1>{" "}
        <Scripts />
      </body>
    </html>
  );
}

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
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
