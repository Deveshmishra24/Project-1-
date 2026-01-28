import { useState, useEffect } from 'react'
import Login from './pages/login'
import Registration from './pages/registration'
import Landing from './pages/landing'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Dashboard from './pages/Dashboard'
import './App.css'
import './theme.css'

function App() {
  const[page, setPage]=useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isregistered, setIsRegistered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Update theme in localStorage and apply to root element
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    const root = document.getElementById('root');
    if (root) {
      root.className = `${theme}-theme`;
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark/Light Mode">
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      
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
    </div>
  );
}

export default App