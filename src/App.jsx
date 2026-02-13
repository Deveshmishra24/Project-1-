import { useState, useEffect } from 'react'
import Login from './pages/login.jsx'
import P1 from './pages/p1.jsx'
import Landing from './pages/landing.jsx'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ApiDemo from './pages/ApiDemo.jsx'
import './App.css'
import './theme.css'

function App() {
  const [page, setPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Restore login session
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setPage("dashboard");
    }
  }, []);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Apply theme
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    const root = document.getElementById('root');
    if (root) root.className = `${theme}-theme`;
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* PUBLIC PAGES */}
      {page === 'landing' && <Landing onNavigate={setPage} />}
      {page === 'home' && <Home />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      {page === 'api-demo' && <ApiDemo />}

      {/* REGISTER PAGE (FIXED PROP NAME) */}
      {page === "register" && (
        <P1 onRegisterSuccesful={() => setPage('login')} />
      )}

      {/* LOGIN PAGE */}
      {page === "login" && (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
            setPage('dashboard');
          }}
        />
      )}

      {/* PROTECTED DASHBOARD ROUTE */}
      {page === "dashboard" && (
        isLoggedIn ? (
          <Dashboard
            onLogout={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("user");
              setPage('landing');
            }}
          />
        ) : (
          <Login
            onLogin={() => {
              setIsLoggedIn(true);
              setPage('dashboard');
            }}
          />
        )
      )}

      {/* DEV BUTTON */}
      <button onClick={() => setPage("api-demo")}>ApiDemo</button>
    </div>
  );
}

export default App;
