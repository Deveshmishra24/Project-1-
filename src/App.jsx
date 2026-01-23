import { useState } from 'react'
import Login from './pages/login.jsx'
import Registration from './pages/registration.jsx'
import Landing from './pages/landing.jsx'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Dashboard from './pages/Dashboard.jsx'

function App() {
  const[page, setPage]=useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isregistered, setIsRegistered] = useState(false);

  return (

    
    <div>
      {page === 'landing' && <Landing onNavigate={setPage}/>}
      {page === 'home' && <Home onNavigate={setPage}/>}
      {page === 'about' && <About onNavigate={setPage}/>}
      {page === 'contact' && <Contact onNavigate={setPage}/>}
      {page === 'dashboard' && <Dashboard onNavigate={setPage}/>}
      {page === "register" && <Registration onRegisterSuccessful={() => setPage('login')} />}
      {page === "login" && <Login onLogin={() =>{
        setIsLoggedIn(true);
        setPage('dashboard');
      }} />}
    </div>
  );
}

export default App