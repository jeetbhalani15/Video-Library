import React from "react";
import { FiMenu } from "react-icons/fi";
import {IoIosSearch} from "react-icons/io"
import {RiVideoAddFill} from "react-icons/ri";
import {BsGrid3X3Gap} from "react-icons/bs"
import {IoIosNotifications} from "react-icons/io";
import avtarpic from "../../Assets/Images/pic.png";
import logo from "../../Assets/Images/logo4.png";
import "./Navbar.css";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
     
     {/* NAVBAR_LEFT_SECTION */}
              
      <div className="navbar--left">
        <FiMenu size={20} />
        <div className="navbar--logo">
          <img className="logo-size" src={logo} alt="" srcset="" />
          <div className="bg-color">
            {/* <Link to="/"> */}
            <div className="logo-txt">GRAVITY</div>
            <small className="small-txt">Tube</small>
            {/* </Link> */}
          </div>
        </div>
      </div>
 
      {/* NAVBAR_INPUT_SECTION */}

      <div className="navbar--input">
        <input type="text" />
        <button className="search-btn"><IoIosSearch size={18} /></button>
      </div>

      {/* NAVBAR_ICONS_SECTION */}

      <div className="navbar--icons">
        <RiVideoAddFill size={20} />
        <BsGrid3X3Gap size={20}/>
        <IoIosNotifications size={20}/>
        <Link to="/login"><Avatar  img={avtarpic}/></Link>
      </div>

    </div>
  );
}

export default Navbar;
