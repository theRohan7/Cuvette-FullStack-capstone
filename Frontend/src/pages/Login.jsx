import React from 'react'
import { useState } from 'react'
import { login } from '../services/register'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) =>{
    setUserData({
        ...userData,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setloading(true)
    if(!userData.email || !userData.password){
        toast.error("Fields are required");
    }
    try {
        const {email, password} = userData
        const response = await login({email, password})
        console.log(response);
        if(response.status === 200){
            const{data} = response;
            localStorage.setItem("token", data.data.token);
            toast.success("user logged in successfully")
            navigate("/home")

        }
    } catch (error) {
        toast.error("Login Failed");
    }
    finally{
      setloading(false)
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
        <input type="email" name='email' value={userData.email} placeholder='Email' onChange={handleChange} />
        <input type="password" name='password' value={userData.password} placeholder='Password' onChange={handleChange} />
        <button disabled={loading} type='submit'>{loading? "Loading": "Login"}</button>
      </form>
    </div>
  )
}

export default Login
