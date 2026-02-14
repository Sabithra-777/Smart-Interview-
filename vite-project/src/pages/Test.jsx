import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService } from '../services/api';

const Test = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (timeLeft > 0 && !submitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, submitting]);

  const fetchQuestions = async () => {
    try {
      const response = await testService.getQuestions(category);
      setQuestions(response.data.questions);
      setTimeLeft(response.data.timeLimit || 600);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error loading questions. Please try again.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    if (Object.keys(answers).length === 0) {
      alert('Please answer at least one question before submitting.');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));

      const response = await testService.submitTest({
        answers: formattedAnswers,
        category
      });

      navigate('/results', { 
        state: { 
          latestResult: response.data.result
        } 
      });
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Error submitting test. Please try again.');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading test questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2 style={{color: 'var(--error)'}}>No Questions Available</h2>
          <p className="text-gray mb-3">
            No questions found for {category}. Please contact admin.
          </p>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="container">
      {/* Header with Timer */}
      <div className="test-header">
        <div>
          <h2 style={{color: 'var(--primary)'}}>{category} Test</h2>
          <p className="text-gray">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className={`timer ${timeLeft <= 60 ? 'timer-warning' : ''}`}>
          ⏰ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
        />
      </div>

      {/* Question Card */}
      <div className="card">
        <h3 style={{marginBottom: '2rem', color: 'var(--text)'}}>
          Q{currentQuestion + 1}. {currentQ.question}
        </h3>
        
        <div>
          {currentQ.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${currentQ._id}`}
                value={index}
                checked={answers[currentQ._id] === index}
                onChange={() => handleAnswerSelect(currentQ._id, index)}
              />
              <span style={{fontSize: '1.1rem'}}>
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="card" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="btn btn-secondary"
          style={{opacity: currentQuestion === 0 ? 0.5 : 1}}
        >
          ← Previous
        </button>

        <div className="text-center">
          <p style={{fontWeight: '600', color: 'var(--primary)'}}>
            Answered: {Object.keys(answers).length}/{questions.length}
          </p>
        </div>

        {currentQuestion < questions.length - 1 ? (
          <button 
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))} 
            className="btn btn-secondary"
          >
            Next →
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className="btn btn-success"
          >
            {submitting ? 'Submitting...' : 'Submit Test ✓'}
          </button>
        )}
      </div>

      {/* Question Navigator */}
      <div className="card">
        <h4 className="mb-2">Question Navigator</h4>
        <div className="question-nav">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`question-btn ${
                index === currentQuestion ? 'active' : 
                answers[questions[index]._id] !== undefined ? 'answered' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;