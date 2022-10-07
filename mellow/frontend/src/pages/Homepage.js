import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link}  from 'react-router-dom'
import CreateProjectPopup from '../components/CreateProjectPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSpinner,faPlus, faUsers} from '@fortawesome/fontawesome-free-solid'
import '../Home.css';
import { useNavigate } from 'react-router-dom'


const Homepage = () => {
  let {user} = useContext(AuthContext);
  let [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [projectname, setProjectName] = useState("");
  const [projectdetails, setProjectDetails] = useState("");

  const history = useNavigate()

    useEffect(()=>{
        getProjects()
    }, [])

    let getProjects = async()=>{
        let response = await fetch(`/api/project/${user.name}`)
        let data = await response.json()
        setProjects(data)
    }

    let getPinProjects = (p)=>{
      return p.pin === true;
    }
    let viewStarProjects = projects.filter(getPinProjects)

    let pinProject=async(p)=>{
      const id = p.currentTarget.getAttribute("data-id")
      let response = await fetch(`/api/project/star/${id}`)
      let data = await response.json()
      getProjects()
    }

    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const createProject = async (projectname, projectdetails) =>{
      const response =  await fetch(`/api/project/create/${user.id}/`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          projectname,
          projectdetails
        })
      });
      if (response.status === 200) {
        togglePopup()
        window.location.reload();
        
      } else {
        alert("Something went wrong!");
      }
    }

    const handleSubmitCreate = async e =>{
      e.preventDefault();
      createProject(projectname, projectdetails)
    }
    
  return (
    <div>
      <div className=' border border-3 create' onClick={togglePopup}>
        <p><span><FontAwesomeIcon icon ={faPlus} className="add"/></span> Project</p>
      </div>
      {isOpen && <CreateProjectPopup
      content={<>
        <b>Create New Project</b>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Project Name" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setProjectName(e.target.value)}/>
        </div>
        <div className="input-group">
          <textarea className="form-control" aria-label="With textarea" placeholder='Project Description' onChange={e => setProjectDetails(e.target.value)}></textarea>
        </div>
        <div style={{textAlign:'center', paddingTop:'1rem'}}>
          <button className='btn btn-primary' onClick={handleSubmitCreate}>Create</button>
        </div>
      </>}
      handleClose={togglePopup}
    />}
      <div>
        <div className='center'>
          <FontAwesomeIcon icon={faStar} />
          <h2 className='titles'>Starred Projects</h2>
        </div>
        <div>
          {viewStarProjects.map((project) => (
                  <div key={project.id} className='border border-3 project-list'> 
                    <div className='parent'>
                      <Link to ={`/view/${project.id}`}  className ="links">
                        <div className='items'>
                          <p className= "project-titles">{project.name}</p>
                        </div>
                      </Link>
                      <div className='items2'>
                        <p><span><FontAwesomeIcon icon={faUsers} /></span> Members ({project.members.length})</p>
                        <FontAwesomeIcon icon={faStar} className ="star_" onClick={pinProject} data-id ={project.id}/>
                      </div>
                    </div>
                  </div>
                  ))}
        </div>
      </div>
        <div>
          <div className='center'>
          <FontAwesomeIcon icon={faSpinner} />
            <h2 className='titles'>YOUR WORKSPACES</h2>
          </div>
          <div>
            {projects.map((project) => (
                  <div key={project.id} className='border border-3 project-list'> 
                    <div className='parent'>
                      <Link to ={`/view/${project.id}`}  className ="links">
                        <div className='items'>
                          <p className= "project-titles">{project.name}</p>
                        </div>
                      </Link>
                      <div className='items2'>
                        <p><span><FontAwesomeIcon icon={faUsers} /></span> Members ({project.members.length})</p>
                        {viewStarProjects.includes(project) ? (<FontAwesomeIcon icon={faStar} className ="star_" onClick={pinProject} data-id ={project.id}/>) : <FontAwesomeIcon icon={faStar} className ="star" onClick={pinProject} data-id ={project.id}/> }
                        
                      </div>
                    </div>
                  </div>
                
                ))}
          </div>
        </div>
    </div>
  )
}

export default Homepage