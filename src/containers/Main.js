import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/common/Header";
import CompMain from "../components/CompMain";
import SubjectChoice from "./SubjectChoice";

const Main = () => {
  return (
    <>
      <Header />
      <div className="CompMainRoute">
        <Route path="/" component={CompMain} exact></Route>
        <Route path="/subjectChoice" component={SubjectChoice}></Route>
      </div>
    </>
  );
};

export default Main;
