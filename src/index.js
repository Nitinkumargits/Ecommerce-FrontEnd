import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// API base URL: pulled from env so the same build works for any deployment.
// Leave blank to use the CRA dev proxy from package.json.
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "";
// Send the JWT httpOnly cookie on every cross-origin request.
axios.defaults.withCredentials = true;

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
