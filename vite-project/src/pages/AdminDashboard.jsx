import { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    category: 'DSA',
    difficulty: 'Medium'
  });

  const categories = ['DSA', 'OS', 'DBMS', 'CN', 'Aptitude'];

  useEffect(() => {
    if (activeTab === 'questions') {
      fetchQuestions();
    } else {
      fetchResults();
    }
  }, [activeTab]);

  const fetchQuestions = async () => {
    try {
      const response = await adminService.getAllQuestions();
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await adminService.getAllResults();
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestion) {
        await adminService.editQuestion(editingQuestion._id, formData);
      } else {
        await adminService.addQuestion(formData);
      }
      resetForm();
      fetchQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Error saving question. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await adminService.deleteQuestion(id);
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      category: question.category,
      difficulty: question.difficulty
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      category: 'DSA',
      difficulty: 'Medium'
    });
    setEditingQuestion(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4" style={{color: 'var(--primary)'}}>
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div style={{display: 'flex', marginBottom: '2rem', borderBottom: '2px solid var(--light-gray)'}}>
        <button
          onClick={() => setActiveTab('questions')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderBottom: activeTab === 'questions' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'questions' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: '600'
          }}
        >
          📝 Manage Questions
        </button>
        <button
          onClick={() => setActiveTab('results')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderBottom: activeTab === 'results' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'results' ? 'var(--primary)' : 'var(--gray)',
            fontWeight: '600'
          }}
        >
          📊 View Results
        </button>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary mb-3"
          >
            {showForm ? '✕ Cancel' : '+ Add New Question'}
          </button>

          {showForm && (
            <div className="card mb-4">
              <h3 className="mb-3" style={{color: 'var(--primary)'}}>
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Question</label>
                  <textarea
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    required
                    className="form-textarea"
                    placeholder="Enter question"
                  />
                </div>

                {formData.options.map((option, index) => (
                  <div key={index} className="form-group">
                    <label className="form-label">Option {index + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...formData.options];
                        newOptions[index] = e.target.value;
                        setFormData({...formData, options: newOptions});
                      }}
                      required
                      className="form-input"
                      placeholder={`Enter option ${index + 1}`}
                    />
                  </div>
                ))}

                <div className="grid grid-3">
                  <div className="form-group">
                    <label className="form-label">Correct Answer</label>
                    <select
                      value={formData.correctAnswer}
                      onChange={(e) => setFormData({...formData, correctAnswer: parseInt(e.target.value)})}
                      className="form-select"
                    >
                      {formData.options.map((_, index) => (
                        <option key={index} value={index}>Option {index + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="form-select"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="form-select"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-success">
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
              </form>
            </div>
          )}

          {/* Questions List */}
          <div>
            {questions.map((question) => (
              <div key={question._id} className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                  <div style={{flex: 1}}>
                    <h4 style={{marginBottom: '1rem'}}>{question.question}</h4>
                    <div style={{marginBottom: '1rem'}}>
                      {question.options.map((option, index) => (
                        <p key={index} style={{
                          padding: '0.5rem',
                          background: index === question.correctAnswer ? '#D1FAE5' : 'var(--background)',
                          borderRadius: '4px',
                          marginBottom: '0.5rem'
                        }}>
                          {String.fromCharCode(65 + index)}. {option}
                          {index === question.correctAnswer && ' ✓'}
                        </p>
                      ))}
                    </div>
                    <div style={{display: 'flex', gap: '1rem'}}>
                      <span style={{padding: '0.25rem 0.75rem', background: 'var(--secondary)', color: 'white', borderRadius: '4px', fontSize: '0.9rem'}}>
                        {question.category}
                      </span>
                      <span style={{padding: '0.25rem 0.75rem', background: 'var(--gray)', color: 'white', borderRadius: '4px', fontSize: '0.9rem'}}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button onClick={() => handleEdit(question)} className="btn btn-secondary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(question._id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div>
          <h3 className="mb-3" style={{color: 'var(--primary)'}}>
            All Student Results
          </h3>
          {results.length > 0 ? (
            <div className="card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id}>
                      <td>{result.user.name}</td>
                      <td>{result.user.email}</td>
                      <td>{result.category}</td>
                      <td>{result.score}/{result.totalQuestions}</td>
                      <td style={{
                        color: result.percentage >= 60 ? 'var(--success)' : 'var(--error)',
                        fontWeight: '600'
                      }}>
                        {result.percentage}%
                      </td>
                      <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card text-center">
              <p className="text-gray">No results available yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;