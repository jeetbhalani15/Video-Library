import React from 'react'
import { IoMdMore } from 'react-icons/io'
import { MdOutlineWatchLater } from 'react-icons/md'
import { RiLock2Line } from 'react-icons/ri'
import { VscGrabber } from 'react-icons/vsc'
import { useVideoData } from '../../../Contexts/Videos-context'
import HorizontalVideoCard from './HorizontalVideoCard'
import "./WatchlaterVideos.css"

function WatchLaterVideos() {
    const {videoDataState} = useVideoData();
  return (
    <div className="watch-later-box">
        <div className="watch-later-info">
        <div className='watchlater-img'><MdOutlineWatchLater color='#313e3d' size={130}/>
        </div>
        <h1>Watch later</h1>
        <span className='watchlater-views'>
         {videoDataState.watchLater.length} Videos • 0 views • updated today</span>
         <div className="tag">
         <RiLock2Line color='grey' size={12}/><span className='tag-txt'>Private</span>
         </div>
         <hr/>
        </div>
        <div className="watch-later-videos">
        <div className="watchlater-video-box">
            {console.log(videoDataState.watchLater)}
            {videoDataState.watchLater.map((video)=>(<HorizontalVideoCard video={video}/>))}
        
        </div>
        </div>
    </div>
  )
}

export default WatchLaterVideos