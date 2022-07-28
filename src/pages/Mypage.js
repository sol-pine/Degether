import React, { lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../components/header/Header";
import MypageSide from "../components/side/my/MypageSide";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/UserSlice";

const Profile = lazy(() => {
  return Promise.all([
    import("../components/my_page/Profile"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([moduleExports]) => moduleExports);
});
const Notice = lazy(() => {
  return Promise.all([
    import("../components/my_page/Notice"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([moduleExports]) => moduleExports);
});
const MyProject = lazy(() => {
  return Promise.all([
    import("../components/my_page/MyProject"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([moduleExports]) => moduleExports);
});
const ZzimList = lazy(() => {
  return Promise.all([
    import("../components/my_page/ZzimList"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([moduleExports]) => moduleExports);
});

function Mypage() {
  const dispatch = useDispatch();
  const myInfo = useSelector((state) => state.User.userInfo);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <>
      <Header />
      <MainContainer>
        <ContentWrapper>
          <Suspense fallback={<Container></Container>}>
            <Profile myInfo={myInfo} />
            <Notice />
            <MyProject />
            <ZzimList />
          </Suspense>
        </ContentWrapper>
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
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 1371px;
  height: 836px;
  margin-top: 280px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
