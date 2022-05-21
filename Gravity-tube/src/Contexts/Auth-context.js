import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthReducer } from "../Reducers/AuthReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, { token: null });
  const getToken = localStorage.getItem("token");
  const getUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    authDispatch({ type: "CHECK_TOKEN", payload: getToken });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
