import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import { Login } from "./Pages/AuthWidget/Login/Login";
import { Logout } from "./Pages/AuthWidget/Logout/Logout";
import { SignUp } from "./Pages/AuthWidget/SignUp/SignUp";
import HomePage from "./Pages/Homepage/HomePage";
import LikedVideos from "./Pages/LikedVideos/LikedVideos";
import Playlist from "./Pages/Playlist/Playlist";
import SingleVideoPage from "./Pages/SingleVideoPage/SingleVideoPage";
import VideoHistory from "./Pages/VideoHistory/VideoHistory";
import WatchLater from "./Pages/WatchLater/WatchLater";
import Mockman from "mockman-js";
import RequiresAuth from "./Pages/AuthWidget/RequiresAuth";
import Page404 from "./Pages/Page404/Page404";

function App() {
  return (
   <section>
     <Routes>
       <Route exact path="/" element={<HomePage/>}/>
       <Route  path="/video/:videoId" element={<SingleVideoPage/>}/>
       <Route  path="/watchlater" element={<RequiresAuth><WatchLater/></RequiresAuth>}/>
       <Route  path="/likedvideos" element={<RequiresAuth><LikedVideos/></RequiresAuth>}/>
       <Route  path="/history" element={<RequiresAuth><VideoHistory/> </RequiresAuth>}/>
       <Route  path="/my-playlist" element={<RequiresAuth><Playlist/></RequiresAuth>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/logout" element={<Logout/>}/>
       <Route  path="/signup" element={<SignUp/>}/>
       <Route  path="/mock" element={<Mockman/>}/>

       <Route  path="*" element={<Page404/>}/>

     </Routes>
     
   </section>
  );
}

export default App;
