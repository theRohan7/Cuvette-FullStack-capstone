import { useEffect, useState } from "react"
import { deleteJob, getJobs } from "../services/job";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/auth";
import toast from 'react-hot-toast'
import { SKILLS } from "./CreateJob";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]); //fetched Data
  const [filteredJobs, setFilteredJobs] = useState([]); //data on the UI
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState(null);
  const [search, setSearch] = useState("");

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
      return prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill];
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

  const fetchJobs = async ({ skills }) => {
    setLoading(true);
    const response = await getJobs({ skills });
    // console.log(response.data);
    if (response.status === 200) {
      setJobs(response.data.data);
      setFilteredJobs(response.data.data);
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

    fetchJobs({ skills: null });
    fetchUser();
  }, []);

  return (
    <div className="home">
      <div className="header">
        <div className="logo">Jobfinder</div>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
          <button className="register-button">Register</button>
        </div>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="filter-section">
            <input
              type="text"
              placeholder="Search Here"
              className="job-search"
              value={search}
              onChange={handleSearch}
            />
            <div className="skills-filter">
              <select
                onChange={(e) => handleSkillChange(e.target.value)}
                multiple className="skills-dropdown"
              >
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
                    <div key={skill} className="skill-tag">
                      {skill}
                      <span className="remove-skill">X</span>
                    </div>
                  );
                })}
              <button
                disabled={skills === null}
                onClick={() => fetchJobs({ skills })} 
                className="apply-filter-button"
              >
                Apply Filters
              </button>
              <button 
                onClick={() => fetchJobs({ skills: null })}
                className="clear-button"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <div className="job-list">

            {filteredJobs.map((job, index) => {
              return (
                <div className="job-card" key={index}>
                  <div className="job-info">
                    <h3 className="job-title">{job.position}</h3>
                    <div className="company-details">
                      <span>{job.companyName}</span>
                      <span>{job.jobType}</span>
                      <span>{job.remote}</span>
                    </div>
                    <div className="salary-location">
                      <span>👥 11-50</span>
                      <span>₹ {job.salary}</span>
                      <span>{job.loaction}</span>
                    </div>
                  </div>
                  <div className="job-skills">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skills-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="view-details-button"
                  >
                    View
                  </button>

                  {authLoading || user === null ? (
                    <button disabled>Edit</button>
                  ) : (
                    <button
                      onClick={() => navigate(`/edit/${job._id}`)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  )}

                  {authLoading || user === null ? (
                    <button disabled>Delete</button>
                  ) : (
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home





