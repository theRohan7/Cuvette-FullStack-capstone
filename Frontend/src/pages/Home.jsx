import { useEffect, useState } from "react"
import { deleteJob, getJobs } from "../services/job";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/auth";
import toast from 'react-hot-toast'

function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ jobs, setJobs] = useState([])
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)
  // console.log(jobs);

  const handleDeleteJob = async (id) => {
    try {
      const response = await deleteJob(id);

      if (response.status === 200) {
        toast.success(response.data.data);
        fetchJobs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Unauthorized Access to delete");
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    const response = await getJobs();
    // console.log(response.data);
    if (response.status === 200) {
      setJobs(response.data.data);
    }
    setLoading(false);
  };
  
  useEffect(() => {

    const fetchUser = async () => {
      const response = await verifyToken();
      // console.log(response);
      if (response.status === 200) {
        setUser(response.data);
      }
      setAuthLoading(false);
    };
    
    fetchJobs();
    fetchUser();
  }, []);


  return (
    <div>
      <h1>Home</h1>
      {loading ? <h1>Loading...</h1>: 
      <>
        {jobs.map(job => {
          return(
            <div key={job._id}>
              <div>
                <h2>{job.companyName}</h2>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <p>{job.position}</p>
                {job.skills.map((skill) =>{
                  return <span style={{marginRight:"10px"}} key={skill}>{skill}</span>
                })}
              </div>
              <button onClick={() => navigate(`/job/${job._id}`)} >View</button>

              {authLoading || user === null ? <button disabled>Edit</button> : <button onClick={()=> navigate(`/edit/${job._id}`)} >Edit</button>  }

              {authLoading || user === null ? <button disabled>Delete</button> : <button onClick={() => handleDeleteJob(job._id)} >Delete</button>  }
            </div>
          )
        })}
      </>
       }
      
    </div>
  )
}

export default Home
