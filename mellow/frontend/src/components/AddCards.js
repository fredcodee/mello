import React from 'react'
import { useEffect, useState } from 'react';
import CreateProjectPopup from '../components/CreateProjectPopup';
import '../Cards.css';

const AddCards = ({project, user}) => {
    let [isOpen, setIsOpen] = useState(false)

    let togglePopup = () => {
        setIsOpen(!isOpen);
    }

    let createCard = async(event)=>{
        event.preventDefault();

        // Get the form element
        const form = event.target;
        const title = form.elements['title'].value;
        const labels = form.elements['labels'].value;
        const labelColor = form.elements['label_color'].value;
        const deadlineDate = form.elements['deadlineDate'].value;
        
        const body = {
            title,
            labels,
            labelColor,
            deadlineDate,
        };

        // Send the POST request to the backend
        await fetch(`/api/project/cards/create/${project}/${user}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (response.ok) {
                    console.log('Card created successfully');
                    window.location.reload();
                } else {
                    alert('Error creating card');
                }
            })
            .catch(error => {
                alert('Error:', error);
            });
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
                    <form onSubmit={createCard}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Title/task" aria-label="Username" aria-describedby="basic-addon1" name='title' required/>
                        </div>
                        <div>
                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='labels'>
                                <option value="no label">Select Card Label</option>
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
                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='label_color'>
                                <option value="grey">Select Label color</option>
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
                          <label for="date-field"> Select Dead-LineDate:</label>
                          <input type="date" id="date-field" name="deadlineDate" className="form-control" aria-describedby="basic-addon1"></input>
                        </div>
                        <div style={{textAlign:'center', paddingTop:'1rem'}}>
                            <button type='submit' className='btn btn-primary'>Create</button>
                        </div>
                    </form>
                    </>}
                    handleClose={togglePopup}
                />}
            </div>
         </div>
  )
}

export default AddCards