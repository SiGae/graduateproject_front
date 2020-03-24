import React from "react";
import { Route } from "react-router-dom";
import Main from "./containers/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Route component={LoginPage} path="/" exact />
      <Route component={RegisterPage} path="/RegisterPage" />
      <Route component={Main} path="/main" />
    </>
  );
}

export default App;

/**
 *
 */
/**
  import FileUploader from "./utils/FileUploader";
  import StudentTestPage from "./pages/StudentTestPage";
  import TestComponent from "./components/TestComponent";
  <Route component={TestComponent} path="/sda" />
  <Route component={StudentTestPage} path="/dsafsda" />
  <Route component={FileUploader} path="/dsaf" />
 */
