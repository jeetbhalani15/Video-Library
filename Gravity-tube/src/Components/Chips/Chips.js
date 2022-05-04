import React from 'react'
import { useFilter } from '../../Contexts/Filter-context';
import { useVideoData } from '../../Contexts/Videos-context'
import "./Chips.css"

function Chips() {
    const {videoDataState} = useVideoData();
    const {filterDispatch, filterState} = useFilter();
    console.log(videoDataState.categories)

    const applyFilter = (filterCategory, filterDispatch) => {
      filterDispatch({ type : "FILTER_BY_CATEGORY", payload : filterCategory })
    }
  return (

    <div className="chips-box">
        { videoDataState.categories.map((item)=>(
        <div onClick={()=>applyFilter(item.categoryName,filterDispatch)} key={item._id} 
        className= {filterState.category === item.categoryName ? "single-chip active" : "single-chip"  } >
          {item.categoryName}
        </div>
        )) }
      </div>
  )
}

export default Chips