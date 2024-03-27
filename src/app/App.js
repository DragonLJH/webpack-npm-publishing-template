import React, { useEffect, useState } from "react";
import AppTop from "@/app/app-top/index";
import "./app.css";
import MyRouter, { routeComponents } from "@/route/index";
const App = () => {
  useEffect(() => {}, []);
  return (
    <>
      <AppTop></AppTop>
      <div className="app-main">
        <MyRouter></MyRouter>
      </div>
    </>
  );
};

export default App;
