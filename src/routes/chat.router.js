// @ts-nocheck
import React from "react";

import Navbar from "../components/layout/Navbar";
import Loader from "../components/layout/Loader";
import PrivateRoute from "./Private.route";
import Context from "../components/context/Context";
import Ai from "../components/ai/Ai";
import ModalManager from "../components/modals/ModalManager";

const chatRoutes = [
  {
    path: "/chat",
    element: (
      <>
        <Navbar />
        <Loader />
        <ModalManager />
        <PrivateRoute component={Ai} />
      </>
    ),
  },
  {
    path: "/history",
    element: (
      <>
        <Navbar />
        <Loader />
        <PrivateRoute component={Context} />
      </>
    ),
  },
];

export default chatRoutes;
