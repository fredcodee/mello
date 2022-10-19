import React from 'react'
import '../Cards.css';

const Cards = () => {
    return (
        <div id="scroller-wrapper">
            <div className='scroller'>
                <div className='board-main-content'>
                    <div className='board'>
                        <div className='board-lists'>
                            <div class="list border border-start-0">
                                <div className='list'>
                                    <div class="list-title">
                                        Card title
                                    </div>
                                    <div class="card as">
                                        Asigned Members (3)
                                    </div>
                                    <div class="card">
                                        check features
                                    </div>
                                    <div class="card">
                                        fix load problems
                                    </div>
                                    <div class="card">
                                        comment
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
