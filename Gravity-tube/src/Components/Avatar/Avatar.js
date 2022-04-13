import React from 'react'
import "./avatar.css";

function Avatar({img}) {
  return (

        <img className='avtar-pic' src={img} alt="logo"/>
    
  )
}

export default Avatar