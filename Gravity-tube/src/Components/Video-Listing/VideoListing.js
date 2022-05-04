import React from "react";
import { useFilter } from "../../Contexts/Filter-context";
import { useVideoData } from "../../Contexts/Videos-context";
import Chips from "../Chips/Chips";
import VideoCard from "../VideoCard/VideoCard";
import "./VideoListing.css";

function VideoListing() {
  const { videoDataState, showModal,setShowModal } = useVideoData();
  const {filterState, filterDispatch} = useFilter();
  const filteredDataByCategory = filterState.category === "All" ? (videoDataState.videos) : (videoDataState.videos.filter((item)=> item.category === filterState.category))
  console.log(filteredDataByCategory)
   

  return (
    <div className="video-box">
       <Chips/>
      <h2>Recommended</h2>
      <div className="videos-container">
        {filteredDataByCategory.map((video) => (
          <VideoCard livenow={true} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoListing;
