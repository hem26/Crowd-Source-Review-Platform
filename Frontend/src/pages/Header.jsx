import React from "react";
import img1 from "../assets/Asset2.png"
import HeaderButton from "../components/HeaderButton";

const TitleData = [
    {
        id: 1,
        title: "About Us"
    },
    {
        id: 2,
        title: "Services"
    },
    {
        id: 3,
        title:"Pricing"
    },
    {
        id: 4,
        title:"Book Now"
    }
]

const Header = () =>{
    return <div>
        <div className="w-full h-40 bg-[#C96A67] flex gap-130">
            <img src={img1} className="w-35 h-35 ml-15 mt-4"></img>
            <div className="w-300 h-20 flex justify-center gap-10 mt-12">
                {
                    TitleData.map((item, index)=>{
                        return (
                            <HeaderButton key={index} title={item.title}></HeaderButton>
                        )
                    })
                }
            </div>
        </div>
    </div>
}

export default Header;