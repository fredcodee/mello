import React , { useContext  }from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import '../Loginpage.css';

const LogoutPage = () => {

    const styles = {
        box:{
            width: '100%'
        }
    }
    let {logoutUser} = useContext(AuthContext)
  return (
    <div id="flatix">
      <header>
        <h1 className="title">Confirm Log out ?</h1>
      </header>
      <section style={styles.box}>
        <div className="d-grid gap-2 col-12 mx-auto">
            <button onClick={logoutUser} className="btn btn-danger" type="button">Yes</button>
            <Link to = "/" style={{textAlign: "center"}}><button className="btn btn-primary" type="button">No</button></Link>
        </div>
      </section>
      <footer>
        Created by Fredcode
      </footer>
	</div>



    
    
  )
}

export default LogoutPage