import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

 export const register = async({name, email, password}) =>{
    try {
        const response = await axios.post(`${BACKEND_URL}/users/register`,{
            name,
            email,
            password,
        });
        

        return response;

    } catch (error) {
        return new Error(error.response.data.message)
    }
}
