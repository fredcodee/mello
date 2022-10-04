import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom"
import '../Projectpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUsers, faPlus, faPenSquare} from '@fortawesome/fontawesome-free-solid'
import Dropdown from 'react-bootstrap/Dropdown';

const ProjectPage = () => {
    const {id} = useParams() 
    let {user} = useContext(AuthContext)
    let [project, setProject] = useState('')
    let[members, setMembers] = useState([])
    let [listOfAdmins, setListOfAdmins]=useState('')

    useEffect(()=>{
        getProject()
    }, [id])

    let getProject = async()=>{
        let response = await fetch(`/api/project/${id}/user/${user.id}`)
        let data = await response.json()
        setProject(data)
        setListOfAdmins(data.admins)
        getMembers(data.id)}

    let getProjectMembers = (p)=>{
        return listOfAdmins.includes(p.id) === false
    }

    let getMembers = async(id)=>{
        let response = await fetch(`/api/project/view/members/${id}`)
        let data = await response.json()
        setMembers(data)
    }
    
  return (
    <div className='row'>
        <div className='col-2 side-menu'>
            <div className='side-name'>
                <h3>{user.name}'s workspace <span><FontAwesomeIcon icon={faChevronLeft} style ={{fontSize:'14px'}}/></span></h3>
                {listOfAdmins.includes(user.id) ? (<small>Admin</small>) : <p>Member</p>}
            </div>
            <hr style={{color:'white'}}/>
            <div>
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant="secondary" className='members'><p><span><FontAwesomeIcon icon={faUsers} /></span> Members</p></Dropdown.Toggle>
                
                <Dropdown.Menu>
                    {members.map((member)=>(
                        <Dropdown.Item key={member.id} eventKey={member.id} >{member.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div>
                <h3 style={{paddingTop:'1rem'}}>Add Members <span><FontAwesomeIcon icon = {faPlus}/></span> </h3>
            </div>
            <div>
                <h3 style={{paddingTop:'1rem'}}>Edit Project <span><FontAwesomeIcon icon = {faPenSquare}/></span> </h3>
            </div>

            <hr />
            <div className='des'>
                <p>About This Project</p>
                <hr/>
                <p>{project.description}</p>
            </div>
        </div>


        <div className='col-10'>
            <div className='pname'>
                {project.name}
            </div>
        </div>
    </div>

  )
}

export default ProjectPage