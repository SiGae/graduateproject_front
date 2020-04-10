import React from "react";
import { Route, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../modules/user";
import Header from "../components/common/Header";
import CompMain from "../components/CompMain";
import AttendPage from "../pages/AttendPage";
import CreateSubject from "./CreateSubject";
import ManageStudent from "../pages/ManageStudent";
import Attendance from "./Attendance";
import ManageList from "./ManageList";

const Main = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user,
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
        <Route path="/main/subjectChoice" component={AttendPage}></Route>
        <Route path="/main/createSubject" component={CreateSubject}></Route>
        <Route path="/main/manageStudent" component={ManageStudent}></Route>
        <Route path="/main/attend" component={Attendance}></Route>
        <Route path="/main/mngStudent" component={ManageList}></Route>
      </div>
    </>
  );
};

export default React.memo(withRouter(Main));

//<Route path="/main/attendance" componen=}{}></Route>
//
