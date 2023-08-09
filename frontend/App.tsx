import { createRoot } from "react-dom/client";
import { Entry } from "./src/components/Entry";
import { StoreView } from "./src/components/StoreView";
import { EcommView } from "./src/components/EcommView";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./src/routes/ErrorPage";

const App = () => {
  return (
    <div>
      <EcommView />
      <StoreView />
      <Entry />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/entry",
    element: <Entry />,
  },
  {
    path: "/ecom",
    element: <EcommView />,
  },
]);

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container");
}

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
