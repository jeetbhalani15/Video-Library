import React from "react";
import { RiDeleteBin6Line, RiHistoryFill, RiLock2Line } from "react-icons/ri";
import { useAuth } from "../../../Contexts/Auth-context";
import { useVideoData } from "../../../Contexts/Videos-context";
import HorizontalVideoCard from "../../WatchLater/Components/HorizontalVideoCard";

function VideoHistoryPage() {
  const { authState } = useAuth();
  const {toastProp} = useVideoData()
  const {
    videoDataState,
    videoDataDispatch,
    removeFromHistory,
    clearAllHistory,
  } = useVideoData();

  return (
    <div className="watch-later-box">
      <div className="watch-later-info">
        <div className="watchlater-img">
          <RiHistoryFill color="#313e3d" size={130} />
        </div>
        <h1>History</h1>
        <span className="watchlater-views">
          {videoDataState.history.length} Videos • 0 views • updated today
        </span>
        <div className="tag">
          <RiLock2Line color="grey" size={12} />
          <span className="tag-txt">Private</span>
        </div>
        <hr />
      </div>
      <div className="watch-later-videos">
        <div className="watchlater-video-box">
          {console.log(videoDataState.watchLater)}
          {videoDataState.history.length > 0 ? (
            <button
              onClick={() => clearAllHistory(authState, videoDataDispatch,toastProp)}
              className="clear-history-btn"
            >
              <RiDeleteBin6Line className="delete-icon" size={25} />
              CLEAR ALL WATCH HISTROY
            </button>
          ) : null}

          {videoDataState.history.reverse().map((video) => (
            <HorizontalVideoCard
              video={video}
              deleteHandler={removeFromHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoHistoryPage;
