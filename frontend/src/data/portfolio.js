// ── Single source of truth — synced from Adi-cv.pdf ──────────────────────

export const personal = {
  name: 'Aditya Dash',
  role: 'Full-Stack Developer',
  tagline: 'Building real-world web applications with clean code, modern interfaces, and scalable backend systems.',
  location: 'Bhubaneswar, India',
  email: 'adityadash05@gmail.com',
  phone: '+91 8260540773',
  github: 'https://github.com/adi0tya',
  linkedin: 'https://www.linkedin.com/in/aditya-dash-421748311',
}

export const about = {
  summary: `BCA second-year student passionate about full-stack web development. Experienced in building responsive web applications and developing backend systems using modern technologies. Interested in creating collaborative platforms and scalable web solutions while continuously improving programming and problem-solving skills.`,
  focus: [
    'Full-Stack Web Development',
    'Responsive UI Engineering',
    'Backend Systems & REST APIs',
    'Collaborative Platform Architecture',
    'Scalable Web Applications',
  ],
  strengths: ['Problem Solving', 'Fast Learner', 'Time Management', 'Leadership'],
}

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'Birla Global University',
  location: 'Bhubaneswar',
  expected: '2027',
  year: '2nd Year',
  coursework: ['Data Structures', 'Database Management Systems', 'Web Development'],
}

export const skills = {
  Frontend:  ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  Backend:   ['Node.js', 'Express.js'],
  Databases: ['MongoDB', 'MySQL'],
  Languages: ['Python', 'C'],
  Tools:     ['Git', 'GitHub', 'VS Code', 'REST APIs'],
}

export const projects = [
  {
    id: 'syncspace',
    name: 'SyncSpace',
    tagline: 'Collaborative Study Platform',
    description:
      'A full-stack web application that enables students to join virtual study rooms and collaborate in real time. Implemented user authentication, study room management, real-time chat, voice calls, and file sharing along with a Pomodoro focus timer and study leaderboard.',
    problem:
      'Students lacked a unified platform for remote collaboration that combined communication, file sharing, and productivity tools without switching between multiple apps.',
    features: [
      'User authentication & management',
      'Study room creation & management',
      'Real-time group chat',
      'Voice calls',
      'File sharing',
      'Pomodoro focus timer',
      'Study leaderboard',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/adi0tya',
    live: null,
    highlight: true,
  },
  {
    id: 'api-generator',
    name: 'API Generator',
    tagline: 'No-Code Backend & API Testing Platform',
    description:
      'A modern full-stack API Generator that allows users to create dynamic REST APIs without writing backend code. It provides an intuitive interface to define schemas, generate endpoints instantly, and test APIs in real-time using a built-in API tester.',
    problem:
      'Developers needed a fast way to scaffold and test REST APIs without setting up a full backend from scratch every time.',
    features: [
      'Dynamic API generation without backend coding',
      'Built-in API Tester (Postman-like experience)',
      'Automatic REST endpoint creation',
      'Schema-based data modeling',
      'Real-time request & response handling',
      'MongoDB-backed data persistence',
    ],
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'Node.js', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/adi0tya/api-generator',
    live: null,
    highlight: true,
  },
]
