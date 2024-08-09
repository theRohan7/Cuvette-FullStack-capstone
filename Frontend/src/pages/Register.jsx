import React from 'react'
import { useState } from 'react'
import { register } from '../services/register'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'


function Register() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const  handleChange = (e) =>{
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
    if(!userData.name || !userData.email || !userData.password){
       console.error("fields are required");
    }
    try {
      const { name, email, password} = userData
      const  response = await register({name, email, password})
      // console.log(response);
      if(response.status === 201){
        toast.success("User Registered Successfully.")
        navigate('/login')
      }

    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create an Account</h1>
      {loading? <h1>Loading...</h1>: 
        <form onSubmit={handleSubmit}>
        <input name='name' value={userData.name} onChange={handleChange} type="text" placeholder="Name"/>
        <input name='email' value={userData.email} onChange={handleChange} type="email" placeholder="Email"/>
        <input name='password' value={userData.password} onChange={handleChange} type="password" placeholder="Password"/>
        <button disabled={loading} type='submit'>{loading?"Loading":"Register"}</button>
      </form>
      }
    </div>
  )
}

export default Register
