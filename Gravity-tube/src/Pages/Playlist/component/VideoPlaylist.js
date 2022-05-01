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
  const {authState}=useAuth();
  const {
    playlistState: { playlists },
    playlistDispatch
  } = usePlaylist();
  const [playlistId, setPlaylistId] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const {playlists:_id} = playlists
  const checkId = (_id, title) => {
    setPlaylistId(_id);
    setPlaylistTitle(title);
  };

  const menuRef = useClickOutside(()=>{
    setShowMenu(false)
  })

  
  const playlist = playlists.reduce(
    (acc, item) => (item._id === playlistId ? item : acc),
    { title: "", videos: [], _id: "" }
  );
  const {
    title: { title },
    videos,
  } = playlist;
  6;
  
// DELETE PLAYLIST HANDLER
const deletePlaylist = async(authState, _id, playlistDispatch)=>{
  try {
    const res = await axios.delete(`/api/user/playlists/${_id}`, { headers : { authorization : authState.token}});
    playlistDispatch({type:"ADD_VIDEO_DATA_IN_PLAYLIST", payload: res.data.playlists})
  } catch (error) {
    console.log(error)
  }

}


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
              </div>
              <span className="playlist-info">
                {item.title.title}{" "}
                <IoMdMore onClick={() => setShowMenu(!showMenu)} size={25} />
              </span>
            </>
          ))}
        </div>

        {showMenu && (
          <div ref={menuRef} className="menu-box">
            <div onClick={()=>deletePlaylist(authState,playlistId,playlistDispatch)} className="menu-opt">
              <RiDeleteBin6Line className="menu-det-btn" size={18} />
              Delete Playlist
            </div>
          </div>
        )}
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
                <HorizontalVideoCard video={item} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoPlaylist;
