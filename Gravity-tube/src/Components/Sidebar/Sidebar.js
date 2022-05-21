import React from "react";
import SidebarRow from "./Component/SidebarRow/SidebarRow";
import { TiHome } from "react-icons/ti";
import { MdOutlineExplore, MdPlaylistPlay } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";
import { RiVideoFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-box">
      <Link className="link" to={"/"}>
        {" "}
        <SidebarRow selected Icon={TiHome} title="Home" />
      </Link>
      <SidebarRow Icon={MdOutlineExplore} title="Explore" />
      <SidebarRow Icon={MdOutlineSubscriptions} title="Subscription" />
      <hr />
      <Link className="link" to={"/my-playlist"}>
        <SidebarRow Icon={MdPlaylistPlay} title="Playlist" />
      </Link>
      <Link className="link" to={"/history"}>
        <SidebarRow Icon={RiHistoryFill} title="History" />
      </Link>
      <SidebarRow Icon={RiVideoFill} title="Your videos" />
      <Link className="link" to={"/watchLater"}>
        <SidebarRow Icon={MdWatchLater} title="Watch later" />
      </Link>
      <Link className="link" to={"/likedvideos"}>
        <SidebarRow Icon={AiFillLike} title="Liked videos" />
      </Link>
      <SidebarRow Icon={MdExpandMore} title="Show more" />
      <hr />
    </div>
  );
}

export default Sidebar;
