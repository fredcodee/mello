import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom"
import '../Projectpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUsers, faPlus, faPenSquare} from '@fortawesome/fontawesome-free-solid'
import Dropdown from 'react-bootstrap/Dropdown';
import CreateProjectPopup from '../components/CreateProjectPopup';

const ProjectPage = () => {
    const {id} = useParams() 
    let {user} = useContext(AuthContext)
    let [project, setProject] = useState('')
    let[members, setMembers] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [listOfAdmins, setListOfAdmins]=useState('')
    let [allUsers, setAllUsers] = useState('')
    const [filteredName, setfilteredName] = useState([])


    useEffect(()=>{
        getProject()
        appUsers()
    }, [id] )

    let getProject = async()=>{
        let response = await fetch(`/api/project/${id}/user/${user.id}`)
        let data = await response.json()
        setProject(data)
        setListOfAdmins(data.admins)
        getMembers(data.id)}

    let getMembers = async(id)=>{
        let response = await fetch(`/api/project/view/members/${id}`)
        let data = await response.json()
        setMembers(data)
    }

    let appUsers = async()=>{
        let response = await fetch('/api/project/all/members')
        let data = await response.json()
        setAllUsers(data)
    }

    let togglePopup = () => {
        setIsOpen(!isOpen);
      }
    
    let handelSearch = (newSearchQuery) =>{
        if (newSearchQuery.length > 0){
            //setSearchQuery(newSearchQuery);
            let resultArray = allUsers.filter((user)=> user.name.includes(newSearchQuery))
            setfilteredName(resultArray)

        }
    }

    let addUserToProject = async(userName)=>{
        let response = await fetch(`/api/project/add/${userName}/${project.id}/${user.id}`)
        if(response.status === 200){
            getMembers(project.id)
            alert(`you have added ${userName} to this project`)

        }
        else{
            alert('Cant add this user try again later')
        }
    }

    let addMember = (userName) =>{
        let check = members.filter((user)=> user.name === userName)
        if(check.length > 0){
            alert(`${userName} is already a member of this project`)
        }
        else{
            addUserToProject(userName)
        }
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
            <Dropdown.Toggle id="dropdown-basic" variant="secondary" className='members'><p><span><FontAwesomeIcon icon={faUsers} /></span> Members ({members.length})</p></Dropdown.Toggle>
                
                <Dropdown.Menu>
                    {members.map((member)=>(
                        <Dropdown.Item key={member.id} eventKey={member.id} >{member.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className='options'>
                <button className='btn btn-secondary' style={{paddingTop:'1rem'}} onClick={togglePopup} >Add Members <span><FontAwesomeIcon icon = {faPlus}/></span></button>
            </div>
            {isOpen && <CreateProjectPopup
            content={<>
                <div className='title'>
                    <h3>Add Members</h3>
                </div>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="search user" aria-label="Username" aria-describedby="basic-addon1" onChange={e => handelSearch(e.target.value)}/>
                </div>

                <div style={{textAlign:'center', paddingBottom:'10px'}}>
                    <ul className='searchq'>
                        {filteredName.map((user)=>(
                            <li key={user.id} className='usernamesearch rounded-pill' onClick={addMember.bind(this, user.name)}>{user.name}</li>
                        ))}
                    </ul>
                </div>
                <div className='title'>
                    <h3>Share Invite Link</h3>
                </div>
                <div className="input-group">
                    <textarea className="form-control" aria-label="With textarea" placeholder='Project Description'></textarea>
                </div>
                
            </>}
            handleClose={togglePopup}
            />}
            <div className='options'>
                <button className='btn btn-secondary' style={{paddingTop:'1rem'}}>Edit Project <span><FontAwesomeIcon icon = {faPenSquare}/></span> </button>
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