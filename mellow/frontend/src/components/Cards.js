import React from 'react'
import { useEffect } from 'react';
import '../Cards.css';

const Cards = (projectId) => {
    let [cards, setCards] = useEffect("")
    useEffect(()=>{
        tasks()
    }, [])

    let tasks = async()=>{
        let response = await fetch(`/api/project/cards/view/${projectId}`)
        let data = await response.json()
    }

    return (
        <div id="scroller-wrapper">
            <div className='scroller'>
                <div className='board-main-content'>
                    <div className='board'>
                        <div className='board-lists'>
                            <div class="list border border-start-0">
                                <div className='list'>
                                    <div class="list-title">
                                        Task title
                                    </div>
                                    <hr/>
                                    <div className='att'>
                                        <div className='label'>
                                            <p>Important</p>
                                        </div>
                                        <div className='dl'>
                                            Deadline: 24-Nov 2022
                                        </div>
                                        
                                    </div>
                                    <div class="cd as">
                                        Asigned Members (3)
                                    </div>
                                    <div class="cd">
                                        <div className='name-time'>
                                            <small className='cd-name'>Mike john</small>
                                            <small className='cd-time'>19-oct, 9:10am</small>
                                        </div>
                                        <hr />
                                        <div className='comment'>
                                            <p>how do i fix load problems</p>
                                        </div>
                                    </div>
                                    <div class="cd">
                                    <div className='name-time'>
                                            <small className='cd-name'>Sarah jen</small>
                                            <small className='cd-time'>17-oct, 9:10am</small>
                                        </div>
                                        <hr />
                                        <div className='comment'>
                                            <p>working on this rn..</p>
                                        </div>
                                    </div>
                                    <div class="cd">
                                        <div className='name-time'>
                                            <small className='cd-name'>mica</small>
                                            <small className='cd-time'>19-oct, 11:10am</small>
                                        </div>
                                        <hr />
                                        <div className='comment'>
                                            <p>Asign this to abdul</p>
                                        </div>
                                    </div>
                                    <div class="add-card">
                                        + Add another card
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
