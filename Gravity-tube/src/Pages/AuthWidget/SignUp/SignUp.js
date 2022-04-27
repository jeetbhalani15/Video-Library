// import "./Login.css";
import { useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { InputPwd } from "../InputPwd";
import { useAuth } from "../../../Contexts/Auth-context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../Assets/Images/logo4.png";
import "./Signup.css";
import Navbar from "../../../Components/Navigation/Navbar";
import Sidebar from "../../../Components/Sidebar/Sidebar";

export function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { authState, authDispatch } = useAuth();

  const initialErrorState = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    pwdError: "",
    confirmPwdError: "",
  };

  const errorReducer = (state, { type, payload }) => {
    switch (type) {
      case "SHOW_FIRST_N_ERROR":
        return { ...state, firstNameError: payload };
      case "SHOW_LAST_N_ERROR":
        return { ...state, lastNameError: payload };
      case "SHOW_EMAIL_ERROR":
        return { ...state, emailError: payload };
      case "SHOW_PWD_ERROR":
        return { ...state, pwdError: payload };
      case "SHOW_CONFIRM_PWD_ERROR":
        return { ...state, confirmPwdError: payload };
      case "CLEAR_ALl_ERRORS":
        return { initialErrorState };
      default:
        return state;
    }
  };
  const [fieldErrors, errorsDispatch] = useReducer(
    errorReducer,
    initialErrorState
  );
  const onFocusCleanErr = (type) => {
    errorsDispatch({ type, payload: "" });
  };
  const formInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_FIRST_NAME":
        return { ...state, firstName: payload };
      case "SET_LAST_NAME":
        return { ...state, lastName: payload };
      case "SET_EMAIL":
        return { ...state, email: payload };
      case "SET_PASSWORD":
        return { ...state, password: payload };
      case "SET_CONFIRM_PWD":
        return { ...state, confirmPassword: payload };
      default:
        return state;
    }
  };

  const [formState, formDispatch] = useReducer(formReducer, formInitialState);

  const formValidation = () => {
    let errFlag = true;
    if (
      formState.firstName === "" ||
      !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.firstName)
    ) {
      errorsDispatch({
        type: "SHOW_FIRST_N_ERROR",
        payload: "Please enter valid name",
      });
      errFlag = false;
    }

    if (
      formState.lastName === "" ||
      !/^[a-zA-Z]+(\s*\w*)*$/.test(formState.lastName)
    ) {
      errorsDispatch({
        type: "SHOW_LAST_N_ERROR",
        payload: "Please enter valid surname",
      });
      errFlag = false;
    }

    if (formState.email === "" || !/^.+@.+\.com$/.test(formState.email)) {
      errorsDispatch({
        type: "SHOW_EMAIL_ERROR",
        payload: "Please enter valid email",
      });
      errFlag = false;
    }

    if (
      formState.password === "" ||
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
        formState.password
      )
    ) {
      errorsDispatch({
        type: "SHOW_PWD_ERROR",
        payload:
          "Password length should contain minimum 8 characters (at least one capital, small letter and number)",
      });
      errFlag = false;
    }
    if (
      formState.confirmPassword === "" ||
      formState.password !== formState.confirmPassword
    ) {
      errorsDispatch({
        type: "SHOW_CONFIRM_PWD_ERROR",
        payload: "Password does not match",
      });
      errFlag = false;
    }
    return errFlag;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (formValidation()) {
      console.log("hi");
      try {
        console.log("try");
        const userData = await axios.post(`/api/auth/signup`, {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
        });
        localStorage.setItem("token", userData.data.encodedToken);
        localStorage.setItem("user", JSON.stringify(userData.data.createdUser));
        authDispatch({ type: "SIGN_UP", payload: userData.data.encodedToken });
        navigate("/");
        toast.success(' User Sign Up Successfully!!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
          });
      } catch (err) {
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
    }
  };

  return (
    <>
    <Navbar />
    <div className="body-content">
      <Sidebar />
      <div className="background">
        <div className="login-box">
          <div className="login-content">
            <div className="auth-logo">
              <div className="logo-mg">
                <img className="logo" src={logo} alt="logo" />
              </div>
            </div>
            <span className="pd">Sign Up with Gravity Tube Account</span>
            <div className="login-credals">
              <form action="#" method="#" className="form login">
                <div className="form__field">
                  <label className="auth-label" htmlFor="login__username">
                    <span className="auth-icon">
                      <i className="fa fa-user"></i>
                    </span>
                    <span className="hidden">First name</span>
                  </label>
                  <input
                    className="form__input log-in-input"
                    id="login__username"
                    placeholder="First name"
                    name="username"
                    type="text"
                    value={formState.firstName}
                    onChange={(e) => {
                      formDispatch({
                        type: "SET_FIRST_NAME",
                        payload: e.target.value,
                      });
                    }}
                    onFocus={() => {
                      onFocusCleanErr("SHOW_FIRST_N_ERROR");
                    }}
                    required
                  />
                </div>
                <div
                  className="form-err"
                  style={{
                    display: fieldErrors.firstNameError ? "block" : "none",
                  }}
                >
                  <span className="form-err-icon">
                    <i className="fa fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.firstNameError}
                </div>

                <div className="form__field">
                  <label className="auth-label" htmlFor="login__username">
                    <span className="auth-icon">
                      <i className="fa fa-user"></i>
                    </span>
                    <span className="hidden">Last name</span>
                  </label>
                  <input
                    className="form__input log-in-input"
                    id="login__username"
                    placeholder="Last name"
                    name="username"
                    type="text"
                    value={formState.lastName}
                    onChange={(e) => {
                      formDispatch({
                        type: "SET_LAST_NAME",
                        payload: e.target.value,
                      });
                    }}
                    onFocus={() => {
                      onFocusCleanErr("SHOW_LAST_N_ERROR");
                    }}
                    required
                  />
                </div>
                <div
                  className="form-err"
                  style={{
                    display: fieldErrors.lastNameError ? "block" : "none",
                  }}
                >
                  <span className="form-err-icon">
                    <i className="fa fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.lastNameError}
                </div>

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
                    placeholder="Email id"
                    name="username"
                    type="text"
                    value={formState.email}
                    onChange={(e) => {
                      formDispatch({
                        type: "SET_EMAIL",
                        payload: e.target.value,
                      });
                    }}
                    onFocus={() => {
                      onFocusCleanErr("SHOW_EMAIL_ERROR");
                    }}
                    required
                  />
                </div>
                <div
                  className="form-err"
                  style={{ display: fieldErrors.emailError ? "block" : "none" }}
                >
                  <span className="form-err-icon">
                    <i className="fa fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.emailError}
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
                    onChangeHandler={(e) => {
                      formDispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                      });
                    }}
                    onFocushandler={() => {
                      onFocusCleanErr("SHOW_PWD_ERROR");
                    }}
                  />
                  
                </div>
                <div
                  className="form-err"
                  style={{ display: fieldErrors.pwdError ? "block" : "none" }}
                >
                  <span className="form-err-icon">
                    <i className="fa fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.pwdError}
                </div>

                <div className="form__field">
                  <label className="auth-label" htmlFor="login__password">
                    <span className="auth-icon">
                      <i className="fa fa-lock"></i>
                    </span>
                    <span className="hidden">Confirm password</span>
                  </label>
                  <InputPwd
                    placeholderTxt={"Confirm password"}
                    value={formState.ConfirmPassword}
                    onChangeHandler={(e) => {
                      formDispatch({
                        type: "SET_CONFIRM_PWD",
                        payload: e.target.value,
                      });
                    }}
                    onFocushandler={() => {
                      onFocusCleanErr("SHOW_CONFIRM_PWD_ERROR");
                    }}
                  />
                </div>
                <div
                  className="form-err"
                  style={{
                    display: fieldErrors.confirmPwdError ? "block" : "none",
                  }}
                >
                  <span className="form-err-icon">
                    <i className="fa fa-exclamation-circle"></i>
                  </span>
                  {fieldErrors.confirmPwdError}
                </div>

                <div className="form__field">
                  <button className="auth-signup-btn" onClick={signupHandler}>
                    CREAT A ACCOUNT
                  </button>
                </div>
              </form>

              <p className="text--center">
                Already have an Account{" "}
                <Link className="auth-link" to="/Login">
                  Login now
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
