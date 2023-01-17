import React from 'react'
import { useState, useEffect } from 'react';

const Comments = ({ card , members}) => {
    let [comments, setComments] = useState([])
    let [userLookup, setUserLookup] = useState('')

    useEffect(() => {
        getComments()
        createUserLookup()
    }, [card.id])

    //api call to get comments
    let getComments = async () => {
        let response = await fetch(`/api/project/cards/comments/view/${card.id}`)
        let data = await response.json()
        setComments(data)
    }

    //get username
    // let getuserName = (user_id)=>{
    //     console.log(members)
    //     console.log(user_id)
    //     for(var i =0; i < members.length; i++){
    //         if(user_id === members[i].id){
    //             return members[i].name
    //         }
    //         return 'Anon User'
    //     }
    // }
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
                            </div>
                            <hr />
                        </div>
                    ))
                )}

            </div>

            <div className="add-card">
                <p>+ Add Comment</p>
            </div>
        </div>
    )
}

export default Comments
