import React, { useContext} from 'react';
import '../Loginpage.css';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)

  return (
   <div id="flatix">
      <header>
        <h1 className="title" style={{color:'white'}}> Member Sign In</h1>
      </header>
      <section>
        <form onSubmit={loginUser}>
          <input type="text" name="email" className="mail" placeholder="E-Mail Address"/>
          <input type="password" name="password" className="password" placeholder="Password"/>
          <input type="submit" className="login" value="SIGN IN"/>
        </form>
      </section>
       <div style={{textAlign:'center'}}>
         <p>Don't have an account? <span><Link to={'/register'} style = {{textDecoration:'none'}}>Sign up </Link></span></p>
       </div>
      <footer>
        Created by Fredcode
      </footer>
	</div>
  )
}

export default LoginPage