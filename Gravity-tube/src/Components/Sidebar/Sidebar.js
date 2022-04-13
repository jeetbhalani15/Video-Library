import React from 'react'
import SidebarRow from './Component/SidebarRow/SidebarRow';
import {TiHome} from "react-icons/ti";
import {MdOutlineExplore} from "react-icons/md";
import {MdOutlineSubscriptions} from "react-icons/md";
import {MdOutlineLibraryAdd} from "react-icons/md";
import {RiHistoryFill} from "react-icons/ri";
import {RiVideoFill} from "react-icons/ri";
import {MdWatchLater} from "react-icons/md";
import {AiFillLike} from "react-icons/ai";
import {MdExpandMore} from "react-icons/md";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className='sidebar-box'>
        <SidebarRow selected Icon={TiHome} title="Home"/>
        <SidebarRow Icon={MdOutlineExplore} title="Explore"/>
        <SidebarRow Icon={MdOutlineSubscriptions} title="Subscription"/>
        <hr/>
        <SidebarRow Icon={MdOutlineLibraryAdd} title="Library"/>
        <SidebarRow Icon={RiHistoryFill} title="History"/>
        <SidebarRow Icon={RiVideoFill} title="Your videos"/>
        <SidebarRow Icon={MdWatchLater} title="Watch later"/>
        <SidebarRow Icon={AiFillLike} title="Liked videos"/>
        <SidebarRow Icon={MdExpandMore} title="Show more"/>
        <hr/>
        </div>
  )
}

export default Sidebar