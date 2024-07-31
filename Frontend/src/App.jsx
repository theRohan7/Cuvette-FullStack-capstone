import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateJob from "./pages/CreateJob"

function App() {
  

  return (
   <>
   <Toaster />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/new" element={<CreateJob />}/>

   </Routes>
   </>
  )
}

export default App
