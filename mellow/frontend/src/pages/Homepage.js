import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSpinner, faUsers} from '@fortawesome/fontawesome-free-solid'
import '../Home.css';

const Homepage = () => {
  let {user} = useContext(AuthContext)
  let [projects, setProjects] = useState([])
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
    
  return (
    <div>
      <div>
        <div className='center'>
          <FontAwesomeIcon icon={faStar} />
          <h2 className='titles'>Starred Projects</h2>
        </div>
        <div>
          {viewStarProjects.map((project) => (
                  <div key={project.id} className='border border-3 project-list'> 
                    <div className='parent'>
                      <div className='items'>
                        <p className= "project-titles">{project.name}</p>
                      </div>
                      <div className='items2'>
                        <p><span><FontAwesomeIcon icon={faUsers} /></span> Members ({project.members.length})</p>
                        <FontAwesomeIcon icon={faStar} className ="star_" onClick={pinProject} data-id ={project.id}/>
                      </div>
                    </div>
                  </div>))}
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
                      <div className='items'>
                        <p className= "project-titles">{project.name}</p>
                      </div>
                      <div className='items2'>
                        <p><span><FontAwesomeIcon icon={faUsers} /></span> Members ({project.members.length})</p>
                        <FontAwesomeIcon icon={faStar} className ="star" onClick={pinProject} data-id ={project.id}/>
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