import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../../Components/Navigation/Navbar";
import { useAuth } from "../../../Contexts/Auth-context";
import "./Logout.css";


export function Logout() {
  const { authState, authDispatch } = useAuth();
  return (
    <>
      <Navbar/>
        <div class="logout-box">
          <section class="logout-container flex">
            <FaCheckCircle color="green" size={35}/>
            <p class="logout-text">You have been logged out successfully!!</p>
            <Link to="/" class="return-btn" onClick={(authState.token = null)}>
              Back to Home
            </Link>
          </section>
        </div>
      
      </>
  );
}
