import { useState, useEffect } from 'react'
import Login from './pages/login.jsx'
import Registration from './pages/registration.jsx'
import Landing from './pages/landing.jsx'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ApiDemo from './pages/ApiDemo.jsx'
import './App.css'
import './theme.css'

function App() {
  const[page, setPage]=useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isregistered, setIsRegistered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  //session restore on refresh
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"));
    if(user && user.isLoggedIn){
      setIsLoggedIn(true);
    }
  }, []);

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
        {page === 'home' && <Home/>}
        {page === 'about' && <About/>}
        {page === 'contact' && <Contact />}
        {page === 'api-demo' && <ApiDemo />}
        {page === 'dashboard' && <Dashboard/>}
        {page === "dashboard" && isLoggedIn && <Dashboard onLogout={() => {
          setIsLoggedIn(false);
          setPage('landing');
        }} />}
        {page === "register" && <Registration onRegisterSuccessful={() => setPage('login')} />}
        
        {page === "login" && <Login onLogin={() =>{
          setIsLoggedIn(true);
          setPage('dashboard');
        }} />}

        {/*protected route for dashboard*/ }
        {page === "dashboard" && (isLoggedIn  ?(<Dashboard onLogout={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("user");
          setPage('landing');
        }} />
      ):(
        <Login onLogin={() =>{
          setIsLoggedIn(true);
          setPage('dashboard');
        }} />
      ))}

        {/*Dev button*/}
        <button onClick={() => setPage("api")}>ApiDemo</button>
      </div>
    </div>

  );
}

export default App;