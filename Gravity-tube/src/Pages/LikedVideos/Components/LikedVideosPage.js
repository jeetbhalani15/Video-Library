import React from "react";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { RiLock2Line } from "react-icons/ri";
import { useVideoData } from "../../../Contexts/Videos-context";
import HorizontalVideoCard from "../../WatchLater/Components/HorizontalVideoCard";

function LikedVideosPage() {
  const { videoDataState, removeFromLikedVideos } = useVideoData();
  return (
    <div className="watch-later-box">
      <div className="watch-later-info">
        <div className="watchlater-img">
          <AiFillLike color="#313e3d" size={120} />
        </div>
        <h1>Liked Videos</h1>
        <span className="watchlater-views">
          {videoDataState.likedVideos.length} Videos • 0 views • updated today
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
          {videoDataState.likedVideos.map((video) => (
            <>
              <li className="list-num"></li>{" "}
              <HorizontalVideoCard
                video={video}
                deleteHandler={removeFromLikedVideos}
                from={true}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikedVideosPage;
