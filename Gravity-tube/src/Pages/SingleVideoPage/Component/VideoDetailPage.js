import React, { useEffect, useState } from "react";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdOutlineAddTask, MdOutlineWatchLater } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import img from "../../../Assets/Images/gt-logo.png";
import Avatar from "../../../Components/Avatar/Avatar";
import VideoCard from "../../../Components/VideoCard/VideoCard";
import ReactPlayer from "react-player/youtube";
import "./VideoDetailPage.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useVideoData } from "../../../Contexts/Videos-context";
import { useAuth } from "../../../Contexts/Auth-context";
import { usePlaylist } from "../../../Contexts/Playlist-context";
import Modal from "../../../Components/Modal/Modal";
import { useClickOutside } from "../../../Hooks/useClickOutside";
import SuggestredVideoCard from "./SuggestredVideoCard";

function VideoDetailPage({}) {
  const { videoId } = useParams();
  const { authState } = useAuth();
  const {
    videoDataState,
    videoDataDispatch,
    watchLaterHandler,
    likedVideoHandler,
    removeFromLikedVideos,
    videoHistoryHandler,
  } = useVideoData();
  console.log(videoDataState.videos[0]?.suggestedVideos)
  const [loading, setLoading] = useState(false);

  const { playlistState } = usePlaylist();
  const [showModal, setShowModal] = useState(false);

  const modalRef = useClickOutside(() => {
    setShowModal(false);
  });

  const addToPlaylist = () => {
    setShowModal(true);
  };

  const currentVideo =
    videoDataState.videos.length !== 0 &&
    videoDataState.videos.find((item) => item._id === videoId);

  return (
    <div className="video-container">
      <div className="player-wrapper">
        <ReactPlayer
          playing
          className="react-player"
          controls
          onStart={() =>
            videoHistoryHandler(authState, currentVideo, videoDataDispatch)
          }
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>

      <div className="video-info-container">
        <div className="video-details">
          <div className="video-info">
            <small className="hash-tags">#PCgames #Live #Music</small>
            <div className="title">{currentVideo.title}</div>
            <div className="views">
              {currentVideo.views} • {currentVideo.timestamp}
              <div className="action-icons">
                <div
                  onClick={() =>
                    likedVideoHandler(
                      authState,
                      currentVideo,
                      videoDataDispatch
                    )
                  }
                  className="action-btn"
                >
                  {videoDataState.likedVideos.find(
                    (item) => item._id === currentVideo._id
                  ) ? (
                    <>
                      <AiFillLike color="#00D4C1" size={28} />
                      <span>768</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineLike size={28} />
                      <span>768</span>
                    </>
                  )}
                </div>

                <div
                  onClick={() =>
                    removeFromLikedVideos(
                      authState,
                      currentVideo._id,
                      videoDataDispatch
                    )
                  }
                  className="action-btn"
                >
                  <AiOutlineDislike size={28} />
                  <span>Dislike</span>
                </div>

                <div className="action-btn" onClick={() => addToPlaylist()}>
                  <RiPlayListAddFill size={28} />
                  <span>save</span>
                </div>

                <div
                  onClick={() =>
                    watchLaterHandler(
                      authState,
                      currentVideo,
                      videoDataDispatch
                    )
                  }
                  className="action-btn"
                >
                  {videoDataState.watchLater.find(
                    (item) => item._id === currentVideo._id
                  ) ? (
                    <>
                      <MdOutlineAddTask color="#00D4C1" size={25} />
                      <span style={{ color: "#00D4C1" }}>Watch Later</span>
                    </>
                  ) : (
                    <>
                      <MdOutlineWatchLater size={25} />
                      <span>Watch Later</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <Modal
              modalRef={modalRef}
              setShowModal={setShowModal}
              playlistVideo={currentVideo}
            />
          )}
          <div className="channel-info">
            <div className="channel-logo">
              <Avatar className="avatar" img={currentVideo.channelImage} />
              <div className="channel-name">
                <h2>{currentVideo.channel}</h2>
                <div className="info">
                  <p>{currentVideo.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="video-Comments">
            <h2>Comments</h2>
          </div>
        </div>
        <div className="similar-videos-area">
          <h2>Must Watch</h2>
          {videoDataState.videos[0]?.suggestedVideos.map((videos)=>(<SuggestredVideoCard videos={videos} />))}
          
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;
