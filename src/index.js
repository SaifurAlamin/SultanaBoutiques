import AOS from "aos";
import "aos/dist/aos.css";
import "flowbite";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "tw-elements";
import App from "./App";
import store from "./app/store";
import "./index.css";

AOS.init();
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
