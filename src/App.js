import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import store from "./store/store";
import router from "./routes/router";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
