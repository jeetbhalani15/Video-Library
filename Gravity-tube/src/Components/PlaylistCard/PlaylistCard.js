import React from 'react'
import { IoMdMore } from 'react-icons/io'
import { MdPlaylistPlay } from 'react-icons/md'
import "./PlaylistCard.css"

function PlaylistCard({playlistItems}) {
  return (
    <div className="playlist-card">
       <img className='playlist-img' src={playlistItems.videos[0].image} alt="logo" />
       <div className="playlist-video-count">
         {playlistItems.videos.length}
         <MdPlaylistPlay size={20}/>
       </div>
     </div>
  )
}

export default PlaylistCard