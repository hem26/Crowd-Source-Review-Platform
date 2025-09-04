import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa"
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [Input, setInput] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInput({...Input, [name]:value})
    }

    axios.defaults.credentials = true;
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/login`, {
                email: Input.email,
                password: Input.password
            }, {withCredentials:true})
            if(response.data.isLoggedIn){
                alert("Login Successful");
                localStorage.setItem("isLoggedIn", true);
                navigate("/home");
            }else{
                alert("Login Failed "+ response.data.msg);
            }
            
           

        }catch(error){
            if(error.response && error.response.data && error.response.data.msg){
                alert("Login Failed "+error.response.data.msg)
            }else{
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center">
            <div className="border-2 border-blue-700 shadow-[0_0_20px_#22d3ee] w-150 h-200 rounded-2xl">
                <h1 className="text-white mt-8 text-center text-5xl font-bold">Login</h1>
                <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 px-10 w-full" method="POST">
                    <label htmlFor="email" className="text-white px-1 text-2xl">Email ID</label>
                    <input type="email" name="email" placeholder="Email ID" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />


                    <label htmlFor="password" className="text-white px-1 text-2xl">Password</label>
                    <input type="password" name="password" placeholder="Enter the password" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />

                    <button type="submit" className="border-2 w-40 h-10 border-white text-white bg-transparent hover:bg-white hover:text-black transition rounded-3xl mt-6">
                        Login
                    </button>

                    <h2 className="text-white mt-6 text-center">
                        New to Account ? Please <span className="font-bold"><Link to="/register" className="text-blue-400 hover:text-blue-200">Register</Link></span>
                    </h2>

                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-white text-center">
                            <span className="text-white px-4">OR</span>
                            <div className="flex-grow h-px bg-white"></div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <button onClick={()=>{
                            window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`
                        }} type="button" className="bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-100 flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                                <path d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95.1h147.2c-6.4 34.5-25.1 63.7-53.5 83.1v68.9h86.4c50.6-46.6 81.4-115.4 81.4-196.9z" fill="#4285F4" />
                                <path d="M272 544.3c72.6 0 133.5-23.9 178-64.9l-86.4-68.9c-23.9 16-54.4 25.5-91.6 25.5-70.4 0-130-47.6-151.3-111.4H32.8v69.9C77.7 479.6 168.9 544.3 272 544.3z" fill="#34A853" />
                                <path d="M120.7 324.6c-10.4-30.8-10.4-63.9 0-94.7V160H32.8c-35.4 70.5-35.4 153.2 0 223.7l87.9-69.1z" fill="#FBBC05" />
                                <path d="M272 107.1c39.5 0 75 13.6 103 40.3l77.1-77.1C405.5 24.6 344.6 0 272 0 168.9 0 77.7 64.7 32.8 160l87.9 69.9C142 154.7 201.6 107.1 272 107.1z" fill="#EA4335" />
                            </svg>
                            <span className="font-medium">Google</span>
                        </button>
                    </div>

                    
                </form>
            </div>

        </div>
    )
}

export default Login;