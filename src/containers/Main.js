import React from "react";
import { Route, withRouter } from "react-router-dom";
import loadable from "@loadable/component";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../modules/user";
import Header from "../components/common/Header";

const CompMain = loadable(() => import("../components/CompMain"));
const AttendPage = loadable(() => import("../pages/AttendPage"));
const CreateSubject = loadable(() => import("./CreateSubject"));
const ManageStudent = loadable(() => import("../pages/ManageStudent"));
const Attendance = loadable(() => import("./Attendance"));
const Ratio = loadable(() => import("./Ratio"));
const Transcript = loadable(() => import("./Transcript"));
const ManageGrade = loadable(() => import("./ManageGrade"));
const GradePage = loadable(() => import("../pages/GradePage"));
const AttendModal = loadable(() => import("../components/popup/AttendModal"));

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
        {/* 메인메뉴 */}
        <Route path="/main/menu" component={CompMain}></Route>
        <Route path="/main/subjectChoice" component={AttendPage}></Route>
        <Route path="/main/createSubject" component={CreateSubject}></Route>
        <Route path="/main/subManagePage" component={GradePage}></Route>
        {/* 2 layer */}
        <Route path="/main/manageStudent" component={ManageStudent}></Route>
        <Route path="/main/manageGrade" component={ManageGrade}></Route>
        <Route path="/main/attend" component={Attendance}></Route>
        <Route path="/main/ratio" component={Ratio}></Route>
        <Route path="/main/transcript" component={Transcript}></Route>
        {/* Popup */}
        <Route path="/main/:attendModal" component={AttendModal}></Route>
      </div>
    </>
  );
};

export default React.memo(withRouter(Main));

//<Route path="/main/attendance" componen=}{}></Route>
//<Route path="/main/mngStudent" component={ManageList}></Route>
/**
 * 
import CompMain from "../components/CompMain";
import AttendPage from "../pages/AttendPage";
import CreateSubject from "./CreateSubject";
import ManageStudent from "../pages/ManageStudent";
import Attendance from "./Attendance";
import Ratio from "./Ratio";
import Transcript from "./Transcript";
import ManageGrade from "./ManageGrade";
import GradePage from "../pages/GradePage";

 */
