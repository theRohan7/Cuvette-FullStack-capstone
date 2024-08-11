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
        // console.log(response);
        

        return response
        
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.messgae)
    }

}


 const getJobs = async({skills}) =>{
    try {
        const  skillsQuery = skills ? `skills=${skills.join(',')}` : null;
       const token  = localStorage.getItem("token"); 
       const URL = skillsQuery ? `${BACKEND_URL}/job?${skillsQuery}` : `${BACKEND_URL}/job`
       const  response = await axios.get(URL,{
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

 const deleteJob = async (id) => {
    try {
        const URL = `${BACKEND_URL}/job/delete/${id}`
        const token = localStorage.getItem("token");
        const response = await axios.delete(URL, {
            headers:{
                'Authorization': token
            }
            
        })
        console.log(response);
        return response;
    } catch (error) {
        // console.log(error.response);
        
        throw new Error(error.response.data.message)
    }

 }



export { createJob, getJobs, getOneJob, deleteJob }