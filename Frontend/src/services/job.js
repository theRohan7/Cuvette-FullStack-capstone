import axios from "axios";
import { BACKEND_URL } from "../utils/constants";


const createJob = async ({data, id}) =>{
    
    try {
        const URL = id ? `${BACKEND_URL}/job/update/${id}` : `${BACKEND_URL}/job/create-job`
        console.log(URL);
        const token = localStorage.getItem('token')
        const response = await axios.post(URL, data, {
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


 const getJobs = async() =>{
    try {
       const token  = localStorage.getItem("token"); 
       const  response = await axios.get(`${BACKEND_URL}/job`,{
        headers:{
            'Authorization': token
        }
       })
       return response;
        
    } catch (error) {
        // console.log(error.response.data.message);
        throw new Error(error.response.data.message)
    }
 }

 const getOneJob = async({id}) => {
   try {

     const token = localStorage.getItem("token");
     const response = await axios.get(`${BACKEND_URL}/job/${id}`,{
         headers: {
             "Authorization": token
         }
     })
     return response
   } catch (error) {

    console.log(error.message);
    throw new Error(error.response.data.message)

   }
 }



export { createJob, getJobs, getOneJob }