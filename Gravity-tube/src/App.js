import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import { Login } from "./Pages/AuthWidget/Login/Login";
import { SignUp } from "./Pages/AuthWidget/SignUp/SignUp";
import HomePage from "./Pages/Homepage/HomePage";

function App() {
  return (
   <section>
     <Routes>
       <Route exact path="/" element={<HomePage/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/signup" element={<SignUp/>}/>
     </Routes>
     
   </section>
  );
}

export default App;
