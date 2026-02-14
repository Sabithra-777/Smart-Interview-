import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎯 SmartPrep
        </Link>

        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              
              {user.role === 'student' && (
                <>
                  <Link to="/results" className="nav-link">My Results</Link>
                  <Link to="/history" className="nav-link">History</Link>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="nav-link">Admin Panel</Link>
                </>
              )}
              
              <span className="nav-link" style={{color: 'var(--primary)', fontWeight: '600'}}>
                {user.name} ({user.role})
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;