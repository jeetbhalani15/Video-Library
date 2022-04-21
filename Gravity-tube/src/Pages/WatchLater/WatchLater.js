import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import WatchLaterVideos from './Components/WatchLaterVideos'

function WatchLater() {
  return (
    <>
    <div className="content">
   <Navbar/>
   </div>
   <div className="container">
       <Sidebar/>
       <WatchLaterVideos/>
   </div>
  
 </>
  )
}

export default WatchLater