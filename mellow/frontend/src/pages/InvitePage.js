import React from 'react'
import React, {useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { useParams } from "react-router-dom"

const InvitePage = () => {
    let {code} = useParams()
    let {user} = useContext(AuthContext)
    let [project, setProject] = useState("")
    let[members, setMembers] = useState([])
    let [event, setEvent] = useState("")


    useEffect(()=>{
        getProject()
    }, [code] )


    let getProject = async()=>{
        let response = await fetch(`/invite/${code}}`)
        let data = await response.json()
        if(response.status === 200){
            setProject(data)
            getMembers(data.id)
            checkUser(user.name)
        }else{
            
        }
        
    }

    let getMembers = async(id)=>{
        let response = await fetch(`/api/project/view/members/${project.id}`)
        let data = await response.json()
        setMembers(data)
    }


    let addUserToProject = async(userName)=>{
        let response = await fetch(`/api/project/add/${userName}/${project.id}/${user.id}`)
        if(response.status === 200){
            setEvent(`you have joined ${project.name}`)
        }
        else{
            setEvent('Cant add this user try again later')
        }
    }

    let checkUser = (userName)=>{
        let check = members.filter((user)=> user.name === userName)
        if(check.length > 0){
            alert(`${userName} is already a member of this project`)
        }
        else{
            addUserToProject(userName)
        }
    }




  return (
    <div>
      
    </div>
  )
}

export default InvitePage
