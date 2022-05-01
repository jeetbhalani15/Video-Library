import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import avtarpic from "../../Assets/Images/pic.png";
import logo from "../../Assets/Images/logo4.png";
import "./Navbar.css";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/Auth-context";
import { useClickOutside } from "../../Hooks/useClickOutside";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { authState, getUser } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  let domNode = useClickOutside(() => {
    setShowMenu(false);
  });
  return (
    <div className="navbar">
      {/* NAVBAR_LEFT_SECTION */}

      <div className="navbar--left">
        <FiMenu size={20} />
        <div className="navbar--logo">
          <img className="logo-size" src={logo} alt="" srcset="" />
          <div className="bg-color">
            <Link className="link" to="/">
            <div className="logo-txt">GRAVITY</div>
            <small className="small-txt">Tube</small>
            </Link>
          </div>
        </div>
      </div>

      {/* NAVBAR_INPUT_SECTION */}

      <div className="navbar--input">
        <input type="text" placeholder="Search.." />
        <IoIosSearch className="search-btn" size={30} />
      </div>

      {/* NAVBAR_ICONS_SECTION */}

      <div onClick={() => toggleMenu()} className="navbar--icons">
        {/* <RiVideoAddFill size={20} />
        <BsGrid3X3Gap size={20}/>
        <IoIosNotifications size={20}/> */}
        <Avatar img={avtarpic} />
      </div>

      {showMenu && (
        <div ref={domNode} className="drop-down-menu">
          {console.log(getUser)}
          {getUser ? (
            <div className="menu-options">
              <h3>Hi, {getUser.firstName}</h3>
              <small>{getUser.email}</small>
            </div>
          ) : (
            <div className="menu-options">
              <h3>Hi, Guest</h3>
              <small>guest@gmail.com</small>
            </div>
          )}

          <div className="menu-options">
            {authState.token ? (
              <Link to={"/logout"}>
                <button className="logout-btn">LOG OUT</button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="logout-btn">LOG IN</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
