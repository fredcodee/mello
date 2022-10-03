import './App.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import LogoutPage from './pages/LogoutPage';
import ProjectPage from './pages/ProjectPage';
import Header from './components/Header';
import PrivateRoute from './utlis/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Router>
          <AuthProvider>
          <Header/>
          <Routes>
            <Route  path = "/" index exact element = {<PrivateRoute> <Homepage /></PrivateRoute>}/>
            <Route element = {<LoginPage />} path = "/login" />
            <Route element = {<SignupPage/>} path = "/register" />
            <Route element = {<LogoutPage />} path  = "/logout"/>
            <Route element ={<PrivateRoute> <ProjectPage /></PrivateRoute>} path = "/view/:id"/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
