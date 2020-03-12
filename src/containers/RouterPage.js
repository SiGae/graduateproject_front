import React from "react";
import { Route } from "react-router-dom";
import CompMain from "../components/CompMain";

/**
 *   Login page, RegisterPage, MainPage
 */
const RouterPage = () => {
  return (
    <div>
      <Route path="/" component={CompMain} exact={true} />
    </div>
  );
};

export default RouterPage;
