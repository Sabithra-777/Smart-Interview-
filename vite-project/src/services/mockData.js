// Mock Questions Database
export const mockQuestions = {
  DSA: [
    { _id: '1', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, category: 'DSA' },
    { _id: '2', question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Tree'], correctAnswer: 1, category: 'DSA' },
    { _id: '3', question: 'What is the worst case time complexity of Quick Sort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctAnswer: 1, category: 'DSA' },
    { _id: '4', question: 'Which traversal uses a queue?', options: ['Inorder', 'Preorder', 'Level Order', 'Postorder'], correctAnswer: 2, category: 'DSA' },
    { _id: '5', question: 'What is the space complexity of merge sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 2, category: 'DSA' },
    { _id: '6', question: 'Which data structure is used for BFS?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1, category: 'DSA' },
    { _id: '7', question: 'What is a complete binary tree?', options: ['All levels filled', 'All levels filled except last', 'Only root exists', 'Has one child'], correctAnswer: 1, category: 'DSA' },
    { _id: '8', question: 'Hash table collision is resolved by?', options: ['Chaining', 'Sorting', 'Searching', 'Indexing'], correctAnswer: 0, category: 'DSA' },
    { _id: '9', question: 'DFS uses which data structure?', options: ['Queue', 'Stack', 'Array', 'List'], correctAnswer: 1, category: 'DSA' },
    { _id: '10', question: 'Best case of bubble sort?', options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'], correctAnswer: 1, category: 'DSA' }
  ],
  OS: [
    { _id: '11', question: 'What is a process?', options: ['Program in execution', 'Program on disk', 'CPU instruction', 'Memory block'], correctAnswer: 0, category: 'OS' },
    { _id: '12', question: 'Which scheduling algorithm is non-preemptive?', options: ['Round Robin', 'FCFS', 'Priority', 'Multilevel'], correctAnswer: 1, category: 'OS' },
    { _id: '13', question: 'What causes deadlock?', options: ['Mutual exclusion', 'Hold and wait', 'No preemption', 'All of these'], correctAnswer: 3, category: 'OS' },
    { _id: '14', question: 'What is thrashing?', options: ['High paging activity', 'CPU scheduling', 'Memory allocation', 'Disk access'], correctAnswer: 0, category: 'OS' },
    { _id: '15', question: 'Which is fastest IPC?', options: ['Pipe', 'Message Queue', 'Shared Memory', 'Socket'], correctAnswer: 2, category: 'OS' },
    { _id: '16', question: 'What is a semaphore?', options: ['Synchronization tool', 'Memory unit', 'CPU register', 'Disk block'], correctAnswer: 0, category: 'OS' },
    { _id: '17', question: 'Page replacement algorithm?', options: ['FIFO', 'LRU', 'Optimal', 'All of these'], correctAnswer: 3, category: 'OS' },
    { _id: '18', question: 'What is context switching?', options: ['Switching processes', 'Switching threads', 'Switching memory', 'Switching CPU'], correctAnswer: 0, category: 'OS' },
    { _id: '19', question: 'Virtual memory uses?', options: ['RAM', 'Hard Disk', 'Cache', 'Register'], correctAnswer: 1, category: 'OS' },
    { _id: '20', question: 'Critical section problem solved by?', options: ['Mutex', 'Semaphore', 'Monitor', 'All of these'], correctAnswer: 3, category: 'OS' }
  ],
  DBMS: [
    { _id: '21', question: 'What is normalization?', options: ['Remove redundancy', 'Add redundancy', 'Delete data', 'Update data'], correctAnswer: 0, category: 'DBMS' },
    { _id: '22', question: 'ACID stands for?', options: ['Atomicity Consistency Isolation Durability', 'All Correct In Database', 'Atomic Clear Isolated Data', 'None'], correctAnswer: 0, category: 'DBMS' },
    { _id: '23', question: 'Primary key can be NULL?', options: ['Yes', 'No', 'Sometimes', 'Depends'], correctAnswer: 1, category: 'DBMS' },
    { _id: '24', question: 'Which is DDL command?', options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'], correctAnswer: 2, category: 'DBMS' },
    { _id: '25', question: 'Foreign key references?', options: ['Primary key', 'Unique key', 'Any key', 'No key'], correctAnswer: 0, category: 'DBMS' },
    { _id: '26', question: 'What is a view?', options: ['Virtual table', 'Physical table', 'Index', 'Key'], correctAnswer: 0, category: 'DBMS' },
    { _id: '27', question: 'JOIN combines?', options: ['Rows', 'Columns', 'Tables', 'Databases'], correctAnswer: 2, category: 'DBMS' },
    { _id: '28', question: 'What is indexing?', options: ['Speed up queries', 'Slow down queries', 'Delete data', 'Insert data'], correctAnswer: 0, category: 'DBMS' },
    { _id: '29', question: 'Transaction property?', options: ['ACID', 'BASE', 'CAP', 'SOLID'], correctAnswer: 0, category: 'DBMS' },
    { _id: '30', question: 'What is 3NF?', options: ['Third Normal Form', 'Three Node Form', 'Triple Null Form', 'None'], correctAnswer: 0, category: 'DBMS' }
  ],
  CN: [
    { _id: '31', question: 'OSI model has how many layers?', options: ['5', '6', '7', '8'], correctAnswer: 2, category: 'CN' },
    { _id: '32', question: 'TCP is?', options: ['Connection-oriented', 'Connectionless', 'Both', 'None'], correctAnswer: 0, category: 'CN' },
    { _id: '33', question: 'IP address size in IPv4?', options: ['16 bits', '32 bits', '64 bits', '128 bits'], correctAnswer: 1, category: 'CN' },
    { _id: '34', question: 'Which layer has routing?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 2, category: 'CN' },
    { _id: '35', question: 'HTTP uses which port?', options: ['21', '22', '80', '443'], correctAnswer: 2, category: 'CN' },
    { _id: '36', question: 'DNS converts?', options: ['Name to IP', 'IP to Name', 'Both', 'None'], correctAnswer: 0, category: 'CN' },
    { _id: '37', question: 'Which is connection-less?', options: ['TCP', 'UDP', 'FTP', 'HTTP'], correctAnswer: 1, category: 'CN' },
    { _id: '38', question: 'MAC address size?', options: ['32 bits', '48 bits', '64 bits', '128 bits'], correctAnswer: 1, category: 'CN' },
    { _id: '39', question: 'Which protocol is reliable?', options: ['UDP', 'TCP', 'IP', 'ICMP'], correctAnswer: 1, category: 'CN' },
    { _id: '40', question: 'Subnet mask for Class C?', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], correctAnswer: 2, category: 'CN' }
  ],
  Aptitude: [
    { _id: '41', question: 'If 20% of x is 40, what is x?', options: ['100', '150', '200', '250'], correctAnswer: 2, category: 'Aptitude' },
    { _id: '42', question: 'A train travels 60 km in 1 hour. Speed?', options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], correctAnswer: 1, category: 'Aptitude' },
    { _id: '43', question: 'Simple interest on 1000 at 5% for 2 years?', options: ['50', '100', '150', '200'], correctAnswer: 1, category: 'Aptitude' },
    { _id: '44', question: 'Average of 10, 20, 30?', options: ['15', '20', '25', '30'], correctAnswer: 1, category: 'Aptitude' },
    { _id: '45', question: 'If A:B = 2:3 and B:C = 4:5, then A:C?', options: ['8:15', '2:5', '3:5', '4:5'], correctAnswer: 0, category: 'Aptitude' },
    { _id: '46', question: '25% of 80 is?', options: ['15', '20', '25', '30'], correctAnswer: 1, category: 'Aptitude' },
    { _id: '47', question: 'LCM of 12 and 18?', options: ['36', '48', '54', '72'], correctAnswer: 0, category: 'Aptitude' },
    { _id: '48', question: 'HCF of 24 and 36?', options: ['6', '8', '12', '18'], correctAnswer: 2, category: 'Aptitude' },
    { _id: '49', question: 'If x + 5 = 12, x = ?', options: ['5', '6', '7', '8'], correctAnswer: 2, category: 'Aptitude' },
    { _id: '50', question: 'Square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, category: 'Aptitude' }
  ]
};

// Initialize localStorage with default data
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  if (!localStorage.getItem('results')) {
    localStorage.setItem('results', JSON.stringify([]));
  }
  if (!localStorage.getItem('questions')) {
    localStorage.setItem('questions', JSON.stringify(mockQuestions));
  }
};
