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
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className='body'>
          <div className='form-part'>
            <div className="heading">
              <h2>Create an Account</h2>
              <p>Your personal job finder is here</p>
            </div>
            <div className="register-form">
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                />
                <input
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                />
                <input
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                />
                <div class="checkbox-container">
                    <input type="checkbox" id="terms" required />
                    <label for="terms">By creating an account, I agree to our <a href="#">terms of use</a> and <a href="#">privacy policy</a></label>
                </div>
                <button disabled={loading} type="submit">
                  {loading ? "Loading" : "Create Account"}
                </button>
              </form>
              <p>
                Already have an account?{" "}
                <a href="http://localhost:5173/login">Sign In</a>
              </p>
            </div>
          </div>
          <div className="image-container">
            <div className='overlay'>
              <h2>Your Personal Job Finder</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register
