import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import LikedVideosPage from './Components/LikedVideosPage'

function LikedVideos() {
  return (
    <>
    <div className="content">
   <Navbar/>
   </div>
   <div className="container">
       <Sidebar/>
       <LikedVideosPage/>
   </div>
  
 </>
  )
}

export default LikedVideos