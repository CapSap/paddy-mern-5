import { createRoot } from "react-dom/client";
import { Entry } from "./EntryPage";

const App = () => {
  return (
    <div>
      app hello
      <Entry />
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container");
}

const root = createRoot(container);
root.render(<App />);
