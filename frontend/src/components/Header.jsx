import React from "react";
import rmlogo from "../assets/rmlogo.png"
import { useNavigate } from "react-router-dom";
const Header = () =>{
    const navigate = useNavigate();
    return (
        <div>
            <header className="border-1 w-full h-32 flex justify-between">
                <img src={rmlogo} className="w-45 h-30 mb-10 ml-20"></img>
                <ul className="w-100 h-20 mt-5 flex justify-evenly items-center">
                    <button className="border-2 w-40 h-15 rounded-3xl cursor-pointer" onClick={()=>{
                        navigate("/signup");
                    }}>Signup</button>             
                    <button className="border-2 w-40 h-15 rounded-3xl cursor-pointer" onClick={()=>{
                        navigate("/signin");
                    }}>Signin</button>
                 </ul>
            </header>
        </div>
    )
}

export default Header;