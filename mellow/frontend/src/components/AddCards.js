import React from 'react'
import { useEffect, useState } from 'react';
import CreateProjectPopup from '../components/CreateProjectPopup';
import '../Cards.css';

const AddCards = () => {
    let [isOpen, setIsOpen] = useState(false)

    let togglePopup = () => {
        setIsOpen(!isOpen);
    }

  return (
    <div className="list border border-start-0">
            <div className='list'>
                <div className="list-title addcd" onClick={togglePopup}>
                    + Create New Card
                </div>
                {isOpen && <CreateProjectPopup
                    content={<>
                        <div className='title'>
                            <h3>Create New Card</h3>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Title/task" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div>
                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected value="no label">Select Card Label</option>
                                <option value="Update required">Update required</option>
                                <option value="Done">Done</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Important">Important</option>
                                <option value="urgent">Urgent</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Onhold">Onhold</option>
                            </select>
                        </div>
                        <div style={{paddingTop:'1rem'}}>
                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected value="grey">Select Label color</option>
                                <option value="red" style={{backgroundColor:'red'}}>Red</option>
                                <option value="lime" style={{backgroundColor:'lime'}}>Lime</option>
                                <option value="fuchsia" style={{backgroundColor:'fuchsia'}}>Fuchsia</option>
                                <option value="yellow" style={{backgroundColor:'yellow'}}>Yellow</option>
                                <option value="aqua" style={{backgroundColor:'aqua'}}>Aqua</option>
                                <option value="darkorange" style={{backgroundColor:'darkorange'}}>Orange</option>
                                <option value="moccasin" style={{backgroundColor:'moccasin'}}>Moccasin</option>
                            </select>
                        </div>
                        <div style={{paddingTop:'1rem'}}>
                            <p>Select Dead-Line Date</p>
                        </div>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            asign to:
                        </div>

                        <div style={{textAlign:'center'}}>
                            <button className='btn btn-primary'>Create</button>
                        </div>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
         </div>
  )
}

export default AddCards