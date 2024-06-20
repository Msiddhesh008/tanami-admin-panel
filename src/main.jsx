import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { persistor, store } from "./Redux/Store.js";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStateProvider from "./Contexts/GlobalStateProvider";
import { store } from "./Store/Store.js";
import customTheme from "./Theme/Theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={customTheme} >
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      {/* </PersistGate> */}
    </Provider>
  </ChakraProvider>
);
