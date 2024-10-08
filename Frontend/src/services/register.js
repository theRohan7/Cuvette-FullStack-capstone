import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const register = async({name, email, password}) =>{
    try {
        const response = await axios.post(`${BACKEND_URL}/users/register`,{
            name,
            email,
            password,
        });
        

        return response;

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const login = async({email, password}) =>{
    try {
       const response = await axios.post(`${BACKEND_URL}/users/login`,{
        email,
        password
       }) 

       return response;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message)
    }

}




export { 
    register,
    login,

 }
