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
    let [editPopup, setEditPopup] = useState(false)
    //for unassign
    let [unasignPopup, setUnasignPopup] = useState(false)
    let [un_cardId, setUn_cardId] = useState('')
    let [un_userId, setUn_userId] = useState('')
    // for edit
    let [cardId, setCardId] = useState('')
    let [title, setTitle] = useState('');
    let [labels, setLabels] = useState('');
    let [labelColor, setLabelColor] = useState('');
    let [deadlineDate, setDeadlineDate] = useState('');

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

    let toggleEditPopup = (card) => {
        setCardId(card.id)
        setTitle(card.title);
        setLabels(card.labels);
        setLabelColor(card.label_color);
        setDeadlineDate(card.deadlineDate);
        setEditPopup(!editPopup)
    }

    let toggleAsignPopup = () => {
        setAsignPopup(!asignPopup);
    }


    let toggleUnAsignPopup = (cardId, userId) => {
        setUn_cardId(cardId)
        setUn_userId(userId)
        setUnasignPopup(!unasignPopup);
    }

    let getTime = (card) => {
        return new Date(card.deadlineDate).toLocaleDateString()
    }

    //asign users to card
    let asignUsersToCard = async (cardId, userId, name) => {
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
    let unasignUsers = async (cardId, userId) => {
        let response = await fetch(`/api/project/cards/unasign/users/${cardId}/${userId}`)
        if (response.status === 200) {
            alert(`you have Unassigned user from this card`)
            window.location.reload();
        }
        else {
            alert('oops try again later')
        }
    }

    // edit card
    let handleSubmit = (e) => {
        e.preventDefault();
        onEdit({ title, labels, labelColor, deadlineDate }, cardId);
    }

    let onEdit = async (updatedCard, cardId) => {
        // Make a PUT request to the server to update the card
        await fetch(`/api/project/cards/edit/${cardId}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCard)
        })
            .then(response => {
                if (response.status === 200) {
                    alert("New Changes Saved!");
                    window.location.reload();
                } else {
                    alert("Error updating card");
                }
            })
            .catch(error => {
                alert("Error:", error);
            });
    }

    //delete card
    let deleteCard = async (cardId, userId) => {
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
                        <span style={{ color: 'blue' }}><FontAwesomeIcon icon={faPenSquare} style={{ paddingRight: "1rem" }} onClick={toggleEditPopup.bind(this, card)} /></span>
                        <span style={{ color: 'red' }} onClick={() => deleteCard(card.id, user.id)}>
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
                                <Dropdown.Item key={member.id} style={{ cursor: 'default' }} eventKey={member.id} >{member.name} {admins.includes(user.id) ? (<span style={{ color: 'red', cursor: 'pointer' }} onClick={toggleUnAsignPopup.bind(this, card.id, member.id)}><FontAwesomeIcon icon={faTrash} /></span>) : <div></div>}</Dropdown.Item>
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
                {/* add comment */}
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
                {/* assign users */}
                {asignPopup && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Assign Members To This Card</h3>
                        </div>
                        <div>
                            <ul>
                                {members.map((member, index) => (
                                    asignedMembers.includes(member) ? (
                                        <div></div>
                                    ) : <li key={index} className='rounded-pill mm' onClick={asignUsersToCard.bind(this, card.id, member.id, member.name)}>
                                        {member.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>}
                    handleClose={toggleAsignPopup}
                />}
                {/* unassign users */}
                {unasignPopup && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Unassign from this Card</h3>
                        </div>
                    </>}
                    handleClose={toggleUnAsignPopup}
                    unasignUsers={unasignUsers}
                    cardId={un_cardId}
                    userId={un_userId}
                />}
                {/* edit card */}
                {editPopup && <CreateProjectPopup
                    content={<>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="labels">Labels:</label>
                                <select
                                    className="form-control"
                                    id="labels"
                                    value={labels}
                                    onChange={e => setLabels(e.target.value)}
                                >
                                    <option value="no label">No Label</option>
                                    <option value="Update required">Update required</option>
                                    <option value="Done">Done</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Important">Important</option>
                                    <option value="urgent">Urgent</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Onhold">Onhold</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="label-color">Label Color:</label>
                                <select
                                    className="form-control"
                                    id="label-color"
                                    value={labelColor}
                                    onChange={e => setLabelColor(e.target.value)}
                                >
                                    <option value="red" style={{ backgroundColor: 'red' }}>Red</option>
                                    <option value="lime" style={{ backgroundColor: 'lime' }}>Lime</option>
                                    <option value="fuchsia" style={{ backgroundColor: 'fuchsia' }}>Fuchsia</option>
                                    <option value="yellow" style={{ backgroundColor: 'yellow' }}>Yellow</option>
                                    <option value="aqua" style={{ backgroundColor: 'aqua' }}>Aqua</option>
                                    <option value="darkorange" style={{ backgroundColor: 'darkorange' }}>Orange</option>
                                    <option value="moccasin" style={{ backgroundColor: 'moccasin' }}>Moccasin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deadline-date">Deadline Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="deadline-date"
                                    value={deadlineDate}
                                    onChange={e => setDeadlineDate(e.target.value)}
                                />
                            </div>
                            <div style={{ textAlign: 'center', paddingTop: '1rem' }}>

                                <button type="submit" className="btn btn-primary">
                                    Edit Card
                                </button>
                            </div>
                        </form>
                    </>}
                    handleClose={toggleEditPopup}
                />}

            </div>
        </div>
    )
}

export default Cards
