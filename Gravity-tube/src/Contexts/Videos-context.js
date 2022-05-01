import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchVideoReducer from "../Reducers/FetchVideoReducer";

const VideosContent = createContext();

const initialValue = {
  videos: [],
  watchLater: [],
  likedVideos: [],
  history: [],
};

const VideoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [videoDataState, videoDataDispatch] = useReducer(
    FetchVideoReducer,
    initialValue
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/videos");
        if (res.status === 200) {
          videoDataDispatch({ type: "ON_SUCCESS", payload: res.data.videos });
        }
      } catch (error) {
        alert(error);
        console.log(err);
      }
    })();
  }, []);

  //  ADD TO WATCH LATER USING API
  const watchLaterHandler = async (authState, video, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(video);
        const res = await axios.post(
          "/api/user/watchlater",
          { video },
          { headers: { authorization: authState.token } }
        );
        console.log(res);
        videoDataDispatch({
          type: "ADD_TO_WATCH_LATER",
          payload: res.data.watchlater,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  //  REMOVE FROM WATCH LATER USING API
  const removeFromWatchLater = async (authState, id, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(id);
        const res = await axios.delete(`/api/user/watchlater/${id}`, {
          headers: { authorization: authState.token },
        });
        console.log(res);
        videoDataDispatch({
          type: "REMOVE_FROM_WATCH_LATER",
          payload: res.data.watchlater,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  // ADD TO LIKED VIDEOS
  const likedVideoHandler = async (authState, video, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(video);
        const res = await axios.post(
          "/api/user/likes",
          { video },
          { headers: { authorization: authState.token } }
        );
        console.log(res);
        videoDataDispatch({
          type: "ADD_TO_LIKED_VIDEOS",
          payload: res.data.likes,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  //  REMOVE FROM LIKE VIDEOS USING API
  const removeFromLikedVideos = async (authState, id, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(id);
        const res = await axios.delete(`/api/user/likes/${id}`, {
          headers: { authorization: authState.token },
        });
        console.log(res);
        videoDataDispatch({
          type: "REMOVE_FROM_LIKED_VIDEOS",
          payload: res.data.likes,
        });
        console.log("removed");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  // ADD TO VIDEOS HISTORY
  const videoHistoryHandler = async (authState, video, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(video);
        const res = await axios.post(
          "/api/user/history",
          { video },
          { headers: { authorization: authState.token } }
        );
        console.log(res);
        videoDataDispatch({
          type: "ADD_TO_HISTORY",
          payload: res.data.history,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };
  

  // REMOVE FROM HISTROY
  const removeFromHistory = async (authState, id, videoDataDispatch) => {
    if (authState.token) {
      try {
        console.log(id);
        const res = await axios.delete(`/api/user/history/${id}`, {
          headers: { authorization: authState.token },
        });
        console.log(res);
        videoDataDispatch({
          type: "REMOVE_FROM_HISTORY",
          payload: res.data.history,
        });
        console.log("removed");
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };


  // REMOVE ALL VIDEO FROM HISTROY
  const clearAllHistory = async (authState,videoDataDispatch) => {
    if (authState.token) {
      try {
        const res = await axios.delete(`/api/user/history/all`, {
          headers: { authorization: authState.token },
        });
        videoDataDispatch({
          type: "CLEAR_ALL_HISTORY",
          payload: res.data.history,
        });
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };




  return (
    <VideosContent.Provider
      value={{
        videoDataState,
        videoDataDispatch,
        watchLaterHandler,
        removeFromWatchLater,
        likedVideoHandler,
        removeFromLikedVideos,
        videoHistoryHandler,
        removeFromHistory,
        clearAllHistory,
        showModal,
        setShowModal
      }}
    >
      {children}
    </VideosContent.Provider>
  );
};

const useVideoData = () => useContext(VideosContent);
export { useVideoData, VideoProvider };
