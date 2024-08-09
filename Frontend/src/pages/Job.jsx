import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneJob } from "../services/job";

function Job() {
  const { id } = useParams();
  const [job, setJob] = useState({})
  const [loading, setLoading] = useState(false)
  
  
  

  useEffect(() => {
    const fetchJob = async () => {
        setLoading(true);
        const response = await getOneJob({ id });
        if (response.status === 200) {
            setJob(response.data.data);
        }
        setLoading(false);
    }
    fetchJob();
}, [])

console.log(job);

  
  return (
    <>
      <h1>Job</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{job.companyName}</h1>
          <p>{job.location}</p>
          <p>{job.salary}</p>
          <p>{job.position}</p>
          {/* {job.skills.map((skill) =>{
             return <span style={{marginRight:"10px"}} key={skill}> {skill} </span>
          })} */}
          
        </div>
      )}
    </>
  );
}

export default Job;
