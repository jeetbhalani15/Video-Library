import "./Login.css";
import { Link } from "react-router-dom";
import { InputPwd } from "../InputPwd";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { useAuth } from "../../../Contexts/Auth-context";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../Assets/Images/logo4.png";

export function Login() {
  const { authState, authDispatch } = useAuth();

  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const dummyData = {
    email: "guest@gmail.com",
    password: "Abc@1234",
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_EMAIL":
        return { ...state, email: payload };

      case "SET_PASSWORD":
        return { ...state, password: payload };

      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, initialState);

  const LoginHandler = async (e) => {
    e.preventDefault();
    console.log(formState.email)
    console.log(formState.password)
    try {
      console.log("hi");
      console.log(formState);
      const userData = await axios.post("/api/auth/login", {
        email: formState.email,
        password: formState.password,
      });
      console.log(authState.token);
      localStorage.setItem("token", userData.data.encodedToken);
      authDispatch({ type: "LOG_IN", payload: userData.data.encodedToken });
      navigate("/");
      toast.success(' Logged In Successfully!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
        });
    } catch (error) {
      alert(error);
      toast.error(' Something went Wrong!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };
  return (
      <div className="background">
        <div className="login-box">
          <div className="login-content">
            <div className="auth-logo">
              <div className="logo-mg">
                <img className="logo" src={logo} alt="logo" />
              </div>
              {/* <div className="bg-color">
                <div>GRAVITY</div>
                <small className="small-txt">Tube</small>
              </div> */}
            </div>
            <span className="pd">Login with Gravity Tube Account</span>
            <div className="login-credals">
              <form
                action="#"
                method="#"
                className="form login"
                onSubmit={LoginHandler}
              >
                <div className="form__field">
                  <label className="auth-label" htmlFor="login__username">
                    <span className="auth-icon">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <span className="hidden">Email address</span>
                  </label>
                  <input
                    className="form__input log-in-input"
                    id="login__username"
                    type="text"
                    name="username"
                    value={formState.email}
                    placeholder="Email address"
                    required
                    onChange={(e) =>
                      formDispatch({
                        type: "SET_EMAIL",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form__field">
                  <label className="auth-label" htmlFor="login__password">
                    <span className="auth-icon">
                      <i className="fa fa-lock"></i>
                    </span>
                    <span className="hidden">Password</span>
                  </label>
                  <InputPwd
                    placeholderTxt={"Password"}
                    value={formState.password}
                    onChangeHandler={(e) =>
                      formDispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form__field">
                <div className="guest-btn">
                <p
                  className="guest-login-btn"
                  onClick={(event) => {
                    formDispatch({
                      type: "SET_EMAIL",
                      payload: dummyData.email,
                    });
                    formDispatch({
                      type: "SET_PASSWORD",
                      payload: dummyData.password,
                    });
                  }}
                >
                  Use Guest Credential
                </p>
              </div>
                </div>
                <div className="form__field">
                  <button
                    type="submit"
                    onClick={LoginHandler}
                    className="auth-signup-btn"
                  >
                    LOG IN
                  </button>
                </div>
              </form>
             
              <p className="text--center">
                Not a member?{" "}
                <Link className="link" to="/SignUp">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
