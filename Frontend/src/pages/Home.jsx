import { useEffect, useState } from "react"
import { getJobs } from "../services/job";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ jobs, setJobs] = useState([])
  // console.log(jobs);
  useEffect(() =>{
    
    const fetchJobs = async() => {
      setLoading(true)
      const response = await getJobs()
      // console.log(response.data);
      if(response.status === 200) {
        setJobs(response.data.data)
      }
      setLoading(false)
    }
    fetchJobs();
  },[])
  return (
    <div>
      <h1>Home</h1>
      {loading ? <h1>Loading...</h1>: 
      <>
        {jobs.map(job => {
          return(
            <div key={job.id}>
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
            </div>
          )
        })}
      </>
       }
      
    </div>
  )
}

export default Home
