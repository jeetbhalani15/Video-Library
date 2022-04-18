import React from 'react'
import "./SidebarRow.css";

function SidebarRow({selected,Icon, title}) {
  return (
    <div className={`sidebar-row ${selected && "selected"}`}>
        <Icon size={28} className="sidebar-icon"/>
        <h2 className='sidebar-title'>{title}</h2>
        </div>
  )
}

export default SidebarRow