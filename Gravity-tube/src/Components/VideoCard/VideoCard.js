import React from 'react'
import { IoMdMore } from 'react-icons/io';
import Avatar from '../Avatar/Avatar'
import { Link, useNavigate } from 'react-router-dom';
import "./VideoCard.css";

function VideoCard({video}) {

  return (
    <div className='videoCard' key={video._id}  >
       <div><Link to={`/video/${video._id}`}><img className='card-image' src={video.image} alt="logo"/></Link>
       <div className="videoCard--info">
           
           <div className="videoCard--text">
               <div className='videoCard--logo--txt'>
                <Avatar className="avatar" img={video.channelImage} />
                <h4 className='ml'>{video.title}</h4>
                <IoMdMore className='more-option-btn' size={45}/>
            </div>
               <div className='videoCard--views'>
                <p>{video.channel}</p>
                <p className='timestamp'>{video.views}  •  {video.timestamp} </p>
                {/* {<span className='live-tag'>LIVE NOW</span>} */}
                </div>
               
           </div>
       </div>
        </div>
        </div>
  )
}

export default VideoCard