import React from 'react'
import { useEffect, useState } from 'react';
import CreateProjectPopup from '../components/CreateProjectPopup';
import '../Cards.css';


let getTime = (card)=>{
    return new Date(card.deadlineDate).toLocaleDateString()
}

const Cards = ({card}) => {
    //yellow, blue, red , pink, orange
    let [isOpen, setIsOpen] = useState(false)

    let togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="list border border-start-0">
            <div className='list'>
                <div className="list-title">
                    {card.title}
                </div>
                <hr/>
                <div className='att'>
                    <div className='label' style={{backgroundColor:card.label_color}}>
                        <p>{card.labels}</p>
                    </div>
                    <div className='dl'>
                        Dead line: {getTime(card)}
                    </div>
                    
                </div>
                <div className="cd as">
                    Asigned Members ({card.asigned_To.length})
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
                {isOpen && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Add Comment</h3>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Add a comment" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div style={{textAlign:'center'}}>
                            <button className='btn btn-primary'>Post</button>
                        </div>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
         </div>
    )
}

export default Cards
