import { useRef } from "react";


const Profile = () =>{

    const fileInputRef = useRef(null);

    const handleClick = () =>{
        fileInputRef.current.click();
    };

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            console.log("Selected File: ", file.name);
        }
    }


    return <div className="border-2 flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 items-center justify-center">
        <div className="border-2 border-blue-700 shadow-[0_0_20px_#22d3ee] w-150 h-200 rounded-2xl flex flex-col items-center  md:flex-col mt-10">
            <h1 className="text-5xl md:text-6xl mt-6 text-center text-white">Profile</h1>
            <div className="border-2 w-40 h-40 mt-4 rounded-full bg-gray-500">
                <div className=" bg-gray-700 h-20 mt-20 rounded-b-full hover:bg-gray-700">
                        <form>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden"></input>
                            <button onClick={handleClick} className="px-2 py-2 text-white rounded-lg shadow transition ">Upload your image</button>
                        </form>    
                </div>
            </div>
            <form className="border-2 w-full h-120 mt-3 flex flex-col md:flex-col">
                <label for="firstName" className="text-white text-2xl px-10 py-4">First Name</label>
                <input type="text"></input>
            </form>
        </div>
    </div>
}

export default Profile;