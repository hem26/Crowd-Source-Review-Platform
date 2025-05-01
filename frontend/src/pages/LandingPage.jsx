import React from "react";
import { Link, useNavigate} from "react-router-dom";
// Importing Images
import rmlogo from "../assets/rmlogo.png";
import Cards from "../components/CategoryCards";



const Data = [
    {
        id:1,
        title: "Food",
        description:"Explore the rating of different cuisine in different places",
        to: "food"
    },
    {
        id: 2,
        title:"Movies",
        description: "Read Some Reviews of Different Film on the basis of language and genres",
        to: "movies"
    },
    {
        id: 3,
        title:"Hotel bookings",
        description:"Providing the Reviews of Hotel and Night Stays Around the World",
        to: "hotel"
    }

]


const LandingPage = () =>{
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
            <section className="border-1 w-full h-150">
                <h1 className="text-4xl mt-10 ml-10">Your Review Platform is Here...</h1>
                <div className="w-300 h-100 flex ">
                    <input type="text" placeholder="Enter an item to search" className="border-1 mt-10 ml-10 w-200 h-20 rounded-4xl text-center text-3xl"></input>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-10 ml-5 border-2 rounded-4xl w-20 h-20 cursor-pointer" onClick={()=>{
                        console.log("Search bar is clicked");
                    }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
            </section>
            <section className="border-1 w-full h-200">
                <h2 className="text-3xl text-center mt-10">Explore the varieties of options</h2>
                <div className="w-full h-150 flex justify-center items-center gap-10">
                    {
                        Data.map((item, index)=>{
                            return (
                                <Cards key={index} title={item.title} description={item.description} clickHandler={()=>{
                                    // This is the logic of implementing clickable custom routes.
                                    if(index===0){
                                        navigate("/food");
                                    }else if(index===1){
                                        navigate("/movies");
                                    }else if(index===2){
                                        navigate("/hotel")
                                    }
                                }}></Cards>
                            )
                        })
                    }
                </div>
            </section>
            <div className="border-1 w-full h-200">

            </div>
        </div>

    )
}


export default LandingPage;