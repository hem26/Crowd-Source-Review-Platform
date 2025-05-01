import React from "react";
import { useNavigate } from "react-router-dom";
function Cards({
    image,
    title,
    description, 
    clickHandler
})
{   
    
    return ( 
        <div className="border-1 w-100 h-100 flex justify-center flex-col items-center" onClick={clickHandler}>
            <div className="border-1 w-100 h-70">
                <img src={image}></img>
            </div>
            <div className="w-100 h-50">
                <h1 className="text-4xl text-center mt-5">{title}</h1>
                <p className="text-center mt-5">{description}</p>
            </div>
        </div>
    )
}

export default Cards