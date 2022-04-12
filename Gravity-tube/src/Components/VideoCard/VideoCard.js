import React from 'react'
import Avatar from '../Avatar/Avatar'
import "./VideoCard.css";

function VideoCard({image,title,channel,views,timestamp,channelImage,livenow}) {
  return (
    <div className='videoCard'>
       <img className='card-image' src={image} alt="logo"/>
       <div className="videoCard--info">
           
           <div className="videoCard--text">
               <div className='videoCard--logo--txt'>
                <Avatar className="avatar" img={channelImage} />
                <h4 className='ml'>{title}</h4>
            </div>
               <div className='videoCard--views'>
                <p>{channel}</p>
                <p className='timestamp'>{views}  •  {timestamp} </p>
                {livenow && <span className='live-tag'>LIVE NOW</span>}
                </div>
               
           </div>
       </div>
        </div>
  )
}

export default VideoCard