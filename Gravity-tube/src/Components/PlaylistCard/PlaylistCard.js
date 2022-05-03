import React from 'react'
import { IoMdMore } from 'react-icons/io'
import { MdPlaylistPlay } from 'react-icons/md'
import "./PlaylistCard.css"
import emptyLogo  from "../../Assets/Images/empty.png"

function PlaylistCard({playlistItems}) {
  return (
    <div className="playlist-card">
       <img className='playlist-img' src={playlistItems.videos.length > 0 ? playlistItems.videos[0].image : emptyLogo } alt="logo" />
       <div className="playlist-video-count">
         {playlistItems.videos.length}
         <MdPlaylistPlay size={20}/>
       </div>
     </div>
  )
}

export default PlaylistCard