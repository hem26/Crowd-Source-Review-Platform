import React from "react";
import SubCards from "../components/SubCards";
import Header from "../components/Header";

const Data = [
    {
        id: 1,
        subtitle: "Jhakas Pav Bhaji Wala",
        subdescription: "The famous Mumbai Dish in Delhi",
        location:"Delhi"
    },
    {
        id: 2,
        subtitle: "Jagdamba Misthan Bhandar",
        subdescription:"Having all the ranges of sweets and savouries.",
        location:"Khatima"
    },
    {
        id: 2,
        subtitle: "Jagdamba Misthan Bhandar",
        subdescription:"Having all the ranges of sweets and savouries.",
        location:"Khatima"
    },
    {
        id: 2,
        subtitle: "Jagdamba Misthan Bhandar",
        subdescription:"Having all the ranges of sweets and savouries.",
        location:"Khatima"
    },
    {
        id: 2,
        subtitle: "Jagdamba Misthan Bhandar",
        subdescription:"Having all the ranges of sweets and savouries.",
        location:"Khatima"
    }
]

const Food = () =>{
    
    return (
        <>
           <Header></Header>
           <div className="w-full h-200 flex flex-row flex-wrap">
           {
            Data.map((item, index)=>{
                return (
                    <div>
                        <SubCards key={index} subtitle={item.subtitle} subdescription={item.subdescription} location={item.location}></SubCards>
                    </div>
                )
            })
           }
           </div>
        </>
    )
}

export default Food;