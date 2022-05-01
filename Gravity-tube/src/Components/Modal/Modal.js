
import axios from "axios";
import { Axios } from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../Contexts/Auth-context";
import { usePlaylist } from "../../Contexts/Playlist-context";
import { useVideoData } from "../../Contexts/Videos-context";
import "./Modal.css";

function Modal({modalRef,playlistVideo, setShowModal}) {
  const { authState } = useAuth();
  const { playlistState:{playlists}, playlistDispatch,} = usePlaylist();
  const [playlistName, setPlaylistName] = useState({title:""});
  const {_id: videoId} = playlistVideo;
  
// POST PLAYLIST DATA HANDLER
const postPlaylistData = async(e,authState,playlistDispatch,setPlaylistName,playlistName)=>{
  e.preventDefault();
  console.log("in hello")
  console.log(playlistName)
  console.log(authState.token)
if(authState.token){
  console.log("in hello")
  try {
    const res = await axios.post('/api/user/playlists', {playlist : {title: playlistName}}, { headers: {authorization: authState.token}});
    console.log(res)
    if(res.status === 201){
      playlistDispatch({type:"SET_NEW_PLAYLIST",payload: res.data.playlists})
      setPlaylistName({title:""})
    }
  } catch (error) {
    console.log(error)
  }
}
}


// POST VIDEO IN PLAYLIST ON CHECK USING API
const postVideoDataInPlaylist = async(authState, playlistId, playlistVideo, playlistDispatch)=>{
  if(authState.token){
    try {
      console.log("in")
      console.log(playlistId)
      console.log(playlistVideo)
      const res = await axios.post(`/api/user/playlists/${playlistId}`, { video: playlistVideo }, { headers : {authorization: authState.token}});
      console.log(res)
      if(res.status === 201){
        playlistDispatch({type:"ADD_VIDEO_DATA_IN_PLAYLIST", payload: res.data.playlist})
      }
    } catch (error) {
      console.log(error)
    }
  }
}


// POST VIDEO IN PLAYLIST ON CHECK USING API
const deleteVideoDataInPlaylist = async(authState, playlistId, playlistVideo, playlistDispatch)=>{
  if(authState.token){
    try {
      console.log("in")
      console.log(playlistId)
      console.log(playlistVideo)
      const res = await axios.delete(`/api/user/playlists/${playlistId}/${playlistVideo._id}`, { headers : {authorization: authState.token}});
      console.log(res)
      if(res.status === 201){
        playlistDispatch({type:"ADD_VIDEO_DATA_IN_PLAYLIST", payload: res.data.playlist})
      }
    } catch (error) {
      console.log(error)
    }
  }
}


// ON CHECK VIDEO HANDLER
const onCheckVideoHandler =(playlistId , videos,playlistVideo)=>{
  videos?.find(item => item._id === videoId ) 
  ? (
    deleteVideoDataInPlaylist(authState,playlistId,playlistVideo,playlistDispatch)
  ) 
  : (
    postVideoDataInPlaylist(authState,playlistId,playlistVideo,playlistDispatch)
    )
     
}
  return (
    
    <div ref={modalRef} className="playlist-conatainer">
   <div className="playlist-box">  
    <div>
        <h1 className="playlist-header">Create New Playlist</h1> <IoClose onClick={()=>setShowModal(false)} className="close-btn" size={25}/>
      </div>
      <form onSubmit = {(e)=>postPlaylistData(e,authState,playlistDispatch,setPlaylistName,playlistName)}>
        <div className="playlist-text">
          <label>Playlist Name</label>
          <input
            className="playlist-input"
            placeholder="Create your Playlist here..."
            type="text"
            maxLength={12}
            onChange={(e) => setPlaylistName((pre)=>({...pre, title : e.target.value}))}
            value={playlistName.title}
          />
        </div>
     { playlists?.map(({title:{title}, videos, _id: playlistId, isChecked})=>{
       
       return (
        <div key={playlistId} className="label-box">
        <label htmlFor={playlistId}>
            <input type="checkbox" id={playlistId} 
            checked ={videos?.find((item=> item._id === videoId ? true : false))}
            onClick={()=>{onCheckVideoHandler(playlistId,videos,playlistVideo)}} />
            {title}
          </label>
          </div>
          )
        
     }) 
     
    }
        

        <div>
          <button type="Submit"  className="playlist-btn">Create playlist</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Modal;
