import React from "react";

const SubCards = ({subtitle, subdescription, location}) =>{
    return (
        <div className="border-2 w-160 h-50 flex gap-6 mt-30 ml-20">
            <div className="border-2 w-50 h-49">
                
            </div>
            <div className="w-140 h-40 flex flex-col gap-3"> 
                <h1 className="mt-5 "><strong>{subtitle}</strong></h1>
                <p>{subdescription}</p>
                <p>{location}</p>
                <button className="border-2 w-30 h-20 rounded-2xl mb-19 ml-70">Read more</button>
            </div>
        </div>
    )
}

export default SubCards;