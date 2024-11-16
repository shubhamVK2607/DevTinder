import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { store } from "./store/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ChatBox from "./components/ChatBox";
import Temporary from "./Temporary";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Requests />} />
            <Route path="/chat/:toUserId" element={<ChatBox />} />
            <Route path="/chat/temp" element={<Temporary />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
