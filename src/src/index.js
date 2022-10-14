import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Auth } from "./hooks/auth";

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Auth>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth>
);
