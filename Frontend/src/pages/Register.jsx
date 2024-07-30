import React from 'react'
import { useState } from 'react'
import { register } from '../services/register'

function Register() {

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
    if(!userData.name || !userData.email || !userData.password){
       console.error("fields are required");
    }
    try {
      const { name, email, password} = userData
      const  response = await register({name, email, password})
      console.log(response)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <input name='name' value={userData.name} onChange={handleChange} type="text" placeholder="Name"/>
        <input name='email' value={userData.email} onChange={handleChange} type="email" placeholder="Email"/>
        <input name='password' value={userData.password} onChange={handleChange} type="password" placeholder="Password"/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
