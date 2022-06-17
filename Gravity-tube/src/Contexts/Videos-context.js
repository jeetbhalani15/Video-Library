import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import FetchVideoReducer from "../Reducers/FetchVideoReducer";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const VideosContent = createContext();

const initialValue = {
  videos: [],
  watchLater: [],
  likedVideos: [],
  history: [],
  categories: [],
};

const toastProp = {
  duration: 2000,
  style: {
    fontSize: "1.2rem",
    borderRadius: "10px",
    background: "#168baf",
    color: "#fff",
  },
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
          toast.success("Welcome to Gravity tube", toastProp);
        }
      } catch (error) {
        alert(error);
        toast.error("Something went wrong", toastProp);
      }

      try {
        const res = await axios.get("/api/categories");
        if (res.status === 200) {
          videoDataDispatch({
            type: "CATEGORIES_DATA",
            payload: res.data.categories,
          });
        }
      } catch (error) {
        toast.error("Something went wrong", toastProp);
      }
    })();
  }, []);

  //  ADD TO WATCH LATER USING API
  const watchLaterHandler = async (
    authState,
    video,
    videoDataDispatch,
    toastProp
  ) => {
    if (authState.token) {
      try {
        console.log(video);
        const res = await axios.post(
          "/api/user/watchlater",
          { video },
          { headers: { authorization: authState.token } }
        );
        videoDataDispatch({
          type: "ADD_TO_WATCH_LATER",
          payload: res.data.watchlater,
        });
        toast.success("Saved to Watchlater videos!", toastProp);
      } catch (error) {
        toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  //  REMOVE FROM WATCH LATER USING API
  const removeFromWatchLater = async (
    authState,
    id,
    videoDataDispatch,
    toastProp
  ) => {
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
        toast.success("Removed from Watchlater videos!", toastProp);
      } catch (error) {
        alert(error);
        toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  // ADD TO LIKED VIDEOS
  const likedVideoHandler = async (
    authState,
    video,
    videoDataDispatch,
    toastProp
  ) => {
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
        toast.success("Added to liked videos!", toastProp);
      } catch (error) {
        toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  //  REMOVE FROM LIKE VIDEOS USING API
  const removeFromLikedVideos = async (
    authState,
    id,
    videoDataDispatch,
    toastProp
  ) => {
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
        toast.success("Removed from liked videos!", toastProp);
      } catch (error) {
        toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  // ADD TO VIDEOS HISTORY
  const videoHistoryHandler = async (
    authState,
    video,
    videoDataDispatch,
    toastProp
  ) => {
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
        toast.success("Added to video History!", toastProp);
      } catch (error) {
        // toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  // REMOVE FROM HISTROY
  const removeFromHistory = async (
    authState,
    id,
    videoDataDispatch,
    toastProp
  ) => {
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
        toast.success("Removed from video History!", toastProp);
      } catch (error) {
        toast.error("Something went wrong", toastProp);
      }
    } else {
      navigate("/login");
    }
  };

  // REMOVE ALL VIDEO FROM HISTROY
  const clearAllHistory = async (authState, videoDataDispatch, toastProp) => {
    if (authState.token) {
      try {
        const res = await axios.delete(`/api/user/history/all`, {
          headers: { authorization: authState.token },
        });
        videoDataDispatch({
          type: "CLEAR_ALL_HISTORY",
          payload: res.data.history,
        });
        toast.success("Removed All videos from History!", toastProp);
      } catch (error) {
        toast.error("Something went wrong", toastProp);
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
        setShowModal,
        toastProp,
      }}
    >
      {children}
      <Toaster position="top-center" reverseOrder={true} />
    </VideosContent.Provider>
  );
};

const useVideoData = () => useContext(VideosContent);
export { useVideoData, VideoProvider };
