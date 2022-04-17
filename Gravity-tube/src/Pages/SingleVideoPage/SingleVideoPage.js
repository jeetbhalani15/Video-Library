import React from 'react'
import Navbar from '../../Components/Navigation/Navbar';
import VideoDetailPage from './Component/VideoDetailPage';

function SingleVideoPage() {
  return (
    <>
     <div className="content">
    <Navbar/>
    </div>
    <div className="body-content">
     <VideoDetailPage/>
    </div>
   
  </>
  )
}

export default SingleVideoPage