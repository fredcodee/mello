import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom"
import '../Projectpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUsers, faPlus, faPenSquare, faBan, faUserTie, faTrash } from '@fortawesome/fontawesome-free-solid'
import Dropdown from 'react-bootstrap/Dropdown';
import CreateProjectPopup from '../components/CreateProjectPopup';
import { useNavigate } from 'react-router-dom'
import Cards from '../components/Cards';
import AddCards from '../components/AddCards';

const ProjectPage = () => {
    const { id } = useParams()
    let { user } = useContext(AuthContext)
    let [project, setProject] = useState('')
    let [members, setMembers] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [listOfAdmins, setListOfAdmins] = useState('')
    let [allUsers, setAllUsers] = useState('')
    let [filteredName, setfilteredName] = useState([])
    let[changeProjectName, setChangeProjectName] = useState('')
    let[changeProjectDescription, setChangeProjectDescription] = useState('')
    let [manageMembers, setManageMembers] = useState(false)
    let [leaveProject, setLeaveProject] = useState(false)
    let [dProject, setDProject] = useState(false)
    let [eProject, setEProject] = useState(false)
    let [cards, setCards] = useState([])

    let history = useNavigate()


    useEffect(() => {
        getProject()
        appUsers()
    }, [id])

    let getProject = async () => {
        let response = await fetch(`/api/project/${id}/user/${user.id}`)
        let data = await response.json()
        setProject(data)
        setListOfAdmins(data.admins)
        getMembers(data.id)
        tasks(data.id)

    }

    let getMembers = async (id) => {
        let response = await fetch(`/api/project/view/members/${id}`)
        let data = await response.json()
        setMembers(data)
    }

    let appUsers = async () => {
        let response = await fetch('/api/project/all/members')
        let data = await response.json()
        setAllUsers(data)
    }

    //pop ups
    let togglePopup = () => {
        setIsOpen(!isOpen);
    }

    let mmPopup = () => {
        setManageMembers(!manageMembers)
    }

    let leavePopup = () => {
        setLeaveProject(!leaveProject)
    }

    let deletePopup = () => {
        setDProject(!dProject)
    }

    let editPopup = ()=>{
        setEProject(!eProject)
    }
    // end of popups

    let handelSearch = (newSearchQuery) => {
        if (newSearchQuery.length > 0) {
            let resultArray = allUsers.filter((user) => user.name.includes(newSearchQuery))
            setfilteredName(resultArray)

        }
    }

    let addUserToProject = async (userName) => {
        let response = await fetch(`/api/project/add/${userName}/${project.id}/${user.id}`)
        if (response.status === 200) {
            getMembers(project.id)
            alert(`you have added ${userName} to this project`)

        }
        else {
            alert('Cant add this user try again later')
        }
    }

    let addMember = (userName) => {
        let check = members.filter((user) => user.name === userName)
        if (check.length > 0) {
            alert(`${userName} is already a member of this project`)
        }
        else {
            addUserToProject(userName)
        }
    }

    let removeMember = async (userId) => {
        let response = await fetch(`/api/project/remove/${project.id}/${user.id}/${userId}`)
        let data = await response.json()
        if (response.status === 200) {
            getMembers(project.id)
            alert(data)
        }
        else {
            alert('Cant remove user try again later')
        }
    }

    let changeRole = async (userId) => {
        let response = await fetch(`/api/project/role/${project.id}/${user.id}/${userId}`)
        let data = await response.json()
        if (response.status === 200) {
            getProject()
            alert(data)
        }
        else {
            alert('Cant Appoint user')
        }

    }

    let exitProject = async () => {
        let response = await fetch(`/api/project/exit/${project.id}/${user.id}`)
        let data = await response.json()
        if (response.status === 200) {
            alert(data)
            history('/')
        }

    }

    let deleteProject = async () => {
        let response = await fetch(`/api/project/delete/${project.id}/${user.id}`)
        let data = await response.json()
        if (response.status === 200) {
            alert(data)
            history('/')
        }
    }

    let editProject = async e=>{
        e.preventDefault();
        if(changeProjectName.length > 0 || changeProjectDescription.length > 0 ){
            let cpn = changeProjectName
            let cpd = changeProjectDescription
            if(changeProjectName.length === 0){
                cpn = project.name
            }
            if (changeProjectDescription.length === 0){
                cpd = project.description
            }

            editProjectApiCall(cpn,cpd)
        }else{
            editPopup()
        }   
    }

    let editProjectApiCall = async (cpn, cpd)=>{
        const response = await fetch(`/api/project/edit/${project.id}/${user.id}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cpn,
              cpd
            })
          });
          if (response.status === 200) {
            editPopup()
            window.location.reload();
      
          } else {
            alert("Something went wrong!");
          }
    }

    let tasks = async(projectId)=>{
        let response = await fetch(`/api/project/cards/view/${projectId}`)
        let data = await response.json()
        setCards(data)
     }



    return (
        <div className='row'>
            <div className='col-2 side-menu'>
                <div className='side-name'>
                    <h3>{user.name}'s workspace <span><FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: '14px' }} /></span></h3>
                    {listOfAdmins.includes(user.id) ? (<small>Admin</small>) : <p>Member</p>}
                </div>
                <hr style={{ color: 'white' }} />
                <div>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" variant="secondary" className='members'><p><span><FontAwesomeIcon icon={faUsers} /></span> All Members ({members.length})</p></Dropdown.Toggle>

                        <Dropdown.Menu>
                            {members.map((member) => (
                                <Dropdown.Item key={member.id} eventKey={member.id} >{member.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {listOfAdmins.includes(user.id) ? (
                    <div>
                        <div className='options'>
                            <button className='btn btn-secondary' style={{ paddingTop: '1rem' }} onClick={togglePopup} >Add Members <span><FontAwesomeIcon icon={faPlus} /></span></button>
                        </div>
                        <div className='options'>
                            <button className='btn btn-secondary' style={{ paddingTop: '1rem' }} onClick={mmPopup}>Manage Members <span><FontAwesomeIcon icon={faBan} /></span> </button>
                        </div>
                    </div>
                ) : <div></div>}
                {isOpen && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Add Member</h3>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="search user" aria-label="Username" aria-describedby="basic-addon1" onChange={e => handelSearch(e.target.value)} />
                        </div>

                        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
                            <ul className='searchq'>
                                {filteredName.map((user) => (
                                    <li key={user.id} className='usernamesearch rounded-pill' onClick={addMember.bind(this, user.name)}>{user.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='title'>
                            <h3>Share Invite Link</h3>
                        </div>
                        <div className="invite-link">
                            <h3>http://domian/invite/{project.ref_code}</h3>
                        </div>

                    </>}
                    handleClose={togglePopup}
                />}
                {manageMembers && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Manage Members</h3>
                        </div>

                        <div className='title'>
                            <ul>
                                {members.map((member) => (
                                    <li key={member.id} className='rounded-pill mm'>
                                        <div className='mname'>{member.name} -<span>{listOfAdmins.includes(member.id) ? (<small><FontAwesomeIcon icon={faUserTie} /> (Admin)</small>) : <small> (Member)</small>}</span></div>
                                        <div>{member.id !== user.id ?
                                            (<div>
                                                <div>{listOfAdmins.includes(member.id) ? (<small style={{ display: 'none' }}> (Admin)</small>) :
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <div style={{ marginRight: '5px' }}><button className='btn btn-primary' onClick={changeRole.bind(this, member.id)}>Appoint <span><FontAwesomeIcon icon={faUserTie} /> Admin</span></button></div>
                                                        <div><button className='btn btn-danger' onClick={removeMember.bind(this, member.id)}>Remove from Project <FontAwesomeIcon icon={faBan} /></button></div>
                                                    </div>}
                                                </div>
                                            </div>) : <small>you</small>}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}
                    handleClose={mmPopup}
                />}

                {user.id === project.owner ? (<div className='options'>
                    <button className='btn btn-secondary' style={{ paddingTop: '1rem' }} onClick = {editPopup}>Edit Project <span><FontAwesomeIcon icon={faPenSquare} /></span> </button>
                </div>) : <div></div>}

                {eProject && <CreateProjectPopup
                    content={<>
                    <div className='title'>
                        <h3>Edit Project</h3>
                    </div>
                    <div className="input-group mb-3">
                        <label> Name:  </label>
                        <input type="text" className="form-control" placeholder={project.name} aria-label="Username" aria-describedby="basic-addon1" onChange={e => setChangeProjectName(e.target.value)}/>
                    </div>
                    <div className="input-group">
                        <label> Description:  </label>
                        <textarea className="form-control" aria-label="With textarea" placeholder ={project.description} onChange={e => setChangeProjectDescription(e.target.value)}></textarea>
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        <button className='btn btn-primary' onClick={editProject}>Save Changes</button>
                    </div>
                    </>}
                    handleClose={editPopup}
                 />}
            
                <hr />
                <div className='options'>
                    <button className='btn btn-warning leave' onClick={leavePopup}> Leave Project </button>
                </div>
                {leaveProject && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>YOU ARE ABOUT TO LEAVE THIS PROJECT.</h3>
                        </div>
                        <div className="confirm">
                            <p>Are you sure ?</p>
                        </div>
                        <div className="invite-link">
                            <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={leavePopup}>No, stay</button>
                            <button className='btn btn-danger' onClick={exitProject}>Yes, leave</button>
                        </div>

                    </>}
                    handleClose={leavePopup}
                />}

                {user.id === project.owner ? (<div className='options'>
                    <button className='btn btn-danger' style={{ paddingTop: '5px' }} onClick={deletePopup}>Delete Project <span><FontAwesomeIcon icon={faTrash} /></span> </button>
                </div>) : <div></div>}
                {dProject && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>YOU ARE ABOUT TO DELETE THIS PROJECT.</h3>
                        </div>
                        <div className="confirm">
                            <p>Are you sure ?</p>
                        </div>
                        <div className="invite-link">
                            <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={deletePopup}>Cancel</button>
                            <button className='btn btn-danger' onClick={deleteProject}>Yes, Delete</button>
                        </div>

                    </>}
                    handleClose={deletePopup}
                />}

                <div className='des'>
                    <p>About This Project</p>
                    <hr />
                    <p>{project.description}</p>
                </div>
            </div>


            <div className='col-10'>
                <div className='pname'>
                    {project.name}
                </div>
                <hr />
                <div id="scroller-wrapper">
                    <div className='scroller'>
                        <div className='board-main-content'>
                            <div className='board'>
                                <div className='board-lists'>
                                    {cards.map((card)=>(
                                        <Cards card={card} members={members} admins = {listOfAdmins} key = {card.id} project ={project}/>
                                    ))}
                                    {listOfAdmins.includes(user.id) ?(< AddCards project={project.id} user ={user.id}/>): <div></div>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>                 
            </div>
        </div>

    )
}

export default ProjectPage