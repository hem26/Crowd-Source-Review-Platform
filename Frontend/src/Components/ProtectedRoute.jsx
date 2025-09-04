import axios from "axios";
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const [isAuthenicated, setIsAuthenticated] = useState(null);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboards`,{
            withCredentials:true
        })
        .then(res=>{
            setIsAuthenticated(true);
        }).catch(err=>{
            setIsAuthenticated(false)
        })
    }, [])

    if(isAuthenicated === null) {
        return (
            <p>Checking Auth...</p>
        )
    }
    return isAuthenicated ? children : <Navigate to="/login" />
}

export default ProtectedRoute