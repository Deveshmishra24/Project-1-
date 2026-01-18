import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Login from './pages/login.jsx'
import Registration from './pages/registration.jsx'

function App() {
  const [currentpage, setCurrentPage] = useState('register');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isregistered, setIsRegistered] = useState(false);

  return (
    
    <div>
      {currentpage === 'register' && <Registration/>}
      {currentpage === 'login' && (isLoggedIn ?(
        <h1>Welcome, User!</h1>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ))}
    </div>
  );
}

export default App