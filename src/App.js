import React from "react";
import { Route } from "react-router-dom";
import Main from "./containers/Main";
//import LoginPage from "./pages/LoginPage";
//import RegisterPage from "./pages/RegisterPage";
//import ViewTest from "./lib/api/ViewTest";
import FileUploader from "./utils/FileUploader";
import StudentTestPage from "./pages/StudentTestPage";

function App() {
  return (
    <>
      <Route component={Main} path="/fdsa" />
      <Route component={StudentTestPage} path="/dfsa" />
      <Route component={FileUploader} path="/" />
    </>
  );
}

export default App;

/**
 * <Route component={ViewTest} path="/sdaf" />
      <Route component={LoginPage} path="/sdafsa" />
      <Route component={RegisterPage} path="/RegisterPage" />
 */
