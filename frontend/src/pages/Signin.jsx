import { Link, useNavigate } from "react-router-dom";

const Signin = () =>{
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-2 border-slate-400 rounded-3xl w-140 h-200 ">
                <h1 className="text-center text-5xl mt-10">Sign In</h1>
                <form className="flex flex-col p-5">
                    <div className="flex flex-col h-140 w-130  justify-center items-center">
                        <h2 className="text-2xl">Username </h2>
                        <input type="text" className="border-gray-300 border-2 p-2 mt-2 w-100 "/>
                        <h2 className="mt-5 text-2xl">Password </h2>
                        <input type="password" className="border-gray-300 border-2 p-2 mt-2 w-100"/>
                        <div>
                            <button className="bg-gray-400 w-40 h-10 rounded-2xl text-white mt-5 ml-9" onClick={()=>{
                                navigate('/dashboard')
                            }}>Sign in</button>
                            <p className='mt-10 '>New to Account? Please <Link className="pointer underline pl-1 cursor-pointer" to={"/signup"}>Sign up</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Signin;