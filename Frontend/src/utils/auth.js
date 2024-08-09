import axios from "axios"
import { BACKEND_URL } from "./constants"

export const verifyToken = async () =>{
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${BACKEND_URL}/auth/verify-token`,{},{
            headers:{
                "Authorization": token
            }
        })
        // console.log(response);
        return response
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message)
        
    }
}