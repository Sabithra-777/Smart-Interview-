import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      const user = response.data.user;
      
      if (user.role !== 'student') {
        setError('Access denied. Students only.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{paddingTop: '2rem'}}>
      <div className="form-container">
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>👨🎓</div>
          <h2>Student Login</h2>
          <p>Access your interview preparation dashboard</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn btn-primary"
            style={{width: '100%'}}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <p>
            Don't have an account?{' '}
            <Link to="/register/student" style={{color: '#3b82f6'}}>
              Register as Student
            </Link>
          </p>
          <p style={{marginTop: '1rem'}}>
            <Link to="/login/admin" style={{color: '#ef4444'}}>
              Admin Login
            </Link>
            {' | '}
            <Link to="/" style={{color: '#64748b'}}>
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;