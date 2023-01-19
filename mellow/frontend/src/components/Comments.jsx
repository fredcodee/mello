import React from 'react'
import { useState, useEffect } from 'react';
import CreateProjectPopup from '../components/CreateProjectPopup';
import { faTrash} from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comments = ({ card, members, project, user }) => {
    let [comments, setComments] = useState([])
    let [userLookup, setUserLookup] = useState('')
    let [createCommentPopup, setCreateCommentPopup] = useState(false)
    let [inputValue, setInputValue] = useState('');

    useEffect(() => {
        getComments()
        createUserLookup()
    }, [card.id, members])

    //api call to get comments
    let getComments = async () => {
        let response = await fetch(`/api/project/cards/comments/view/${card.id}`)
        let data = await response.json()
        setComments(data)
    }

    let createUserLookup = () => {
        const users = {}
        members.forEach(member => {
            users[member.id] = member.name
        });
        setUserLookup(users)
    }

    let getuserName = (user_id) => {
        return userLookup[user_id] || 'Anon User'
    }

    //create comment popup
    let togglePopup = () => {
        setCreateCommentPopup(!createCommentPopup);
    }

    async function handlePostClick(e) {
        e.preventDefault();
        const comment = inputValue;

        try {
            const body = { comment };
            const response = await fetch(
                `/api/project/cards/comments/create/${user.id}/${project.id}/${card.id}`,
                {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!response.ok) {
                alert("Sorry an error occured")
            }

            alert("Comment Added")
            window.location.reload();
        } catch (err) {
            alert("Sorry an error occured")
        }
    }

    let deleteComment = async (commentId, userId) => {
        await fetch(`/api/project/cards/comments/delete/${userId}/${commentId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Comment deleted');
                    window.location.reload();
                } else {
                    alert('Error deleting comment');
                }
            })
            .catch(error => {
                alert('Error:', error);
            });
    }



    return (
        <div>
            <div className="cd">
                {comments.length === 0 ? (
                    <div className='comment'>
                        <p>No comments</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-details">
                            <div className='name-time'>
                                <small className='cd-name'>{getuserName(comment.user)}</small>
                                <small className='cd-time'>{new Date(comment.timePosted).toLocaleString()}</small>
                            </div>
                            <div className='comment'>
                                <p>{comment.comment}</p>
                                {comment.user === user.id ? <span style={{ color: 'red' }} onClick={() => deleteComment(comment.id, user.id)}>
                                    <FontAwesomeIcon icon={faTrash} style={{ paddingRight: "1rem" }} />
                                </span>:<div></div>}
                                
                            </div>
                            <hr />
                        </div>
                    ))
                )}

            </div>

            <div className="add-card list-title addcd">
                <p onClick={togglePopup}>+ Add Comment</p>
            </div>

            {/* popup for comments */}
            {createCommentPopup && <CreateProjectPopup
                content={<>
                    <div className='title'>
                        <h3>Add Comment</h3>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Type a comment" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setInputValue(e.target.value)} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className='btn btn-primary' onClick={handlePostClick}>Post</button>
                    </div>
                </>}
                handleClose={togglePopup}
            />}
        </div>
    )
}

export default Comments
