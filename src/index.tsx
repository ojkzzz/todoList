import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router";
import store from "./repository/store";
import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
