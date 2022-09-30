import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';
import Header from './components/Header';
import PrivateRoute from './utlis/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
          <Header/>
          <Routes>
            <Route  path = "/"  exact element = {<PrivateRoute> <Homepage /></PrivateRoute>}/>
            <Route element = {<LoginPage />} path = "/login" />
            <Route element = {<SignupPage/>} path = "/register" />
            <Route element = {<LogoutPage />} path  = "/logout"/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
