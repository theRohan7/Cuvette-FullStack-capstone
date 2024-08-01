import { useState } from "react"
import { createJob } from "../services/job";
import toast from "react-hot-toast";

const SKILLS = [
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
      console.log(fromData)
   }
   
   const handleSubmit = async(e)=>{
      e.preventDefault();
      const data = {...fromData}
      data.skills = data.skills.join(",")
      try {

         const response = await createJob({data});
         console.log(response.data);

         if(response.data.statusCode === 200)
         toast.success(`${response.data.message}`)
         
      } catch (error) {
         console.log(error.message);
         toast.error("Failed to Create job.")
      }
   }

  return (
    <div>
      <h1>Add Job Description</h1>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"40%", gap:"20px"}} >
        <input onChange={handleChange} value={fromData.companyName} name='companyName' type="text" placeholder='Company name'/>
        <input onChange={handleChange} value={fromData.logoURL} name='logoURL' type="text" placeholder='Logo URL' />
        <input onChange={handleChange} value={fromData.position} name='position' type="text" placeholder='Job Position'/>
        <input onChange={handleChange} value={fromData.salary} name='salary' type="number" placeholder='Monthly Salary'/>
        <select onChange={handleChange} value={fromData.jobType} name="jobType" id="">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
        </select>
        <select onChange={handleChange} value={fromData.remote} name="remote" id="">
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
        <input onChange={handleChange} value={fromData.location} name='location' type="text" placeholder='Location' />
        <textarea onChange={handleChange} value={fromData.description} name="description" id="" placeholder='Job Description'></textarea>
        <textarea onChange={handleChange} value={fromData.about} name="about" id="" placeholder='About'></textarea>
        <select onChange={handleChange} value={fromData.skills} name="skills" id="" multiple>
            {SKILLS.map((skill,idx) => 
                
                <option key={idx} value={skill.value} >{skill.label}</option>
            )}
        </select>
        <input onChange={handleChange} value={fromData.information} name="information" type="text" placeholder='Additional Information'/>

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreateJob
