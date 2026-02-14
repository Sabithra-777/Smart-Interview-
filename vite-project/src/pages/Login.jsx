import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Login = () => {
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

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="text-center mb-4">
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🎓</div>
          <h2 style={{fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem'}}>
            Welcome Back
          </h2>
          <p className="text-gray">Login to continue your interview preparation</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
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
            className="btn btn-primary w-full"
          >
            {loading ? (
              <>
                <span className="spinner" style={{width: '20px', height: '20px', marginRight: '0.5rem'}}></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-gray">
            Don't have an account?{' '}
            <Link to="/register" style={{color: 'var(--secondary)', fontWeight: '600'}}>
              Register here
            </Link>
          </p>
          <p className="text-gray mt-2">
            <Link to="/" style={{color: 'var(--gray)'}}>
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;