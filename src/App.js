import React from "react";
import { Route } from "react-router-dom";
import Main from "./containers/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
//import ViewTest from "./lib/api/ViewTest";
import FileUploader from "./utils/FileUploader";
import StudentTestPage from "./pages/StudentTestPage";
import TestComponent from "./components/TestComponent";

function App() {
  return (
    <>
      <Route component={LoginPage} path="/" />
      <Route component={RegisterPage} path="/RegisterPage" />
      <Route component={Main} path="/main" />
      <Route component={TestComponent} path="/fbcz" />
      <Route component={StudentTestPage} path="/dfsa" />
      <Route component={FileUploader} path="/dsa" />
    </>
  );
}

export default App;

/**
 * <Route component={ViewTest} path="/sdaf" />
      
 */
