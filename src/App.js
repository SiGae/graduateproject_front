import React from "react";
import { Route } from "react-router-dom";
//import Main from "./containers/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <>
      <Route component={TestComponent} path="/" />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/RegisterPage" />
    </>
  );
}

export default App;
