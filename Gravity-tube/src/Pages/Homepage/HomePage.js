import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import VideoListing from '../../Components/Video-Listing/VideoListing'
import "./HomePage.css";

function HomePage() {
  return (
      <>
      <div className="main">
    <Navbar/>
    <div className="body-content">
      <Sidebar/>
      <VideoListing/>
    </div>
    </div>
    </>
  )
}

export default HomePage