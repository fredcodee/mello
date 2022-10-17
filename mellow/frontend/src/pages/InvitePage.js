import React, { useEffect, useState, useContext, useRef } from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom"
import "../Invitelink.css"
import { faUserCheck, faBan } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InvitePage = () => {
    const apiCall = useRef(false)
    let { code } = useParams()
    let { user } = useContext(AuthContext)
    let [htmlcode, setHtmlcode] = useState('')


    useEffect(() => {
        //handling api calls to once
        if (!apiCall.current) {
            apiCall.current = true;
            joinProject()
        }
    }, [code])


    let joinProject = async () => {
        let response = await fetch(`/api/invite/${code}/${user.id}`)
        let data = await response.json()
        renderCode(data)
    }

    let renderCode = (data) => {
        if (data.code === "success") {
            setHtmlcode(
                <h3><span><FontAwesomeIcon icon={faUserCheck} /></span> {data.event}</h3>)
        } else if (data.code === "member") {
            setHtmlcode(
                <h3><span><FontAwesomeIcon icon={faBan} /></span> {data.event}</h3>)
        } else {
            setHtmlcode(
                <h3><span><FontAwesomeIcon icon={faBan} /></span> {data.event}</h3>)
        }

        window.setTimeout(function () {
            window.location.href = '/';
        }, 5000);
    }


    return (
        <div className='container'>
            <div className='content' style={{ textAlign: 'center', paddingTop: '5rem' }}>
                {htmlcode}
                <p>Redirecting you in a few seconds....</p>
            </div>
        </div>
    )
}

export default InvitePage
