import React from 'react'
import { useEffect, useState } from 'react';
import '../Cards.css';


let getTime = (card)=>{
    return new Date(card.deadlineDate).toLocaleDateString()
}

const Cards = ({card}) => {
    //yellow, blue, red , pink, orange

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
                <div className="add-card">
                    + Add another card
                </div>
            </div>
         </div>
    )
}

export default Cards
