import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import Header from "../components/common/Header";
import CompMain from "../components/CompMain";
import SubjectChoice from "./SubjectChoice";
import { logout } from "../modules/user";

const Main = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => ({
    user: user
  }));

  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <div className="CompMainRoute">
        <Route path="/main" component={CompMain} exact></Route>
        <Route path="/subjectChoice" component={SubjectChoice}></Route>
      </div>
    </>
  );
};

export default React.memo(withRouter(Main));
