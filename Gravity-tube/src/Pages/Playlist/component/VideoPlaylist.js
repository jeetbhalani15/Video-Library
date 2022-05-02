import axios from "axios";
import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { MdOutlineWatchLater, MdPlaylistPlay } from "react-icons/md";
import { RiDeleteBin6Line, RiLock2Line, RiPlayList2Fill } from "react-icons/ri";
import PlaylistCard from "../../../Components/PlaylistCard/PlaylistCard";
import { useAuth } from "../../../Contexts/Auth-context";
import { usePlaylist } from "../../../Contexts/Playlist-context";
import { useClickOutside } from "../../../Hooks/useClickOutside";
import HorizontalVideoCard from "../../WatchLater/Components/HorizontalVideoCard";

function VideoPlaylist() {
  const { authState } = useAuth();
  const {
    playlistState: { playlists },
    playlistDispatch,
  } = usePlaylist();
  const [playlistId, setPlaylistId] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const { playlists: _id } = playlists;

  const checkId = (_id, title) => {
    setPlaylistId(_id);
    setPlaylistTitle(title);
  };

  const playlist = playlists.reduce(
    (acc, item) => (item._id === playlistId ? item : acc),
    { title: "", videos: [], _id: "" }
  );
  const {
    title: { title },
    videos,
  } = playlist;

  // DELETE PLAYLIST HANDLER
  const deletePlaylist = async (authState, playlistId, playlistDispatch) => {
    try {
      console.log("inside try");
      console.log(playlistId);
      const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: { authorization: authState.token },
      });

      console.log(res);
      playlistDispatch({
        type: "REMOVE_PLAYLIST",
        payload: res.data.playlists,
      });
      console.log("dleteed");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PLAYLIST VIDEO HANDLER
  const removePlaylistVideo = async (
    authState,
    _id,
    videoId,
    playlistDispatch
  ) => {
    try {
      console.log("inside try");
      console.log(videoId);
      console.log(playlist);
      console.log(_id);
      const res = await axios.delete(`/api/user/playlists/${_id}/${videoId}`, {
        headers: { authorization: authState.token },
      });

      console.log(res);
      playlistDispatch({
        type: "REMOVE_VIDEO_FROM_PLAYLIST",
        payload: res.data.playlist,
      });
      console.log("dleteed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="watch-later-box">
      <div className="watch-later-info">
        <div className="watchlater-img">
          <MdOutlineWatchLater color="#313e3d" size={130} />
        </div>
        <h1>My Playlist</h1>
        <span className="watchlater-views">
          {playlists.length} playlist • updated today
        </span>
        <div className="tag">
          <RiLock2Line color="grey" size={12} />
          <span className="tag-txt">Private</span>
        </div>
        <hr />
        <div className="playlist-card-area">
          {playlists?.map((item, index) => (
            <>
              <div
                className="div"
                onClick={() => checkId(item._id, item.title.title)}
              >
                <PlaylistCard key={index} playlistItems={item} />

                <span className="playlist-info">
                  {item.title.title}
                  <div
                    className="delete-btn"
                    onClick={() =>
                      deletePlaylist(authState, item._id, playlistDispatch)
                    }
                  >
                    <RiDeleteBin6Line className="menu-det-btn" size={20} />
                  </div>
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="watch-later-videos">
        <div className="watchlater-video-box">
          <h1>Playlist Videos </h1>
          <small className="playlist-tag">
            <RiPlayList2Fill /> {playlistTitle}
          </small>
          {videos?.reverse().map((item) => {
            return (
              <>
                {videos.length === null ? (
                    <div className="no-video-logo">
                    <RiPlayList2Fill size={130} />
                    <h1>Your playlist is empty</h1>
                    <small>Add some videos to get started</small>
                    </div>
                 
                 
                ) : (
                  <HorizontalVideoCard
                  video={item}
                  deleteHandler={removePlaylistVideo}
                  playlistId={playlistId} />
                 
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoPlaylist;

