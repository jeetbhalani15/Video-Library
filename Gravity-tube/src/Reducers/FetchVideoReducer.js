import React from 'react'

function FetchVideoReducer(state,{type,payload}) {
    switch (type) {
        case "ON_SUCCESS":
            return {...state, videos: payload}    
        case "CATEGORIES_DATA":
            return {...state, categories: payload}    
        case "ADD_TO_WATCH_LATER":
            return {...state, watchLater: payload}
        case "REMOVE_FROM_WATCH_LATER":
            return {...state, watchLater: payload}
        case "ADD_TO_LIKED_VIDEOS":
            return {...state, likedVideos: payload}
        case "REMOVE_FROM_LIKED_VIDEOS":
            return {...state, likedVideos: payload}
        case "ADD_TO_HISTORY":
            return {...state, history: payload}
        case "REMOVE_FROM_HISTORY":
            return {...state, history: payload}
        case "CLEAR_ALL_HISTORY":
            return {...state, history: payload}
            
            

        default:
            state;
    }
  
}

export default FetchVideoReducer