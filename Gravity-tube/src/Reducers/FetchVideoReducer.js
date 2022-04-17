import React from 'react'

function FetchVideoReducer(state,{type,payload}) {
    switch (type) {
        case "ON_SUCCESS":
            return {...state, videos: payload}
            
            break;
    
        default:
            break;
    }
  
}

export default FetchVideoReducer