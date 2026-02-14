import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { testService } from '../services/api';

const Result = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const latestResult = location.state?.latestResult;

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await testService.getResults();
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'var(--success)';
    if (percentage >= 60) return 'var(--secondary)';
    return 'var(--error)';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 80) return '🎉 Excellent Performance!';
    if (percentage >= 60) return '👍 Good Job!';
    return '💪 Keep Practicing!';
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{color: 'var(--primary)'}}>
        Test Results
      </h1>

      {/* Latest Result */}
      {latestResult && (
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white',
          textAlign: 'center'
        }}>
          <h2 className="mb-3">Latest Test Result</h2>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>
            {latestResult.percentage >= 60 ? '🎉' : '📚'}
          </div>
          <h3 className="mb-2">{latestResult.category}</h3>
          <div style={{fontSize: '3rem', fontWeight: '700', marginBottom: '1rem'}}>
            {latestResult.score}/{latestResult.totalQuestions}
          </div>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>
            {latestResult.percentage}%
          </div>
          <p style={{fontSize: '1.2rem', opacity: 0.9}}>
            {getPerformanceMessage(latestResult.percentage)}
          </p>
          <div className="mt-3">
            <Link to="/dashboard" className="btn" style={{background: 'white', color: 'var(--primary)', marginRight: '1rem'}}>
              Back to Dashboard
            </Link>
            <Link to={`/test/${latestResult.category}`} className="btn btn-outline" style={{borderColor: 'white', color: 'white'}}>
              Retake Test
            </Link>
          </div>
        </div>
      )}

      {/* All Results */}
      <h2 className="text-center mt-4 mb-3" style={{color: 'var(--primary)'}}>
        Test History
      </h2>
      
      {results.length > 0 ? (
        <div className="grid grid-3">
          {results.map((result) => (
            <div key={result._id} className="card">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{color: 'var(--primary)'}}>{result.category}</h3>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: getScoreColor(result.percentage)
                }}>
                  {result.percentage}%
                </div>
              </div>
              
              <div style={{marginBottom: '1rem'}}>
                <p className="text-gray">
                  Score: <span style={{fontWeight: '600', color: 'var(--text)'}}>
                    {result.score}/{result.totalQuestions}
                  </span>
                </p>
                <p className="text-gray">
                  Date: {new Date(result.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray">
                  Time: {new Date(result.createdAt).toLocaleTimeString()}
                </p>
              </div>

              <div style={{
                padding: '0.75rem',
                background: result.percentage >= 60 ? '#D1FAE5' : '#FEE2E2',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
                color: result.percentage >= 60 ? '#065F46' : '#991B1B'
              }}>
                {result.percentage >= 60 ? '✓ Passed' : '✗ Need Improvement'}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📝</div>
          <h3 className="mb-2">No Test Results Yet</h3>
          <p className="text-gray mb-3">Start taking tests to see your results here</p>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Result;