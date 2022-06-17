import React from 'react'
import { Link } from 'react-router-dom'

const SuggestredVideoCard = ({videos}) => {
  return (
          <Link className='link' to={`/video/${videos?._id}`}>
              <div key={videos._id} className="similar-video-card">
              <img
                src={videos?.image}
                alt="logo"
                />
              <div className="similar-video-title">
                <h4>
                  {videos?.title}
                </h4>
                <div className="similar-video-title">
                  {videos?.channel}
                  <div>{videos?.views} • {videos?.timestamp}</div>
                </div>
              </div>
            </div>
                </Link>
  )
}

export default SuggestredVideoCard