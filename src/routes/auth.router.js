// @ts-nocheck
import React from "react";
import Navbar from "../components/layout/Navbar";
import Loader from "../components/layout/Loader";

import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const authRoutes = [
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Loader />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Loader />
        <Login />
      </>
    ),
  },
];

export default authRoutes;
