import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div style={{maxWidth: '800px'}}>
          <h1>Smart Interview Preparation Platform</h1>
          <p>
            Practice for your dream job with our comprehensive MCQ tests. 
            Get instant results, track your progress, and identify areas for improvement.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/login" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '1rem 2rem'}}>
              Start Practice
            </Link>
            <Link to="/register" className="btn btn-outline" style={{fontSize: '1.1rem', padding: '1rem 2rem'}}>
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <h2 className="text-center mb-4" style={{fontSize: '2rem', color: 'var(--primary)'}}>
          Why Choose Our Platform?
        </h2>
        
        <div className="grid grid-3">
          <div className="card text-center">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>⏱️</div>
            <h3 style={{marginBottom: '1rem'}}>Timed Tests</h3>
            <p className="text-gray">
              Real exam experience with 10-minute MCQ tests and automatic submission
            </p>
          </div>
          
          <div className="card text-center">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📊</div>
            <h3 style={{marginBottom: '1rem'}}>Performance Analytics</h3>
            <p className="text-gray">
              Track your progress with detailed analytics and identify weak areas
            </p>
          </div>
          
          <div className="card text-center">
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🎯</div>
            <h3 style={{marginBottom: '1rem'}}>5 Categories</h3>
            <p className="text-gray">
              DSA, Operating Systems, DBMS, Computer Networks, and Aptitude
            </p>
          </div>
        </div>

        {/* Categories Section */}
        <h2 className="text-center mt-4 mb-4" style={{fontSize: '2rem', color: 'var(--primary)'}}>
          Test Categories
        </h2>
        
        <div className="grid grid-4">
          {['DSA', 'OS', 'DBMS', 'CN', 'Aptitude'].map((category) => (
            <div key={category} className="card text-center">
              <h3 style={{color: 'var(--secondary)', marginBottom: '0.5rem'}}>{category}</h3>
              <p className="text-gray">10 Questions</p>
              <p className="text-gray">10 Minutes</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="card text-center mt-4" style={{background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white'}}>
          <h2 style={{marginBottom: '1rem'}}>Ready to Start?</h2>
          <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>
            Join thousands of students preparing for their interviews
          </p>
          <Link to="/register" className="btn" style={{background: 'white', color: 'var(--primary)'}}>
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2026 Smart Interview Platform. All rights reserved.</p>
        <p style={{marginTop: '0.5rem', opacity: 0.8}}>
          Skill Evaluation System for Interview Preparation
        </p>
      </div>
    </div>
  );
};

export default Home;