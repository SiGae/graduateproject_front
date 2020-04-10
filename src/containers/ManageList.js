import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import CompManageList from "../components/CompManageList";

const ManageList = ({ history }) => {
  const { user } = useSelector(({ user }) => ({
    user: user,
  }));

  useEffect(() => {
    if (user.userOnline !== "TRUE") {
      history.push("/");
    }
  });

  return <CompManageList></CompManageList>;
};

export default withRouter(ManageList);
