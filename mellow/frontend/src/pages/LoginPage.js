import React, { useContext} from 'react';
import '../Loginpage.css';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)

  return (
   <div id="flatix">
      <header>
        <h1 className="title"> Member Sign In</h1>
      </header>
      <section>
        <form onSubmit={loginUser}>
          <input type="text" name="email" className="mail" placeholder="E-Mail Address"/>
          <input type="password" name="password" className="password" placeholder="Password"/>
          <input type="submit" className="login" value="SIGN IN"/>
        </form>
      </section>
      <footer>
        Created by Fredcode
      </footer>
	</div>
  )
}

export default LoginPage