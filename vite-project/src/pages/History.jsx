import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testService } from '../services/api';

const History = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
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
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{color: 'var(--primary)'}}>
        Performance History
      </h1>

      {/* Overall Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{analytics?.totalTests || 0}</div>
          <div className="stat-label">Total Tests Taken</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{analytics?.overallAverage || 0}%</div>
          <div className="stat-label">Overall Average</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{analytics?.weaknesses?.length || 0}</div>
          <div className="stat-label">Areas to Improve</div>
        </div>
      </div>

      {/* Topic-wise Performance */}
      {analytics?.topicPerformance && Object.keys(analytics.topicPerformance).length > 0 && (
        <div className="card">
          <h2 className="mb-3" style={{color: 'var(--primary)'}}>
            Topic-wise Performance
          </h2>
          <div className="grid grid-3">
            {Object.entries(analytics.topicPerformance).map(([topic, data]) => (
              <div key={topic} style={{
                padding: '1.5rem',
                background: 'var(--background)',
                borderRadius: '8px'
              }}>
                <h3 style={{marginBottom: '1rem', color: 'var(--secondary)'}}>{topic}</h3>
                <div style={{marginBottom: '0.5rem'}}>
                  <span className="text-gray">Tests Taken: </span>
                  <span style={{fontWeight: '600'}}>{data.totalTests}</span>
                </div>
                <div style={{marginBottom: '0.5rem'}}>
                  <span className="text-gray">Average Score: </span>
                  <span style={{
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: data.averageScore >= 60 ? 'var(--success)' : 'var(--error)'
                  }}>
                    {data.averageScore}%
                  </span>
                </div>
                <div style={{marginBottom: '1rem'}}>
                  <span className="text-gray">Best Score: </span>
                  <span style={{fontWeight: '600', color: 'var(--success)'}}>
                    {data.bestScore}%
                  </span>
                </div>
                <Link to={`/test/${topic}`} className="btn btn-primary" style={{width: '100%'}}>
                  Practice Again
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Tests */}
      {analytics?.scoreHistory && analytics.scoreHistory.length > 0 && (
        <div className="card mt-4">
          <h2 className="mb-3" style={{color: 'var(--primary)'}}>
            Recent Test Scores
          </h2>
          <div className="grid grid-4">
            {analytics.scoreHistory.map((item, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'var(--background)',
                borderRadius: '8px',
                textAlign: 'center',
                border: `2px solid ${item.score >= 60 ? 'var(--success)' : 'var(--error)'}`
              }}>
                <div style={{fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text)'}}>
                  {item.category}
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: item.score >= 60 ? 'var(--success)' : 'var(--error)'
                }}>
                  {item.score}%
                </div>
                <div className="text-gray" style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weak Areas */}
      {analytics?.weaknesses && analytics.weaknesses.length > 0 && (
        <div className="card mt-4" style={{background: '#FEE2E2', border: '2px solid var(--error)'}}>
          <h2 className="mb-3" style={{color: 'var(--error)'}}>
            ⚠️ Focus Areas
          </h2>
          <p className="text-gray mb-3">
            These topics need more practice (Average score below 60%)
          </p>
          <div className="grid grid-3">
            {analytics.weaknesses.map((weakness, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px'
              }}>
                <h4 style={{marginBottom: '0.5rem'}}>{weakness.topic}</h4>
                <p className="text-gray">Average: {weakness.averageScore}%</p>
                <p className="text-gray mb-2">Tests: {weakness.testsAttempted}</p>
                <Link to={`/test/${weakness.topic}`} className="btn btn-danger" style={{width: '100%'}}>
                  Improve Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {analytics?.totalTests === 0 && (
        <div className="card text-center">
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📊</div>
          <h3 className="mb-2">No History Yet</h3>
          <p className="text-gray mb-3">Take your first test to start tracking your progress</p>
          <Link to="/dashboard" className="btn btn-primary">
            Start Testing
          </Link>
        </div>
      )}
    </div>
  );
};

export default History;