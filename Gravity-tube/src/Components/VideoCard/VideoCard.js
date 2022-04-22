import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import Avatar from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineAddTask,
  MdOutlinePlaylistAdd,
  MdOutlineWatchLater,
} from "react-icons/md";
import "./VideoCard.css";
import { RiShareForwardLine } from "react-icons/ri";
import { useAuth } from "../../Contexts/Auth-context";
import axios from "axios";
import { useVideoData } from "../../Contexts/Videos-context";
import { ClickOutsideHandler } from "./ClickOutsideHandler";

function VideoCard({ video }) {
  const { authState } = useAuth();
  const { videoDataState,videoDataDispatch, watchLaterHandler } = useVideoData();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const toggleMoreOption = () => {
    setShowOptions(!showOptions);
  };

 let domNode = ClickOutsideHandler(()=>{
    setShowOptions(false)
 })


  return (
    <div className="videoCard" key={video._id}>
      <div>
        <Link to={`/video/${video._id}`}>
          <img className="card-image" src={video.image} alt="logo" />
        </Link>
        <div className="videoCard--info">
          <div className="videoCard--text">
            <div className="videoCard--logo--txt">
              <Avatar className="avatar" img={video.channelImage} />
              <h4 className="ml">{video.title}</h4>
              <IoMdMore
                onClick={() => toggleMoreOption()}
                className="more-option-btn"
                size={45}
              />
            </div>
            <div className="videoCard--views">
              <p>{video.channel}</p>
              <p className="timestamp">
                {video.views} • {video.timestamp}{" "}
              </p>
              {/* {<span className='live-tag'>LIVE NOW</span>} */}
            </div>
          </div>

          {showOptions && (
            <div ref={domNode} className="more-option-box">
              <div className="options">
              {videoDataState.watchLater.find((item)=>item._id === video._id) ? (
                  <MdOutlineAddTask color="#00D4C1" size={25} />
                ) : (
                  <MdOutlineWatchLater size={25} />
                  
                )}
                <span onClick={() => watchLaterHandler(authState,video,videoDataDispatch)}>
                  Save to Watch later
                </span>
              </div>
              <div className="options">
               
                <MdOutlinePlaylistAdd size={25} />

                <span>Save to playlist</span>
              </div>
              <div className="options">
                <RiShareForwardLine size={25} />
                <span>Share</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
