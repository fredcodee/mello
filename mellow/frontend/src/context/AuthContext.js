import { createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;



export const AuthProvider = ({children}) =>{

    
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true);

    const history = useNavigate()

    let loginUser = async(e)=>{
        e.preventDefault()
        let response = await fetch('/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'Email_Address':e.target.email.value , 'password':e.target.password.value})
        })

        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        }else{
            alert("wrong info")
        }
    }
    
    const registerUser = async (name, Email_Address, password, password2) => {
        const response = await fetch("/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Email_Address,
            name,
            password,
            password2
          })
        });
        if (response.status === 201) {
          history("/login");
        } else {
          alert("Something went wrong!");
        }
      };


    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/')
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
    }

    useEffect(() => {
        if (authTokens) {
          setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
      }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}