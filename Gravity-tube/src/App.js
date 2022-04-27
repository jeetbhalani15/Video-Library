import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import { Login } from "./Pages/AuthWidget/Login/Login";
import { Logout } from "./Pages/AuthWidget/Logout/Logout";
import { SignUp } from "./Pages/AuthWidget/SignUp/SignUp";
import HomePage from "./Pages/Homepage/HomePage";
import LikedVideos from "./Pages/LikedVideos/LikedVideos";
import SingleVideoPage from "./Pages/SingleVideoPage/SingleVideoPage";
import VideoHistory from "./Pages/VideoHistory/VideoHistory";
import WatchLater from "./Pages/WatchLater/WatchLater";

function App() {
  return (
   <section>
     <Routes>
       <Route exact path="/" element={<HomePage/>}/>
       <Route  path="/video/:videoId" element={<SingleVideoPage/>}/>
       <Route  path="/watchlater" element={<WatchLater/>}/>
       <Route  path="/likedvideos" element={<LikedVideos/>}/>
       <Route  path="/history" element={<VideoHistory/>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/logout" element={<Logout/>}/>
       <Route  path="/signup" element={<SignUp/>}/>
     </Routes>
     
   </section>
  );
}

export default App;
