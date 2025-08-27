import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Set a base URL from env; send credentials only per-request where needed
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      transition={Bounce} // or Bounce if imported as component
    />
    <App />
  </Provider>
);
