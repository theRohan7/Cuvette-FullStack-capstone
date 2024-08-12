import { useState } from "react"
import { createJob, getOneJob } from "../services/job";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const SKILLS = [
    {
       value: "React",
       label: "React" 
    },
    {
       value: "Java",
       label: "Java" 
    },
    {
       value: "JavaScript",
       label: "JavaScript" 
    },
    {
       value: "Node",
       label: "Node" 
    },
    {
       value: "Spring",
       label: "Spring" 
    },
    {
       value: "DBMS",
       label: "DBMS" 
    },
    {
       value: "python",
       label: "python" 
    },
    {
       value: "Golang",
       label: "Golang" 
    },
    {
       value: "Flask",
       label: "Flask" 
    },
    {
       value: "Django",
       label: "Django" 
    },
    
]

function CreateJob() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [fromData, setFormData] = useState({
      companyName:"",
      logoURL:"",
      position:"",
      salary:"",
      jobType: "",
      remote: "",
      location: "",
      description: "",
      about:"",
      skills: [],
      information:""
   })

   const handleChange = (e) =>{
      if(e.target.name === "skills") {
         return setFormData({
            ...fromData,
            skills: fromData.skills.includes(e.target.value) ? 
            fromData.skills.filter(skill => skill !== e.target.value) : [...fromData.skills, e.target.value]
         })
      }
      setFormData({
         ...fromData,
         [e.target.name]: e.target.value
      })
      // console.log(fromData)
   }
   
   const handleSubmit = async(e)=>{
      e.preventDefault();
      setLoading(true)
      const data = {...fromData}
      data.skills = data.skills.join(",")
      try {
         const jobId = id ? id : null;
         const response = await createJob({data, id: jobId});
         console.log(response.data);

         if(response.data.statusCode === 200){
            
          jobId? toast.success("Job Updated Successfully") : toast.success(`${response.data.message}`)
          setFormData(response.data.data)
         }
         navigate("/")


         
      } catch (error) {
         console.log(error);
         toast.error("Failed to Create job.")

      }
      setLoading(false)
   }

   useEffect(() => {
      const fetchJob = async() => {
         const response = await getOneJob({id});
         
         if(response.status === 200){
            setFormData(response.data.data)
         }
      }
        if(id){
          fetchJob()
        }
   },[])

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="body">
          <div className="createJob-form-part">
            <div className="createJob-heading">
              <h2>Add job description</h2>
            </div>
            <div className="createJob-form">
              <form
                onSubmit={handleSubmit}  
              >
               <div className="createJob-form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                     onChange={handleChange}
                     value={fromData.companyName}
                     name="companyName"
                     type="text"
                     placeholder="Company name"
                  />
               </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="logoURL">Add logo URL</label>
                  <input
                     onChange={handleChange}
                     value={fromData.logoURL}
                     name="logoURL"
                     type="text"
                     placeholder="Enter Link"
                  />
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="position">Job Position</label>
                  <input
                     onChange={handleChange}
                     value={fromData.position}
                     name="position"
                     type="text"
                     placeholder="Job Position"
                  />
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="salary">Monthly Salary</label>
                  <input
                     onChange={handleChange}
                     value={fromData.salary}
                     name="salary"
                     type="number"
                     placeholder="Monthly Salary"
                  />
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="jobType">Job Type</label>
                  <select
                     onChange={handleChange}
                     value={fromData.jobType}
                     name="jobType"
                  >
                     <option value="Full-time">Full-time</option>
                     <option value="Part-time">Part-time</option>
                     <option value="Contract">Contract</option>
                     <option value="Freelance">Freelance</option>
                  </select>
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="remote">Remote/Office</label>
                  <select
                     onChange={handleChange}
                     value={fromData.remote}
                     name="remote"
                  >
                     <option value="true">Yes</option>
                     <option value="false">No</option>
                  </select>
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="location">Location</label>
                  <input
                     onChange={handleChange}
                     value={fromData.location}
                     name="location"
                     type="text"
                     placeholder="Location"
                  />
                </div>
               
                <div className="createJob-form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                     onChange={handleChange}
                     value={fromData.description}
                     name="description"
                     placeholder="Job Description"
                  ></textarea>
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="about">About Company</label>
                  <textarea
                     onChange={handleChange}
                     value={fromData.about}
                     name="about"
                     placeholder="About"
                  ></textarea>
                </div>
                
                <div className="createJob-form-group">
                  <label htmlFor="skills">Skills Required</label>
                  <select onChange={handleChange} name="skills" multiple>
                     {SKILLS.map((skill, idx) => (
                     <option
                        selected={fromData.skills.includes(skill.value)}
                        key={idx}
                        value={skill.value}
                     >
                        {skill.label}
                     </option>
                     ))}
                  </select>
                </div>
                

                <div className="createJob-form-group">
                  <label htmlFor="information">Information</label>
                  <input
                     onChange={handleChange}
                     value={fromData.information}
                     name="information"
                     type="text"
                     placeholder="Additional Information"
                  />
                </div>
                

                {id ? (
                  <button disabled={loading} type="submit">
                    Update
                  </button>
                ) : (
                  <button disabled={loading} type="submit">
                    + Add Job
                  </button>
                )}
              </form>
            </div>
          </div>
          <div className="createJob-image-container">
            <div className="overlay">
              <h2>Recruiter add job details here</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateJob


