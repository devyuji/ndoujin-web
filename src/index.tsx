import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/main.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);

serviceWorkerRegistration.register();
