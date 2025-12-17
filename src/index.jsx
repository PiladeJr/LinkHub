import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initStore } from "./data/linkStore";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

// Initialize local persistence store before rendering the app
initStore().finally(() => {
	root.render(<App />);
});
