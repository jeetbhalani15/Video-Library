import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import FetchVideoReducer from "../Reducers/FetchVideoReducer";

const VideosContent = createContext();

const initialValue = { videos: [] , watchLater:[] };

const VideoProvider = ({ children }) => {
  const [videoDataState, videoDataDispatch] = useReducer(
    FetchVideoReducer,
    initialValue
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/videos");
        if(res.status === 200){
            videoDataDispatch({type:"ON_SUCCESS", payload: res.data.videos})
        }

      } catch (error) {
          alert(error);
          console.log(err)

      }
    })();
  }, []);


//  ADD TO WATCH LATER USING API
const watchLaterHandler = async (authState,video,videoDataDispatch) => {
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
const removeFromWatchLater = async (authState,id,videoDataDispatch) => {
  if (authState.token) {
    try {
      console.log(id);
      const res = await axios.delete(
        `/api/user/watchlater/${id}`,
        { headers: { authorization: authState.token } }
      );
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



  return (
    <VideosContent.Provider value={{ videoDataState, videoDataDispatch, watchLaterHandler, removeFromWatchLater }}>
      {children}
    </VideosContent.Provider>
  );
};

const useVideoData = () => useContext(VideosContent);
export { useVideoData, VideoProvider };
