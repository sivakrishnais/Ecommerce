import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./Context/ShopContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
);
