import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import FetchVideoReducer from "../Reducers/FetchVideoReducer";

const VideosContent = createContext();

const initialValue = { videos: [] };

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
  return (
    <VideosContent.Provider value={{ videoDataState, videoDataDispatch }}>
      {children}
    </VideosContent.Provider>
  );
};

const useVideoData = () => useContext(VideosContent);
export { useVideoData, VideoProvider };
