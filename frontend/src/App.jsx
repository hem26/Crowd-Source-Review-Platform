import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Food from "./pages/Food";
import './App.css'
import LandingPage from './pages/LandingPage';
import Movies from './pages/Movies';
import Hotel from './pages/Hotel';


function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/food" element={<Food></Food>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
          <Route path="/hotel" element={<Hotel></Hotel>}></Route> 
        </Routes>
      </BrowserRouter>
          
    </>
  )
}

export default App
