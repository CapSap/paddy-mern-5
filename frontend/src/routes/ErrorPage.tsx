import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Report an issue{" "}
        <a
          href={"https://github.com/CapSap/paddy-mern-5/issues"}
          className="underline text-blue-600 hover:text-blue-800"
        >
          here
        </a>
      </p>
      <p>
        <i>
          {isRouteErrorResponse(error)
            ? error.statusText || error.error?.message
            : "unkown error message"}
        </i>
      </p>
    </div>
  );
}
