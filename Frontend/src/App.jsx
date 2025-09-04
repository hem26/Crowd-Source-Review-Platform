// Routing All the pages in App.jsx
import './App.css'
import LandingPage from './Pages/LandingPage'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'

import ProtectedRoute from './Components/ProtectedRoute'
import UserDashboard from './Pages/UserDashboard'
import AddReview from './Pages/AddReview'
import ManageReview from './Pages/ManageReview'
import UpdateReview from './Pages/UpdateReview'
import Details from './Pages/Details'
import Profile from './Components/Profile'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          
          <Route path="/home" element={
            <ProtectedRoute>
              <UserDashboard></UserDashboard>
            </ProtectedRoute>
            }></Route>

          <Route path="/add-review" element={
            <ProtectedRoute>
              <AddReview></AddReview>
            </ProtectedRoute>
          }></Route>

          <Route path="/manage-review" element={
            <ProtectedRoute>
              <ManageReview></ManageReview>
            </ProtectedRoute>
          }>
          </Route>

          <Route path='/update-review/:id' element={
            <ProtectedRoute>
              <UpdateReview></UpdateReview>
            </ProtectedRoute>
          }></Route>

          <Route path="/details-page/:id" element={
            <ProtectedRoute>
              <Details></Details>
            </ProtectedRoute>
          }></Route>

          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }></Route>
        </Routes>

        
      </BrowserRouter>
    </>
  )
}

export default App
