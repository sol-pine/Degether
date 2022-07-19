import { Route, Routes } from "react-router-dom";
import "./App.css";
import KakaoOAuthRedirectHandler from "./components/sideView/KakaoOAuthRedirectHandler";
import NaverOAuthRedirectHandler from "./components/sideView/NaverOAuthRedirectHandler";
import GoogleOAuthRedirectHandler from "./components/sideView/GoogleOAuthRedirectHandler";
import Header from "./components/header/Header";
import Main from "./pages/Main";
import User from "./pages/User";
import Project from "./pages/Project";
import Admin from "./pages/Admin";
import ProjectDetailModal from "./components/mainPage/ProjectDetailModal";
import SearchBar from "./components/header/SearchBar";
import OpvSession from "openvidu-react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/:projectId" element={<ProjectDetailModal />} />
        </Route>
        <Route path="/mypage/:userId" element={<User />} />
        <Route path="/project/:myprojectId" element={<Project />} />
        <Route path="/admin/:myprojectId" element={<Admin />} />
        <Route
          path="/auth/kakao/callback"
          element={<KakaoOAuthRedirectHandler />}
        />
        <Route
          path="/auth/naver/callback"
          element={<NaverOAuthRedirectHandler />}
        />
        <Route
          path="/auth/google/callback"
          element={<GoogleOAuthRedirectHandler />}
        />
      </Routes>
    </div>
  );
}

export default App;
