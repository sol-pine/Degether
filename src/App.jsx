import {Routes, Route} from "react-router-dom";
import "./App.css";
import Headers from "./components/Header";
import Footers from "./components/Footer";
import MainPage from "./pages/MainPage";
import CardModal from "./elements/CardModal";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import ChatPage from "./pages/ChatPage";
import {kakaoOauth, googleOauth, naverOauth} from "./utils/loginHandler";

function App() {
    return (
        <div className="App">
            <Headers/>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route path="/:projectId" element={<CardModal create={false}/>}></Route>
                </Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/auth/kakao/callback" element={<kakaoOauth/>}></Route>
                <Route path="/auth/google/callback" element={<googleOauth/>}></Route>
                <Route path="/auth/naver/callback" element={<naverOauth/>}></Route>
                <Route path="/mypage/:myId" element={<MyPage/>}></Route>
                <Route path="/chat/:myProjectId" element={<ChatPage/>}></Route>
            </Routes>
            <Footers/>
        </div>
    );
}

export default App;
// git
