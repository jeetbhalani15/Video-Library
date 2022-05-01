import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import VideoPlaylist from './component/VideoPlaylist'

function Playlist() {
  return (
    <>
    <div className="content">
   <Navbar/>
   </div>
   <div className="container">
       <Sidebar/>
       <VideoPlaylist/>
   </div>
  
 </>
  )
}

export default Playlist