import { json, redirect } from "@remix-run/node";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  NavLink,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // Because this is a GET, not a POST, Remix does not call the action function. Submitting a GET form is the same as clicking a link: only the URL changes.
  const contacts = await getContacts(q);
  return json({ contacts, q });
};
// export const loader = async () => {
//   const contacts = await getContacts();
//   return json({ contacts });
// };

// Issue: Remix sends a 405 because there is no code on the server to handle the form navigation to create a new contact.
// Soln: define and export an action function to handle the form navigation

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
  // return json({ contact });
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();

  // 🤔 Shouldn't you use a controlled component and React State for this?

  // You could certainly do this as a controlled component. You will have more synchronization points, but it's up to you.
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form
              id="search-form"
              role="search"
              // Note the argument to submit. The submit function will serialize and submit any form you pass to it. We're passing in event.currentTarget. The currentTarget is the DOM node the event is attached to (the form).
              onChange={(event) => submit(event.currentTarget)}
            >
              <input
                id="q"
                defaultValue={q || ""}
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    {/* Now that we have a bunch of records, it's not clear which one we're looking at in the sidebar. We can use NavLink to fix this. Change Link to NavLink */}
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}

            {/* 
                <ul>
                  <li>
                    ❌ <a href={`/contacts/1`}>Your Name</a>
                    ✅ <Link to={`/contacts/1`}>Your Name</Link>

                  </li>
                  {... other list items}
                </ul>
                upgraded to CSR via Link, wc updates the URL without requesting another document from the server.
                */}
          </nav>
        </div>
        <div
          id="detail"
          className={navigation.state === "loading" ? "loading" : ""}
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
