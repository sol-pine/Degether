import React, { lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import MyProject from "../components/my_page/MyProject";
import Notice from "../components/my_page/Notice";
import MypageSide from "../components/side/my/MypageSide";
import ZzimList from "../components/my_page/ZzimList";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/UserSlice";
import Spinner from "../components/Spinner";

function Mypage() {
  const dispatch = useDispatch();
  const myInfo = useSelector((state) => state.User.userInfo);
  const Profile = lazy(() => {
    return Promise.all([
      import("../components/my_page/Profile"),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(([moduleExports]) => moduleExports);
  });

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <>
      <Header />
      <MainContainer>
        <Suspense fallback={<Spinner />}>
          <Profile myInfo={myInfo} />
        </Suspense>
        <Notice />
        <MyProject />
        <ZzimList />
        <MypageSide />
      </MainContainer>
    </>
  );
}
export default Mypage;

const MainContainer = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
