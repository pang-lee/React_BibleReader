import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./redux.js";
import NavBar from "./components/UI/navbar";
import Footer from "./components/UI/footer";

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavBar />
      <App />
      <Footer />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
