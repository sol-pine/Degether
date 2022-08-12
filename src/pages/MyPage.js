import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../elements/Profile";
import ProjectList from "../elements/ProjectList";
import "../style/my.css";
import { getUserInfo } from "../redux/modules/UserSlice";

const MyPage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.User.userInfo);
  const myProjectList = useSelector((state) => state.User.userInfo.myProject);
  const myZzimList = useSelector((state) => state.User.userInfo.zzim);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="my-container">
      <Profile userInfo={userInfo} />
      <ProjectList list={myProjectList} title="참여 프로젝트" />
      <ProjectList list={myZzimList} title="관심 프로젝트" />
    </div>
  );
};
export default MyPage;
