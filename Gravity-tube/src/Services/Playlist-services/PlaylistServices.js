import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useVideoData } from "../../Contexts/Videos-context";

// POST PLAYLIST DATA HANDLER
export const postPlaylistData = async (
  e,
  authState,
  playlistDispatch,
  setPlaylistName,
  playlistName,
  navigate,
  toastProp
) => {
  e.preventDefault();
  if (authState.token) {
    try {
      const res = await axios.post(
        "/api/user/playlists",
        { playlist: { title: playlistName } },
        { headers: { authorization: authState.token } }
      );
      console.log(res);
      if (res.status === 201) {
        playlistDispatch({
          type: "SET_NEW_PLAYLIST",
          payload: res.data.playlists,
        });
        setPlaylistName({ title: "" });
        toast.success("Playlist Created successfully!", toastProp);
      }
    } catch (error) {
      toast.error("Something went wrong", toastProp);
    }
  } else {
    navigate("/login");
  }
};

// POST VIDEO IN PLAYLIST ON CHECK USING API
export const postVideoDataInPlaylist = async (
  authState,
  playlistId,
  playlistVideo,
  playlistDispatch,
  toastProp
) => {
  if (authState.token) {
    try {
      const res = await axios.post(
        `/api/user/playlists/${playlistId}`,
        { video: playlistVideo },
        { headers: { authorization: authState.token } }
      );
      if (res.status === 201) {
        playlistDispatch({
          type: "ADD_VIDEO_DATA_IN_PLAYLIST",
          payload: res.data.playlist,
        });
        toast.success("Video Added to playlist", toastProp);
      }
    } catch (error) {
      toast.error("Something went wrong", toastProp);
    }
  }
};

// DELETE PLAYLIST HANDLER
export const deletePlaylist = async (
  authState,
  playlistId,
  playlistDispatch,
  toastProp
) => {
  try {
    const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
      headers: { authorization: authState.token },
    });
    playlistDispatch({
      type: "REMOVE_PLAYLIST",
      payload: res.data.playlists,
    });
    toast.success("Playlist Deleted", toastProp);
  } catch (error) {
    toast.error("Something went wrong", toastProp);
  }
};

// DELETE PLAYLIST VIDEO HANDLER
export const removePlaylistVideo = async (
  authState,
  _id,
  videoId,
  playlistDispatch,
  toastProp
) => {
  try {
    const res = await axios.delete(`/api/user/playlists/${_id}/${videoId}`, {
      headers: { authorization: authState.token },
    });

    playlistDispatch({
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      payload: res.data.playlist,
    });
    toast.success("Video Removed From Playlist", toastProp);
  } catch (error) {
    toast.error("Something went wrong", toastProp);
  }
};
