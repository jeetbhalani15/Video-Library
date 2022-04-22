import React, { useState } from 'react'
import { IoMdMore } from 'react-icons/io'
import { MdOutlinePlaylistAdd, MdOutlineWatchLater } from 'react-icons/md';
import { RiDeleteBin6Line, RiDeleteBinLine, RiShareForwardLine } from 'react-icons/ri';
import { VscGrabber } from 'react-icons/vsc'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Contexts/Auth-context';
import { useVideoData } from '../../../Contexts/Videos-context';

function HorizontalVideoCard({video}) {
    const{authState} = useAuth();
    const {videoDataDispatch, removeFromWatchLater} = useVideoData();
    const [showOptions, setShowOptions] = useState(false);

    const toggleMoreOption = () => {
      setShowOptions(!showOptions);
    };

  return (
    <div className="horizontal-video-card">
    <div className="grab-move">
        <VscGrabber color='grey' size={30}/>
    </div>
    <div className="video-img">
       <Link to={`/video/${video._id}`} > <img className='horizontal-card-img' src={video.image}/></Link>
    </div>
    <div className="horizontal-video-info">
        <h4>{video.title}</h4>
        <span className='horizontal-video-channel'>{video.channel}</span>
    </div>
    <div className="horizontal-more-option">
        <IoMdMore onClick={() => toggleMoreOption()} size={25}/>
    </div>

    {showOptions && (
            <div className="watchlater-option-box">
              <div className="options">
                  <RiDeleteBin6Line size={25} />
                <span onClick={()=>removeFromWatchLater(authState,video._id,videoDataDispatch)}>
                  Remove from Watch later
                </span>
              </div>
              {/* <div className="options">
               
                <MdOutlinePlaylistAdd size={25} />

                <span>Save to playlist</span>
              </div>
              <div className="options">
                <RiShareForwardLine size={25} />
                <span>Share</span>
              </div> */}
            </div>
          )}

</div>

  )
}

export default HorizontalVideoCard