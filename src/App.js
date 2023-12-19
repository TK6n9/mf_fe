import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import PostDetail from "./board/PostDetail";
import PostEdit from "./board/PostEdit";
import WritePost from "./board/WritePost";
import Board from "./board/index";
import ErrorPage from "./component/ErrorPage";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import MainPage from "./main/index";
import MyPage from "./mypage/MyPage";
function App() {
  return (
    <RecoilRoot>
      {/* <SocketProvider> */}
      <ChakraProvider>
        <Router>
          <Navbar />
          {/* <ChatModal /> */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/board" element={<Board />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/write-post" element={<WritePost />} />
            <Route path="/board/:postId" element={<PostDetail />} />
            {/* <Route path="/room/:roomId" element={<ChatRoom />} /> */}
            <Route path="/edit/:postId" element={<PostEdit />} />
            <Route path="/MyPage" element={<MyPage />} />
          </Routes>
        </Router>
        <Footer />
      </ChakraProvider>
      {/* </SocketProvider> */}
    </RecoilRoot>
  );
}

export default App;
