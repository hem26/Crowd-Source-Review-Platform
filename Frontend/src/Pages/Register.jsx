import { Link } from "react-router-dom";
import { useState } from "react"; 
import  axios  from "axios";
const Register = () => {
  const [Input, setInput] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    terms: ""
  });
  
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setInput({...Input, [name]: value})
  }



  axios.defaults.credentials = true;
  const handleSubmit = async(e) =>{
    // Write these codes below - 
    e.preventDefault();


    // Use try and catch for submitting document through axios
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, {
        firstName:Input.firstName,
        lastName: Input.lastName,
        email: Input.email,
        password: Input.password,
        confirmPassword: Input.confirmPassword,
        terms:Input.terms
        
      })
      alert("Submitted Successful");
    }catch(error){
      alert(error.response?.data?.message || "Error submitting post")
    }

  }


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex flex-col justify-center items-center">
      <div className="border-2 border-blue-700 shadow-[0_0_20px_#22d3ee] w-150 h-auto rounded-2xl p-6">
        <h1 className="text-white mt-4 text-center text-5xl font-bold">Register</h1>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 px-10 w-full" method="POST">

          <label htmlFor="firstName" className="text-white px-1 text-2xl">First Name</label>
          <input type="text" name="firstName" placeholder="Enter the first name" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required  onChange={handleChange}/>

          <label htmlFor="lastName" className="text-white px-1 text-2xl">Last Name</label>
          <input type="text" name="lastName" placeholder="Enter the last name" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={handleChange}/>

          <label htmlFor="email" className="text-white px-1 text-2xl">Email ID</label>
          <input type="email" name="email" placeholder="Email ID" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required  onChange={handleChange}/>

          <label htmlFor="password" className="text-white px-1 text-2xl">Password</label>
          <input type="password" name="password" placeholder="Enter the password" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={handleChange}/>

          <label htmlFor="confirmPassword" className="text-white px-1 text-2xl">Confirm Password</label>
          <input type="password" name="confirmPassword"  value={Input.confirmPassword}  placeholder="Confirm the Password" className="border-2 border-white bg-transparent text-white w-100 h-10 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={handleChange}/>

          
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="terms" id="terms" className="w-4 h-4 accent-blue-500" checked={Input.terms === "on"} onChange={(e)=>{
              setInput((prev)=>({
                ...prev,
                terms:e.target.checked ? "on" : ""
              }))
            }} required />
            <label htmlFor="terms" className="text-white text-sm">
              I agree to the <span className="underline text-blue-400 hover:text-blue-200 cursor-pointer">terms and conditions</span>
            </label>
          </div>

          <button type="submit" className="border-2 w-40 h-10 border-white text-white bg-transparent hover:bg-white hover:text-black transition rounded-3xl mt-6">
            Register
          </button>

          <h2 className="text-white mt-4 text-center">
            Already Created Account? <span className="font-bold"><Link to="/login" className="text-blue-400 hover:text-blue-200">Login</Link></span>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Register;
