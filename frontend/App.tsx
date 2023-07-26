import { createRoot } from "react-dom/client";
import { Entry } from "./src/components/Entry";
import { StoreView } from "./src/components/StoreView";
import { EcommView } from "./src/components/EcommView";

const App = () => {
  return (
    <div>
      <EcommView />
      {/* <StoreView /> */}
      {/* <Entry /> */}
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container");
}

const root = createRoot(container);
root.render(<App />);
