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
  return (
    <div>
      <h1>Add Job Description</h1>
      <form >
        <input name='companyName' type="text" placeholder='Company name'/>
        <input name='logoURL' type="text" placeholder='Logo URL' />
        <input name='position' type="text" placeholder='Job Position'/>
        <input name='salary' type="number" placeholder='Monthly Salary'/>
        <select name="jobType" id="">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
        </select>
        <select name="remote" id="">
            <option value="True">Yes</option>
            <option value="False">No</option>
        </select>
        <input name='location' type="text" placeholder='Location' />
        <textarea name="description" id="" placeholder='Job Description'></textarea>
        <textarea name="about" id="" placeholder='About'></textarea>
        <select name="skills" id="">
            {SKILLS.map((skill,idx) => {
                
                <option key={idx} value={skill.value}>{skill.label}</option>
            })}
        </select>
        <input name="information" type="text" placeholder='Additional Information'/>

        
      </form>
    </div>
  )
}

export default CreateJob
