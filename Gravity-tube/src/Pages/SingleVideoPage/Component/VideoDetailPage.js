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
                        <RiPlayListAddFill  size={28} />
                        <span >save</span>
                        {/* <RiPlayListAddFill color="#00D4C1" size={28} />
                        <span style={{ color: "#00D4C1" }}>save</span> */}
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
          <Link to={`/video/${videoId}`}><div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/GbQ8WKE6A9M/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDxaeNu_Qvu40rsQmeP4FTkI2i9vQ"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>Badminton Deception | Most Unpredictable Shots in this...</h4>
              <div className="similar-video-title">
                Olympics
                <div>1.3M views • 1 month agp</div>
              </div>
            </div>
          </div></Link>
          <div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/aWzlQ2N6qqg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAqEVUzcUs517Q228R5STiEXhP7xQ"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>
                Marvel Studios' Doctor Strange in the Multiverse Official..
              </h4>
              <div className="similar-video-title">
                Marvel Entertainment
                <div>47M views • 5 days ago</div>
              </div>
            </div>
          </div>
          <div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/FokmgJ3bIoM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD1-OlZpM7Q5GUTf7pNes6IdzZBUQ"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>THE LAUNCH PARTY [DAY 2] BATTLEGROUNDS MOBILE..</h4>
              <div className="similar-video-title">
                BATTLEGROUNDS MOBILE INDIA ✔
                <div>7.1M views • streamed 5months ago</div>
              </div>
            </div>
          </div>
          <div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/x0J4Cd-Zmyc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB9keBry5T9VJ9XrRG3A4u5NVkObw"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>THE LAUNCH PARTY [DAY 2] BATTLEGROUNDS MOBILE..</h4>
              <div className="similar-video-title">
                Your Tech Support & Gaming
                <div>4,692 views • Apr 16, 2022</div>
              </div>
            </div>
          </div>
          <div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/eWjGh61Gacg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDzgOnlA3uwi9uST_l_gwiTiGONUA"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>Baaki Baatein Peene Baad - Arjun Kanungo feat. Badshah |</h4>
              <div className="similar-video-title">
                Sony Music India
                <div>64M views • 6 year ago</div>
              </div>
            </div>
          </div>
          <div className="similar-video-card">
            <img
              src="https://i.ytimg.com/vi/lSYKQjg_5ZQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC6iPngPdFtBAmDrjOIDAlecGXiFA"
              alt="logo"
            />
            <div className="similar-video-title">
              <h4>Far Cry 6 - Full Game Cinematic Playthrough - 4K RTX ON</h4>
              <div className="similar-video-title">
                DraKulis Cinematic Gaming
                <div>855k views • 1 year ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailPage;
