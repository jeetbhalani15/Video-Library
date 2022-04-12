import React from 'react'
import Navbar from '../../Components/Navigation/Navbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import VideoListing from '../../Components/Video-Listing/VideoListing'
import "./HomePage.css";

function HomePage() {
  return (
      <>
    <Navbar/>
    <div className="body-content">
      <Sidebar/>
      <VideoListing/>
    </div>
    </>
  )
}

export default HomePage