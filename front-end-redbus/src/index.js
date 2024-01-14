import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react"
ReactDOM.render(
  <Auth0Provider
  domain="dev-4bpzag7swwkxtmwv.us.auth0.com"
  clientId="xnb0xjU8zC1Xa8V80igrG0yKn7oOeOTi"
  authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
