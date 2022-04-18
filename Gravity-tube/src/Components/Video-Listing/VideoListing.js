import React from "react";
import { Link } from "react-router-dom";
import { useVideoData } from "../../Contexts/Videos-context";
import VideoCard from "../VideoCard/VideoCard";
import "./VideoListing.css";

function VideoListing() {
  const {videoDataState} = useVideoData();
  return (
    <div className="video-box">
      <h2>Recommended</h2>
      <div className="videos-container">
        {videoDataState.videos.map((video)=>(
           <VideoCard 
           livenow = {true}
           video={video}
         />
        ))}
      </div>
    </div>
  );
}

export default VideoListing;
