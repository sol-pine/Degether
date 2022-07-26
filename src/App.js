import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./pages/Mainpage";
import ProjectDetailModal from "./components/detail_modal/ProjectDetailModal";
import KakaoOAuthRedirectHandler from "./components/side/login/Kakao";
import GoogleOAuthRedirectHandler from "./components/side/login/Google";
import NaverOAuthRedirectHandler from "./components/side/login/Naver";
import ProjectCreateModal from "./components/create_modal/ProjectCreateModal";
import Mypage from "./pages/Mypage";
import Projectpage from "./pages/Projectpage";
import Adminpage from "./pages/Adminpage";
import Videopage from "./pages/Videopage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Mainpage />}>
          <Route path="/:projectId" element={<ProjectDetailModal />} />
          <Route path="/create" element={<ProjectCreateModal />} />
        </Route>
        <Route path="/mypage/:userId" element={<Mypage />} />
        <Route path="/project/:myProjectId" element={<Projectpage />} />
        <Route path="/video/:myProjectId" element={<Videopage />} />
        <Route path="/admin/:myProjectId" element={<Adminpage />} />
        <Route
          path="/auth/kakao/callback"
          element={<KakaoOAuthRedirectHandler />}
        />
        <Route
          path="/auth/google/callback"
          element={<GoogleOAuthRedirectHandler />}
        />
        <Route
          path="/auth/naver/callback"
          element={<NaverOAuthRedirectHandler />}
        />
      </Routes>
    </div>
  );
}

export default App;
