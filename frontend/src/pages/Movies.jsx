import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SubCards from "../components/SubCards";





const Movies = () =>{
    const genre = ["action", "comedy", "drama", "horror", "romance"];

    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        const fetchAllMovies = async() =>{
            try{
                const allMovies = [];
                for(const genres of genre){
                    const response = await fetch(
                        `http://www.omdbapi.com/?apikey=db439d9e&s=${genres}&page=1`
                    )
                    const data = await response.json();
                    console.log(data);
                    if(data.Search){
                        allMovies.push(...data.Search)
                    }
                }
                setMovies(allMovies);

            }catch(error){
                console.log("Error fetching movies: ", error);
            }
        }


        fetchAllMovies();
    }, [])

    

    return <div>
        <Header></Header>
        <div className="w-full h-200 flex flex-row flex-wrap">
            
           {
            movies.map((item, index)=>{
                return (
                    <div key={index}>
                        <SubCards subtitle={item.Title} subdescription={`Year: ${item.Year}`} ></SubCards>
                    </div>
                )
            })
           }
        </div>
    </div>
}

export default Movies;