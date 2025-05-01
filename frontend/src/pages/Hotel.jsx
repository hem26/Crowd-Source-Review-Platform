import React from "react";
import Header from "../components/Header";
import SubCards from "../components/SubCards";

const Data = [
    {
        id:1,
        subtitle: "Taj Hotels",
        subdescription:"The Best Hotel of Delhi",
        location:"New Delhi"
    },
    {
        id:2,
        subtitle: "The Leela Hotel",
        subdescription:"The Best Hotel of Delhi",
        location:"New Delhi"
    },
    {
        id:3,
        subtitle:"The Oberoi",
        subdescription:"The Best Hotel of Delhi",
        location:"Gurugram"
    }

    
]
const Hotel = () =>{
    return <div>

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

    </div>
}

export default Hotel;