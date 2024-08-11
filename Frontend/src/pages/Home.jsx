import { useEffect, useState } from "react"
import { deleteJob, getJobs } from "../services/job";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/auth";
import toast from 'react-hot-toast'
import { SKILLS } from "./CreateJob";

function Home() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [ jobs, setJobs] = useState([])    //fetched Data
  const [filteredJobs, setFilteredJobs] = useState([])   //data on the UI
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [skills, setSkills] = useState(null)
  const [search, setSearch] = useState('')


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

  const handleSkillChange = (skill) => {

   setSkills((prev) => {
     if (!prev) {
       return [skill];
     }
     return prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
   });
 };

 const handleSearch = (e) => {
   setSearch(e.target.value);
   setFilteredJobs(
     jobs.filter((job) => {
       return (
         job.position.includes(e.target.value) ||
         job.companyName.includes(e.target.value) ||
         job.description.includes(e.target.value)
       );
     })
   );
 };

  const fetchJobs = async ({skills}) => {
    setLoading(true);
    const response = await getJobs({skills});
    // console.log(response.data);
    if (response.status === 200) {
      setJobs(response.data.data);
      setFilteredJobs(response.data.data)
    }
    setLoading(false);
  };
  
  useEffect(() => {

    const fetchUser = async () => {
      const response = await verifyToken();
      if (response.status === 200) {
        setUser(response.data);
      }
      setAuthLoading(false);
    };

    fetchJobs({skills: null});
    fetchUser();
  }, []);





  return (
    <div>
      <h1>Home</h1>
      <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
      <select onChange={(e) => handleSkillChange(e.target.value)} multiple>
        {SKILLS.map((skill) => {
          return (
            <option
              onSelect={() => handleSkillChange(skill.value)}
              key={skill.label}
              value={skill.value}
            >
              {skill.label}
            </option>
          );
        })}
      </select>
      {skills &&
        skills.map((skill) => {
          return (
            <span style={{ marginRight: "10px" }} key={skill}>
              {skill}
            </span>
          );
        })}
      <button disabled={skills === null} onClick={() => fetchJobs({ skills })}>
        Apply Filters
      </button>
      <button onClick={() => fetchJobs({skills : null})} >Clear Filter</button>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {filteredJobs.map((job) => {
            return (
              <div key={job._id}>
                <div>
                  <h2>{job.companyName}</h2>
                  <p>{job.location}</p>
                  <p>{job.salary}</p>
                  <p>{job.position}</p>
                  {job.skills.map((skill,idx) => {
                    return (
                      <span style={{ marginRight: "10px" }} key={idx}>
                        {skill}
                      </span>
                    );
                  })}
                </div>
                <button onClick={() => navigate(`/job/${job._id}`)}>
                  View
                </button>

                {authLoading || user === null ? (
                  <button disabled>Edit</button>
                ) : (
                  <button onClick={() => navigate(`/edit/${job._id}`)}>
                    Edit
                  </button>
                )}

                {authLoading || user === null ? (
                  <button disabled>Delete</button>
                ) : (
                  <button onClick={() => handleDeleteJob(job._id)}>
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Home
