import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { Google, Kakao, Naver } from "./components/LoginHandler";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/auth/kakao/callback" element={<Kakao />}></Route>
        <Route path="/auth/google/callback" element={<Google />}></Route>
        <Route path="/auth/naver/callback" element={<Naver />}></Route>
      </Routes>
    </div>
  );
}

export default App;
// git
