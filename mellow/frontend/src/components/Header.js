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
          <div className="nav-mobile"><Link id="nav-toggle" to  = ""><span></span></Link></div>
          { user ? 
          (<ul className="nav-list">
            <li>
              <Link to = "/">Home</Link>
            </li>
            <li>
              <Link to  = "">Welcome, {user.name}</Link>
            </li>
            <li>
            <Link to = "/logout"> Logout</Link>
            </li>
          </ul>)  : (
            <ul className="nav-list">
            <li>
              <Link to  = "">Home</Link>
            </li>
            <li>
              <Link to = "/login"> Login</Link>
            </li>
            <li>
              <Link to = "/register"> Create An Account</Link>
            </li>
            <li>
              <Link to  = "">Contact</Link>
            </li>
            </ul>
            )}
        </nav>
      </div>
    </div>
  )
}

export default Header