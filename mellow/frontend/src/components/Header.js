import React , {useContext}from 'react'
import { Link}  from 'react-router-dom'
import AuthContext from '../context/AuthContext'



const Header = () => {
  let {user} = useContext(AuthContext)
  return (
    <div className='navigation'>
      <div className="nav-container">
        <div className="brand">
         <Link to = "/" className="navbar-brand" > MELLOW</Link>
        </div>
        <nav>
          <div className="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
          { user ? 
          (<ul className="nav-list">
            <li>
              <a href="#!">Home</a>
            </li>
            <li>
              <a href="#!">Create Project</a>
            </li>
            <li>
              <a href="#!">Welcome, {user.name}</a>
            </li>
            <li>
            <Link to = "/logout"> Logout</Link>
            </li>
          </ul>)  : (
            <ul className="nav-list">
            <li>
              <a href="#!">Home</a>
            </li>
            <li>
              <Link to = "/login"> Login</Link>
            </li>
            <li>
              <Link to = "/register"> Create An Account</Link>
            </li>
            <li>
              <a href="#!">Contact</a>
            </li>
            </ul>
            )}
        </nav>
      </div>
    </div>
  )
}

export default Header