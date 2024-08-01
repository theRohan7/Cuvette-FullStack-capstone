import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import toast from "react-hot-toast";

export const createJob = async ({data}) =>{
    
    try {
        
        const token = localStorage.getItem('token')
        const response = await axios.post(`${BACKEND_URL}/job/create-job`, data, {
            headers:{
                'Authorization': token
            }
        })

        return response
        
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.messgae)
    }

}