import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testService } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['DSA', 'OS', 'DBMS', 'CN', 'Aptitude'];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    
    if (userData?.role === 'student') {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await testService.getAnalytics();
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Welcome Section */}
      <div className="card text-center" style={{background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white'}}>
        <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>
          Welcome, {user?.name}! 👋
        </h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>
          {user?.role === 'student' 
            ? 'Ready to practice for your interviews?' 
            : 'Manage your platform from here'}
        </p>
      </div>

      {user?.role === 'student' ? (
        <div>
          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{analytics?.totalTests || 0}</div>
              <div className="stat-label">Total Tests</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{analytics?.overallAverage || 0}%</div>
              <div className="stat-label">Overall Average</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{analytics?.weaknesses?.length || 0}</div>
              <div className="stat-label">Weak Areas</div>
            </div>
          </div>

          {/* Test Categories */}
          <h2 className="text-center mb-3" style={{color: 'var(--primary)'}}>
            Choose Test Category
          </h2>
          <div className="grid grid-3">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/test/${category}`}
                className="card text-center"
                style={{textDecoration: 'none', color: 'inherit'}}
              >
                <h3 style={{color: 'var(--secondary)', fontSize: '1.8rem', marginBottom: '1rem'}}>
                  {category}
                </h3>
                <p className="text-gray" style={{marginBottom: '0.5rem'}}>
                  📝 10 Questions
                </p>
                <p className="text-gray" style={{marginBottom: '1rem'}}>
                  ⏱️ 10 Minutes
                </p>
                {analytics?.topicPerformance[category] && (
                  <p style={{color: 'var(--success)', fontWeight: '600'}}>
                    Best Score: {analytics.topicPerformance[category].bestScore}%
                  </p>
                )}
                <div className="btn btn-primary mt-2" style={{width: '100%'}}>
                  Start Test
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Scores */}
          {analytics?.scoreHistory && analytics.scoreHistory.length > 0 && (
            <div className="card mt-4">
              <h3 className="mb-3" style={{color: 'var(--primary)'}}>Recent Test Scores</h3>
              <div className="grid grid-4">
                {analytics.scoreHistory.slice(0, 4).map((item, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'var(--background)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{fontWeight: '600', marginBottom: '0.5rem'}}>{item.category}</div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: item.score >= 60 ? 'var(--success)' : 'var(--error)'
                    }}>
                      {item.score}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weak Areas */}
          {analytics?.weaknesses && analytics.weaknesses.length > 0 && (
            <div className="card mt-4" style={{background: '#FEE2E2', border: '2px solid var(--error)'}}>
              <h3 className="mb-3" style={{color: 'var(--error)'}}>
                ⚠️ Areas Needing Improvement
              </h3>
              <div className="grid grid-3">
                {analytics.weaknesses.map((weakness, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{marginBottom: '0.5rem'}}>{weakness.topic}</h4>
                    <p className="text-gray">Average: {weakness.averageScore}%</p>
                    <Link to={`/test/${weakness.topic}`} className="btn btn-danger mt-2" style={{width: '100%'}}>
                      Practice Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Admin Dashboard
        <div>
          <h2 className="text-center mb-4" style={{color: 'var(--primary)'}}>
            Admin Control Panel
          </h2>
          <div className="grid grid-2">
            <Link to="/admin" className="card text-center" style={{textDecoration: 'none', color: 'inherit'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📝</div>
              <h3 style={{marginBottom: '1rem'}}>Manage Questions</h3>
              <p className="text-gray">Add, edit, and delete test questions</p>
            </Link>
            
            <Link to="/admin" className="card text-center" style={{textDecoration: 'none', color: 'inherit'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📊</div>
              <h3 style={{marginBottom: '1rem'}}>View All Results</h3>
              <p className="text-gray">Monitor student performance</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;