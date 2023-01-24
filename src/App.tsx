import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div>app hello</div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
