import React from 'react'

function playlistReducer(state,{type,payload}) {
  switch (type) {
      case "SET_NEW_PLAYLIST":
          return {...state, playlists: payload}
      case "ADD_VIDEO_DATA_IN_PLAYLIST":
          return  {
            ...state,
            playlists: state.playlists.map((item) =>
              item._id === payload._id
                ? { ...item, videos: payload.videos }
                : item
            ),
          };
      case "REMOVE_PLAYLIST":
          return  {
            ...state,
            playlists: payload
          };
      case "REMOVE_VIDEO_FROM_PLAYLIST":
          return  {
            ...state,
            playlists: state.playlists.map((item)=>
            item._id === payload._id ? {...item, videos: payload.videos} : item)
          };
          
          break;
  
      default:
          break;
  }
}

export default playlistReducer