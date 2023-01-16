import React from 'react'
import { useState, useEffect } from 'react';

const Comments = ({ card , members}) => {
    let [comments, setComments] = useState([])

    useEffect(() => {
        getComments()
    }, [card.id])

    //api call to get comments
    let getComments = async () => {
        let response = await fetch(`/api/project/cards/comments/view/${card.id}`)
        let data = await response.json()
        setComments(data)
    }

    //get username
    let getuserName = (user_id)=>{
        for(var i =0; i < members.length; i++){
            if(user_id === members[i].id){
                return members[i].name
            }
            return 'Anon User'
        }
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
                        <div key={comment.id}>
                            <div className='name-time'>
                                <small className='cd-name'>{getuserName(comment.user)}</small>
                                <small className='cd-time'>{new Date(comment.timePosted).toLocaleString()}</small>
                            </div>
                            <hr />
                            <div className='comment'>
                                <p>{comment.comment}</p>
                            </div>
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
