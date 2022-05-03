import axios from 'axios';
import { Navigate } from 'react-router-dom';

    // POST PLAYLIST DATA HANDLER
    export const postPlaylistData = async(e,authState,playlistDispatch,setPlaylistName,playlistName,navigate)=>{
    e.preventDefault();
    if(authState.token){
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
  } else {
      navigate("/login")
  }
  }


  // POST VIDEO IN PLAYLIST ON CHECK USING API
     export const postVideoDataInPlaylist = async(authState, playlistId, playlistVideo, playlistDispatch)=>{ 
     if(authState.token){
      try {
        const res = await axios.post(`/api/user/playlists/${playlistId}`, { video: playlistVideo }, { headers : {authorization: authState.token}});
        if(res.status === 201){
          playlistDispatch({type:"ADD_VIDEO_DATA_IN_PLAYLIST", payload: res.data.playlist})
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  

    // DELETE PLAYLIST HANDLER
    export const deletePlaylist = async (authState, playlistId, playlistDispatch) => {
        try {
          const res = await axios.delete(`/api/user/playlists/${playlistId}`, {
            headers: { authorization: authState.token },
          });
          playlistDispatch({
            type: "REMOVE_PLAYLIST",
            payload: res.data.playlists,
          });
        } catch (error) {
          console.log(error);
        }
      };

    
        // DELETE PLAYLIST VIDEO HANDLER
        export const removePlaylistVideo = async (authState,_id,videoId, playlistDispatch) => {
            try {
            const res = await axios.delete(`/api/user/playlists/${_id}/${videoId}`, {
                headers: { authorization: authState.token },
            });

            playlistDispatch({
                type: "REMOVE_VIDEO_FROM_PLAYLIST",
                payload: res.data.playlist,
            });
            } catch (error) {
            console.log(error);
            }
        };
  


