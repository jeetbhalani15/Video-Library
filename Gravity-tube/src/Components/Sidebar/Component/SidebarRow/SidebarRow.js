import {React, useState} from 'react'

import "./SidebarRow.css";

function SidebarRow({Icon, title}) {
  const [selected, setSelected] = useState(false);
  return (
    <div onClick={()=>setSelected(true)} className={`sidebar-row ${selected && "selected"}`}>
        <Icon size={28} className="sidebar-icon"/>
        <h2 className='sidebar-title'>{title}</h2>
        </div>
  )
}

export default SidebarRow