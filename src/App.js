import { Routes, Route } from "react-router-dom";
import "./App.css";
import Headers from "./components/Header";
import Footers from "./components/Footer";
import MainPage from "./pages/MainPage";
import { CardDetailModal } from "./elements/CardModal";
import LoginPage from "./pages/LoginPage";
import { Google, Kakao, Naver } from "./components/LoginHandler";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Headers />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/:projectId" element={<CardDetailModal />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/auth/kakao/callback" element={<Kakao />}></Route>
        <Route path="/auth/google/callback" element={<Google />}></Route>
        <Route path="/auth/naver/callback" element={<Naver />}></Route>
        <Route path="/chat/:myProjectId" element={<ChatPage />}></Route>
      </Routes>
      <Footers />
    </div>
  );
}

export default App;
// git
