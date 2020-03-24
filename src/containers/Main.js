import React from "react";
import { Route, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../modules/user";
import Header from "../components/common/Header";
import CompMain from "../components/CompMain";
import SubjectChoice from "./SubjectChoice";
import CreateSubject from "./CreateSubject";

const Main = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user
  }));

  const onLogout = () => {
    dispatch(logout(user.id));
    history.push("/");
  };

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <div className="CompMainRoute">
        <Route path="/main/menu" component={CompMain}></Route>
        <Route path="/main/subjectChoice" component={SubjectChoice}></Route>
        <Route path="/main/createSubject" component={CreateSubject}></Route>
      </div>
    </>
  );
};

export default React.memo(withRouter(Main));
