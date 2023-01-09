import React from 'react'
import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CreateProjectPopup from '../components/CreateProjectPopup';
import '../Cards.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { faUsers, faTrash, faPenSquare } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Cards = ({ card, members, admins }) => {
    let { user } = useContext(AuthContext)
    let [asignedMembers, setAsignedMembers] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [asignPopup, setAsignPopup] = useState(false)
    let [unasignPopup, setUnasignPopup] = useState(false)
    //for unassign
    let [un_cardId, setUn_cardId] = useState('')
    let [un_userId, setUn_userId] = useState('')

    useEffect(() => {
        checkAsignedMembers()
    }, [members])

    //card.asigned_To returns users id so check if the id is in members
    let checkAsignedMembers = () => {
        let users = []
        let asignedUsers = card.asigned_To
        for (var i = 0; i < asignedUsers.length; i++) {
            for (var x = 0; x < members.length; x++) {
                if (members[x].id === asignedUsers[i]) {
                    users.push(members[x])
                }
            }
        }
        setAsignedMembers(users)
    }


    let togglePopup = () => {
        setIsOpen(!isOpen);
    }

    let toggleAsignPopup = () => {
        setAsignPopup(!asignPopup);
    }

    let toggleUnAsignPopup = (cardId,userId) => {
        setUn_cardId(cardId)
        setUn_userId(userId)
        setUnasignPopup(!unasignPopup);
    }

    let getTime = (card) => {
        return new Date(card.deadlineDate).toLocaleDateString()
    }

    //asign users to card
    let  asignUsersToCard= async(cardId, userId, name)=>{
        let response = await fetch(`/api/project/cards/asign/users/${cardId}/${userId}`)
        if (response.status === 200) {
            alert(`you have assigned ${name} to this card`)
            window.location.reload();
        }
        else {
            alert('oops try again later')
        }
    }

    //unasign users from a card
    let unasignUsers = async(cardId, userId) =>{
        let response = await fetch(`/api/project/cards/unasign/users/${cardId}/${userId}`)
        if (response.status === 200) {
            alert(`you have Unassigned user from this card`)
            window.location.reload();
        }
        else {
            alert('oops try again later')
        }
    }

    //delete card
    let deleteCard = async(cardId, userId) =>{
        await fetch(`/api/project/cards/delete/${cardId}/${userId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                alert('Card deleted successfully');
                window.location.reload();
              } else {
                alert('Error deleting card');
              }
            })
            .catch(error => {
              alert('Error:', error);
            });
    }


    return (
        <div className="list border border-start-0">
            <div className='list'>
                <div className="list-title">
                    {card.title}
                </div>
                {admins.includes(user.id) ? 
                    <div className='cardtools'>
                        <span style={{color:'red'}}><FontAwesomeIcon icon={faPenSquare} style={{ paddingRight: "1rem" }}/></span>
                        <span onClick={() => deleteCard(card.id, user.id)}>
                            <FontAwesomeIcon icon={faTrash} style={{ paddingRight: "1rem" }} />
                        </span>
                    </div> : <div></div>}
                <hr />
                <div className='att'>
                    <div className='label' style={{ backgroundColor: card.label_color }}>
                        <p>{card.labels}</p>
                    </div>
                    <div className='dl'>
                        Dead line: {getTime(card)}
                    </div>

                </div>
                <div className="cd as">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" variant="secondary" className='members'><p><span><FontAwesomeIcon icon={faUsers} /></span> Assigned Members ({card.asigned_To.length})</p></Dropdown.Toggle>

                        <Dropdown.Menu>
                            {admins.includes(user.id) ? (<Dropdown.Item style={{ color: 'blue' }} onClick={toggleAsignPopup}>+ Assign Member</Dropdown.Item>) : <div></div>}
                            {asignedMembers.map((member) => (
                                <Dropdown.Item key={member.id} style={{ cursor : 'default'}} eventKey={member.id} >{member.name} {admins.includes(user.id) ? (<span style={{ color: 'red', cursor : 'pointer'}} onClick={toggleUnAsignPopup.bind(this, card.id, member.id)}><FontAwesomeIcon icon={faTrash} /></span>) : <div></div>}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="cd">
                    <div className='name-time'>
                        <small className='cd-name'>User name</small>
                        <small className='cd-time'>2424444</small>
                    </div>
                    <hr />
                    <div className='comment'>
                        <p>dcnjldljjlljl</p>
                    </div>
                </div>
                <div className="add-card" onClick={togglePopup}>
                    + Add Comment
                </div>

                {/* popup contents */}
                {isOpen && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Add Comment</h3>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Add a comment" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className='btn btn-primary'>Post</button>
                        </div>
                    </>}
                    handleClose={togglePopup}
                />}
                {asignPopup && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Assign Members To This Card</h3>
                        </div>
                        <div>
                            <ul>
                                {members.map((member, index) => (
                                    asignedMembers.includes(member)? (
                                        <div></div>
                                    ) : <li key={index} className='rounded-pill mm' onClick={asignUsersToCard.bind(this,card.id, member.id, member.name)}>
                                        {member.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}
                    handleClose={toggleAsignPopup}
                />}
                {unasignPopup && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Unassign from this Card</h3>
                        </div>
                    </>}
                    handleClose={toggleUnAsignPopup}
                    unasignUsers = {unasignUsers}
                    cardId = {un_cardId}
                    userId = {un_userId}
                />}
                
            </div>
        </div>
    )
}

export default Cards
