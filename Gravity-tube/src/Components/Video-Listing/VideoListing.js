import React from "react";
import { useFilter } from "../../Contexts/Filter-context";
import { useVideoData } from "../../Contexts/Videos-context";
import Chips from "../Chips/Chips";
import VideoCard from "../VideoCard/VideoCard";
import "./VideoListing.css";

function VideoListing() {
  const { videoDataState, showModal,setShowModal } = useVideoData();
  const {filterState, filterDispatch, search} = useFilter();


  const filteredDataByCategory = filterState.category === "All" ? (videoDataState.videos) : (videoDataState.videos?.filter((item)=> item.category === filterState.category))

  const SearchResult = filteredDataByCategory.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase().trim())
    ||
    item.channel.toLowerCase().includes(search.toLowerCase().trim())
      
  );
   
  return (
    <div className="video-box">
       <Chips/>
      <h2>Recommended</h2>
      <div className="videos-container">
        {SearchResult.map((video) => (
          <VideoCard livenow={true} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideoListing;
