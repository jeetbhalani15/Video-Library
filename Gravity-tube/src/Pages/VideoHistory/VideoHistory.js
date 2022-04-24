import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import VideoHistoryPage from './Components/VideoHistoryPage'

function VideoHistory() {
  return (
    <>
    <div className="content">
   <Navbar/>
   </div>
   <div className="container">
       <Sidebar/>
       <VideoHistoryPage/>
   </div>
  
 </>
  )
}

export default VideoHistory