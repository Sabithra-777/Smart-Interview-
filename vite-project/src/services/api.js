import { mockQuestions, initializeLocalStorage } from './mockData';

initializeLocalStorage();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  register: async (userData) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === userData.email)) {
      throw { response: { data: { message: 'Email already exists' } } };
    }
    const user = { ...userData, _id: Date.now().toString() };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    const token = 'mock_token_' + Date.now();
    return { data: { token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } } };
  },
  login: async (userData) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === userData.email && u.password === userData.password);
    if (!user) {
      throw { response: { data: { message: 'Invalid credentials' } } };
    }
    const token = 'mock_token_' + Date.now();
    return { data: { token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } } };
  }
};

export const testService = {
  getQuestions: async (category) => {
    await delay(500);
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    const categoryQuestions = questions[category] || [];
    return { data: { questions: categoryQuestions.slice(0, 10), timeLimit: 600 } };
  },
  submitTest: async (testData) => {
    await delay(500);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    const categoryQuestions = questions[testData.category] || [];
    
    let score = 0;
    testData.answers.forEach(ans => {
      const q = categoryQuestions.find(q => q._id === ans.questionId);
      if (q && q.correctAnswer === ans.selectedAnswer) score++;
    });
    
    const result = {
      _id: Date.now().toString(),
      userId: user._id,
      category: testData.category,
      score,
      totalQuestions: testData.answers.length,
      percentage: (score / testData.answers.length * 100).toFixed(2),
      date: new Date().toISOString()
    };
    
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
    return { data: { result } };
  },
  getResults: async () => {
    await delay(300);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const userResults = results.filter(r => r.userId === user._id).map(r => ({
      ...r,
      createdAt: r.date
    }));
    return { data: { results: userResults } };
  },
  getAnalytics: async () => {
    await delay(300);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const userResults = results.filter(r => r.userId === user._id);
    
    const topicPerformance = {};
    const scoreHistory = [];
    
    userResults.forEach(r => {
      if (!topicPerformance[r.category]) {
        topicPerformance[r.category] = { totalTests: 0, totalScore: 0, bestScore: 0 };
      }
      topicPerformance[r.category].totalTests++;
      topicPerformance[r.category].totalScore += parseFloat(r.percentage);
      topicPerformance[r.category].bestScore = Math.max(topicPerformance[r.category].bestScore, parseFloat(r.percentage));
      
      scoreHistory.push({ category: r.category, score: parseFloat(r.percentage), date: r.date });
    });
    
    Object.keys(topicPerformance).forEach(cat => {
      topicPerformance[cat].averageScore = (topicPerformance[cat].totalScore / topicPerformance[cat].totalTests).toFixed(2);
    });
    
    const weaknesses = Object.keys(topicPerformance)
      .filter(cat => topicPerformance[cat].averageScore < 60)
      .map(cat => ({
        topic: cat,
        averageScore: topicPerformance[cat].averageScore,
        testsAttempted: topicPerformance[cat].totalTests
      }));
    
    const totalScore = Object.values(topicPerformance).reduce((sum, t) => sum + parseFloat(t.averageScore), 0);
    const overallAverage = Object.keys(topicPerformance).length > 0 
      ? (totalScore / Object.keys(topicPerformance).length).toFixed(2) 
      : 0;
    
    return { 
      data: { 
        analytics: {
          totalTests: userResults.length,
          overallAverage,
          topicPerformance,
          scoreHistory: scoreHistory.reverse(),
          weaknesses
        }
      } 
    };
  }
};

export const adminService = {
  addQuestion: async (questionData) => {
    await delay(500);
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    const newQuestion = { ...questionData, _id: Date.now().toString() };
    if (!questions[questionData.category]) questions[questionData.category] = [];
    questions[questionData.category].push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));
    return { data: { question: newQuestion } };
  },
  getAllQuestions: async () => {
    await delay(300);
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    const allQuestions = Object.values(questions).flat();
    return { data: { questions: allQuestions } };
  },
  editQuestion: async (id, questionData) => {
    await delay(500);
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    Object.keys(questions).forEach(cat => {
      const index = questions[cat].findIndex(q => q._id === id);
      if (index !== -1) questions[cat][index] = { ...questionData, _id: id };
    });
    localStorage.setItem('questions', JSON.stringify(questions));
    return { data: { question: questionData } };
  },
  deleteQuestion: async (id) => {
    await delay(500);
    const questions = JSON.parse(localStorage.getItem('questions') || '{}');
    Object.keys(questions).forEach(cat => {
      questions[cat] = questions[cat].filter(q => q._id !== id);
    });
    localStorage.setItem('questions', JSON.stringify(questions));
    return { data: { message: 'Deleted' } };
  },
  getAllResults: async () => {
    await delay(300);
    const results = JSON.parse(localStorage.getItem('results') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const resultsWithUsers = results.map(r => {
      const user = users.find(u => u._id === r.userId);
      return {
        ...r,
        user: { name: user?.name || 'Unknown', email: user?.email || 'N/A' },
        createdAt: r.date
      };
    });
    return { data: { results: resultsWithUsers } };
  }
};