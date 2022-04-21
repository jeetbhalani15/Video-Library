import React from 'react'

function FetchVideoReducer(state,{type,payload}) {
    switch (type) {
        case "ON_SUCCESS":
            return {...state, videos: payload}
        case "WATCH_LATER":
            return {...state, watchLater: payload}
        case "REMOVE_FROM_WATCH_LATER":
            return {...state, watchLater: payload}
            
            break;
    
        default:
            break;
    }
  
}

export default FetchVideoReducer