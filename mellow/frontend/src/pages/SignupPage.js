import React from 'react'
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../Loginpage.css';

const SignupPage = () => {
  const styles = {
    box: {
      height: '520px'
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext)

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(name, email, password, password2);
  }

  return (
    <div id="flatix" style={styles.box}>
      <header>
        <h1 className="title"> Create an Acount</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={e => setName(e.target.value)} className="mail" placeholder="Your Full Name" required />
          <input type="text" className="mail" onChange={e => setEmail(e.target.value)} placeholder="E-Mail Address" required />
          <input type="password" onChange={e => setPassword(e.target.value)} className="password" placeholder="Password" required />
          <input type="password" onChange={e => setPassword2(e.target.value)} className="password" placeholder="Type password again" required />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
          <input type="submit" className="login" value="SIGN UP" />
        </form>
      </section>
      <footer>
        Created by Fredcode
      </footer>
    </div>
  )
}

export default SignupPage