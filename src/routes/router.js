// @ts-nocheck
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import authRoutes from "./auth.router.js";
import chatRoutes from "./chat.router.js";

const router = createBrowserRouter([
  // root route
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Landing />
      </>
    ),
  },

  // app routes
  ...authRoutes,
  ...chatRoutes,

  // catch all route
  {
    path: "*",
    element: (
      <>
        <Navbar />
        <Landing />
      </>
    ),
  },
]);

export default router;
