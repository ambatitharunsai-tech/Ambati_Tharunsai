import { GitHubRepoSummary, PortfolioData } from '../types/portfolio';

export const VERIFIED_GITHUB_FALLBACK_REPOS: GitHubRepoSummary[] = [
  {
    id: 101,
    name: 'edunexus-ai',
    full_name: 'ambatitharunsai-tech/edunexus-ai',
    html_url: 'https://github.com/ambatitharunsai-tech/edunexus-ai',
    description:
      'EduNexus AI — Student Success & Journey Intelligence Platform with FastAPI backend, Supabase PostgreSQL schema, and AI academic insights.',
    language: 'PLpgSQL',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-24T18:33:31Z',
    homepage: null,
    topics: ['fastapi', 'supabase', 'ai', 'education', 'analytics'],
  },
  {
    id: 102,
    name: 'EduNexusAI',
    full_name: 'ambatitharunsai-tech/EduNexusAI',
    html_url: 'https://github.com/ambatitharunsai-tech/EduNexusAI',
    description:
      'Full-stack frontend and server integration for the EduNexus AI Student Success Platform.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-24T18:35:58Z',
    homepage: null,
    topics: ['typescript', 'react', 'supabase', 'ai'],
  },
  {
    id: 103,
    name: 'safe-water-web',
    full_name: 'ambatitharunsai-tech/safe-water-web',
    html_url: 'https://github.com/ambatitharunsai-tech/safe-water-web',
    description:
      'Web platform focused on safe drinking water awareness, contamination indicators, and public health information.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-02T10:41:14Z',
    homepage: 'https://safe-water-web.onrender.com/',
    topics: ['react', 'typescript', 'tailwindcss', 'social-impact'],
  },
  {
    id: 104,
    name: '-CourseCraft',
    full_name: 'ambatitharunsai-tech/-CourseCraft',
    html_url: 'https://github.com/ambatitharunsai-tech/-CourseCraft',
    description:
      'CurricuForge / CourseCraft AI — Generative AI curriculum generator built with Python, Flask, JSON Schema validation, and ReportLab PDF synthesis.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-14T17:02:17Z',
    homepage: null,
    topics: ['python', 'flask', 'generative-ai', 'reportlab', 'json-schema'],
  },
  {
    id: 105,
    name: 'Ireagation_system',
    full_name: 'ambatitharunsai-tech/Ireagation_system',
    html_url: 'https://github.com/ambatitharunsai-tech/Ireagation_system',
    description:
      'Smart Irrigation System companion application built with Flutter, Dart, and Supabase backend telemetry.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-30T17:24:36Z',
    homepage: null,
    topics: ['flutter', 'dart', 'supabase', 'iot', 'agriculture'],
  },
  {
    id: 106,
    name: 'mini_llm',
    full_name: 'ambatitharunsai-tech/mini_llm',
    html_url: 'https://github.com/ambatitharunsai-tech/mini_llm',
    description:
      'Hema AI — 75k parameter Transformer LLM architecture featuring pretraining, Supervised Fine-Tuning (SFT), and Direct Preference Optimization (DPO) pipelines.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-05T14:57:44Z',
    homepage: null,
    topics: ['llm', 'transformer', 'sft', 'dpo', 'deep-learning'],
  },
  {
    id: 107,
    name: 'Week--10-flutter',
    full_name: 'ambatitharunsai-tech/Week--10-flutter',
    html_url: 'https://github.com/ambatitharunsai-tech/Week--10-flutter',
    description: 'Progressive mobile application development module in Flutter and Dart.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-11T09:01:54Z',
    homepage: null,
    topics: ['flutter', 'mobile-development'],
  },
  {
    id: 108,
    name: 'ambatitharunsai-tech',
    full_name: 'ambatitharunsai-tech/ambatitharunsai-tech',
    html_url: 'https://github.com/ambatitharunsai-tech/ambatitharunsai-tech',
    description: 'Developer profile configuration and technical documentation.',
    language: 'Markdown',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-03-06T12:52:11Z',
    homepage: null,
    topics: ['profile'],
  },
];

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    fullName: 'Ambati Tharun Sai',
    headline: 'Software Developer | AI & ML Enthusiast | Full-Stack Developer | Innovator',
    heroHeadline: 'Building Intelligent Solutions. Creating Digital Impact.',
    heroSubheadline:
      'I develop software applications, AI-powered solutions and modern digital experiences.',
    typingRoles: [
      'Software Developer',
      'AI/ML Enthusiast',
      'Full-Stack Developer',
      'Problem Solver',
    ],
    introParagraphs: [
      'I am Ambati Tharun Sai, a Computer Science student passionate about software engineering, artificial intelligence, machine learning and modern web and mobile application development.',
      'I enjoy transforming ideas into functional applications by combining programming, intelligent technologies, databases and user-focused design.',
      'My interests include AI-powered applications, automation, backend engineering, mobile development, data-driven platforms and solving real-world problems through technology.',
    ],
    location: 'Andhra Pradesh, India',
    regionDetail: 'Narasaraopet, Andhra Pradesh, India',
    githubUrl: 'https://github.com/ambatitharunsai-tech',
    githubUsername: 'ambatitharunsai-tech',
    linkedinUrl: '',
    email: '',
    phone: '',
    availabilityStatus: 'Status Configurable in Studio Editor',
    portraitUrl: 'https://avatars.githubusercontent.com/u/236998948?v=4',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/236998948?v=4',
    resumePdfDataUrl: '',
    resumeFileName: 'Ambati_Tharun_Sai_Resume.pdf',
    lastUpdated: '2026-11-05',
  },

  aboutPassions: [
    {
      title: 'Software Engineering',
      summary:
        'Architecting modular, maintainable codebases with clean separation of concerns across frontend interfaces and backend logic.',
    },
    {
      title: 'Artificial Intelligence & LLMs',
      summary:
        'Integrating Large Language Models, Groq API inference, Ollama local models, and structured JSON output pipelines into real-world workflows.',
    },
    {
      title: 'Machine Learning & NLP',
      summary:
        'Applying TF-IDF vectorization, Sentence Transformers, semantic similarity, and predictive analytics to extract insights from raw datasets.',
    },
    {
      title: 'Full-Stack Web Development',
      summary:
        'Building responsive web platforms using React, modern JavaScript/TypeScript, HTML5/CSS3, Python (Flask, FastAPI), and Node.js/Express.',
    },
    {
      title: 'Mobile Application Development',
      summary:
        'Creating cross-platform mobile experiences and companion IoT/telemetry apps using Flutter, Dart, and native Android capabilities.',
    },
    {
      title: 'Backend Systems & REST APIs',
      summary:
        'Designing resilient RESTful APIs, authentication layers, and asynchronous data processing services in FastAPI, Flask, and Express.js.',
    },
    {
      title: 'Database Management',
      summary:
        'Modeling relational and document schemas across PostgreSQL, Supabase, MySQL, SQLite, and MongoDB with data integrity and query optimization.',
    },
    {
      title: 'Intelligent Automation',
      summary:
        'Automating repetitive academic, agricultural, and document generation tasks through programmatic pipelines and ReportLab PDF synthesis.',
    },
    {
      title: 'Innovative Problem-Solving',
      summary:
        'Approaching every technical challenge across the complete lifecycle—from problem identification and system design to testing and deployment.',
    },
  ],

  lifecycleStages: [
    {
      step: '01',
      title: 'Problem Identification',
      detail:
        'Analyzing real-world friction in education, agriculture, public health, and device security to define clear engineering requirements.',
    },
    {
      step: '02',
      title: 'System & Data Architecture',
      detail:
        'Structuring database schemas (Supabase, PostgreSQL, SQLite), REST API contracts, and AI prompt/schema boundaries before writing implementation code.',
    },
    {
      step: '03',
      title: 'Full-Stack & AI Implementation',
      detail:
        'Developing responsive React or Flutter frontends paired with FastAPI/Flask backends and deterministic LLM/NLP inference pipelines.',
    },
    {
      step: '04',
      title: 'Validation, Testing & Deployment',
      detail:
        'Verifying API endpoints with Postman and automated test suites, containerizing workflows, and deploying live services on Render.',
    },
  ],

  timeline: [
    {
      id: 'tl-1',
      category: 'Education',
      title: 'Undergraduate Studies in Computer Science',
      organization: 'Institution configurable in Studio Editor',
      period: 'Current Student',
      description:
        'Pursuing Computer Science coursework with core focus on Data Structures, Algorithms, Database Management Systems, Operating Systems, Software Engineering, and Artificial Intelligence.',
      verified: true,
    },
    {
      id: 'tl-2',
      category: 'Projects',
      title: 'EduNexus AI & CourseCraft AI (CurricuForge) Development',
      organization: 'GitHub · ambatitharunsai-tech',
      period: '2026',
      description:
        'Engineered AI-powered academic platforms combining Python, FastAPI, Flask, Supabase PostgreSQL, JSON Schema validation, and automated PDF curriculum synthesis.',
      verified: true,
    },
    {
      id: 'tl-3',
      category: 'Projects',
      title: 'Safe Drinking Water Web & Smart Irrigation IoT Systems',
      organization: 'Live Deployment on Render & GitHub',
      period: '2026',
      description:
        'Built and deployed the Safe Drinking Water awareness platform on Render alongside a Flutter + Supabase Smart Irrigation telemetry application.',
      verified: true,
    },
    {
      id: 'tl-4',
      category: 'Technical Journey',
      title: 'Mini LLM (Hema AI) & Groq API Inference Exploration',
      organization: 'AI & NLP Engineering',
      period: '2026',
      description:
        'Explored 75k-parameter Transformer pretraining, SFT, and DPO pipelines alongside low-latency conversational AI systems powered by Groq API and LangChain.',
      verified: true,
    },
    {
      id: 'tl-5',
      category: 'Hackathons',
      title: 'HacXLerate 2026 Hackathon',
      organization: 'Hackathon Participation Record',
      period: '2026',
      description:
        'Participated in HacXLerate 2026. Specific team details, project submission, and verified certificates can be updated directly via the Studio Editor.',
      verified: true,
    },
  ],

  skillGroups: [
    {
      id: 'sk-lang',
      category: 'Programming Languages',
      description: 'Core systems, algorithmic, and application programming languages.',
      skills: ['Python', 'C', 'Java', 'JavaScript', 'SQL'],
    },
    {
      id: 'sk-front',
      category: 'Frontend Development',
      description: 'Modern component architecture and responsive user interface engineering.',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Web Design'],
    },
    {
      id: 'sk-back',
      category: 'Backend Development',
      description: 'High-performance server frameworks and RESTful API architecture.',
      skills: ['Flask', 'FastAPI', 'Node.js', 'Express.js', 'REST APIs'],
    },
    {
      id: 'sk-mobile',
      category: 'Mobile Development',
      description: 'Cross-platform mobile applications and hardware telemetry integration.',
      skills: ['Flutter', 'Dart', 'Android development'],
    },
    {
      id: 'sk-db',
      category: 'Databases',
      description: 'Relational SQL engines, cloud Backend-as-a-Service, and NoSQL stores.',
      skills: ['MySQL', 'SQLite', 'Supabase', 'PostgreSQL', 'MongoDB'],
    },
    {
      id: 'sk-ai',
      category: 'Artificial Intelligence',
      description: 'Generative AI orchestration, local & cloud LLM inference, and semantic NLP.',
      skills: [
        'Generative AI',
        'Large Language Models',
        'Natural Language Processing',
        'Ollama',
        'Groq API',
        'LangChain',
        'Sentence Transformers',
        'AI integrations',
        'Prompt engineering',
      ],
    },
    {
      id: 'sk-data',
      category: 'Data and Libraries',
      description: 'Numerical computing, tabular data manipulation, and feature extraction.',
      skills: ['Pandas', 'NumPy', 'TF-IDF', 'Machine Learning fundamentals'],
    },
    {
      id: 'sk-tools',
      category: 'Developer Tools',
      description: 'Version control, containerization, API testing, and cloud deployment.',
      skills: [
        'Git',
        'GitHub',
        'Docker',
        'VS Code',
        'Postman',
        'Render',
        'XAMPP',
        'Linux/macOS terminal',
      ],
    },
  ],

  projects: [
    {
      id: 'edunexus-ai',
      title: 'EduNexus AI',
      subtitle: 'AI-Powered Student Success & Journey Intelligence Platform',
      category: 'AI & LLM Systems',
      status: 'Completed',
      description:
        'An intelligent student success platform designed to help educational institutions understand student performance, identify at-risk students, and generate actionable academic insights.',
      problemSolved:
        'Educational institutions often track attendance, grades, and engagement in fragmented silos, delaying intervention for at-risk students until after academic performance drops.',
      architectureOverview:
        'Combines a Python FastAPI backend and Supabase PostgreSQL relational schema (PLpgSQL procedures and structured telemetry tables) with a TypeScript/React analytical interface and privacy-conscious LLM insight synthesis.',
      features: [
        'Unified student information and academic profile aggregation',
        'Composite Student Success Score calculation across attendance and assessments',
        'Automated at-risk student identification and early-warning flags',
        'Interactive academic analytics and cohort performance dashboards',
        'AI-powered personalized student insights and intervention recommendations',
        'Modular RESTful backend API integration with automated test coverage',
        'Privacy-conscious AI processing that anonymizes sensitive student identifiers',
      ],
      technologies: [
        'Python',
        'FastAPI',
        'AI/LLM Integration',
        'Supabase',
        'PostgreSQL',
        'TypeScript',
        'React',
      ],
      githubUrl: 'https://github.com/ambatitharunsai-tech/edunexus-ai',
      secondaryGithubUrl: 'https://github.com/ambatitharunsai-tech/EduNexusAI',
      previewImage: '/src/assets/images/edunexus_architecture_visual_1793945504742.jpg',
      updatedAt: '2026-10-24',
      highlightMetric: 'FastAPI + Supabase + AI Analytics',
      nodeIndex: 0,
    },
    {
      id: 'lost-phone-finder',
      title: 'LostPhoneFinder',
      subtitle: 'Cross-Platform Device Telemetry & Location Recovery Platform',
      category: 'Mobile & IoT',
      status: 'Prototype',
      description:
        'A device recovery platform designed to help users monitor their registered devices using real-time telemetry, battery diagnostics, and GPS location reporting.',
      problemSolved:
        'When mobile devices are misplaced or lost, users need a lightweight, authenticated telemetry bridge that reports last-known GPS coordinates, battery health, and online status before the battery depletes.',
      architectureOverview:
        'Pairs a Flutter & Dart companion mobile client that collects hardware telemetry and GPS coordinates with a Python Flask REST API backend backed by SQLite persistence and Google Maps geospatial rendering.',
      features: [
        'Secure device registration and unique hardware identifier binding',
        'Periodic device telemetry transmission (network state, motion status)',
        'Real-time battery level and power-saving state reporting',
        'High-accuracy GPS location reporting and coordinate history logs',
        'Interactive Google Maps integration for visualizing device paths',
        'Live device status tracking (Active, Idle, Offline Alert)',
        'Cross-platform Flutter companion application',
        'Lightweight Flask backend REST APIs with SQLite storage',
      ],
      technologies: [
        'Flutter',
        'Dart',
        'Python',
        'Flask',
        'REST APIs',
        'Google Maps',
        'SQLite',
      ],
      githubUrl: 'https://github.com/ambatitharunsai-tech',
      previewImage: '/src/assets/images/lostphone_telemetry_visual_1793945506422.jpg',
      updatedAt: '2026-10-15',
      highlightMetric: 'Flutter + Flask + GPS Telemetry',
      nodeIndex: 1,
    },
    {
      id: 'curricuforge',
      title: 'CurricuForge / CourseCraft AI',
      subtitle: 'Generative AI Structured Curriculum & PDF Learning Plan Engine',
      category: 'AI & LLM Systems',
      status: 'Completed',
      description:
        'An AI-powered curriculum generation platform (published on GitHub as -CourseCraft) that synthesizes structured, multi-week learning curricula based on user-defined topics, skill levels, and timelines.',
      problemSolved:
        'Self-learners and educators spend hours piecing together fragmented tutorials without a coherent syllabus, milestone progression, or printable study guide.',
      architectureOverview:
        'Built with Python and Flask (`app.py`), utilizing strict `schema.json` validation to constrain Generative AI outputs into deterministic JSON trees, which are then rendered both in an interactive web UI and compiled into downloadable PDF syllabi via ReportLab.',
      features: [
        'User-defined learning topics, target proficiency level, and duration inputs',
        'Structured multi-module curriculum generation with clear learning objectives',
        'Deterministic JSON-based output validated against `schema.json`',
        'Multi-model Generative AI integration with automatic error recovery',
        'Automated programmatic PDF generation using ReportLab',
        'Downloadable and shareable learning plans with session history',
      ],
      technologies: [
        'Python',
        'Flask',
        'Generative AI',
        'JSON Schema',
        'ReportLab',
        'HTML5/CSS3',
        'JavaScript',
      ],
      githubUrl: 'https://github.com/ambatitharunsai-tech/-CourseCraft',
      previewImage: '/src/assets/images/curricuforge_ai_visual_1793945508544.jpg',
      updatedAt: '2026-10-14',
      highlightMetric: 'Flask + JSON Schema + ReportLab PDF',
      nodeIndex: 2,
    },
    {
      id: 'safe-drinking-water-web',
      title: 'Safe Drinking Water Web',
      subtitle: 'Public Health & Drinking Water Safety Awareness Platform',
      category: 'Social Impact',
      status: 'Live Production',
      description:
        'A live web platform focused on safe drinking water awareness, water quality indicators, filtration education, and actionable community guidance for safe consumption.',
      problemSolved:
        'Communities frequently lack accessible, clearly structured digital resources explaining water quality parameters (TDS, pH, microbial risks), household purification methods, and waterborne disease prevention.',
      architectureOverview:
        'Engineered as a responsive TypeScript, React, Vite, and Tailwind CSS web application with modular educational sections and backend support, deployed to production on Render.',
      features: [
        'Interactive drinking water quality and safety parameter guides',
        'Educational breakdowns of common contaminants and filtration standards',
        'Community awareness modules for rural and urban water safety',
        'Responsive glassmorphic UI optimized for mobile and desktop access',
        'Live cloud deployment hosted on Render for immediate public access',
      ],
      technologies: [
        'TypeScript',
        'React',
        'Vite',
        'Tailwind CSS',
        'Node.js',
        'Render',
      ],
      githubUrl: 'https://github.com/ambatitharunsai-tech/safe-water-web',
      liveUrl: 'https://safe-water-web.onrender.com/',
      updatedAt: '2026-11-02',
      highlightMetric: 'Live on Render · Public Health Web App',
      nodeIndex: 3,
    },
    {
      id: 'agrinova',
      title: 'AGRINOVA',
      subtitle: 'Intelligent Agriculture & Farmer Support Platform Concept',
      category: 'Mobile & IoT',
      status: 'Concept',
      description:
        'An intelligent agriculture platform concept designed to empower farmers with AI-assisted crop diagnostics, real-time environmental telemetry, and market intelligence.',
      problemSolved:
        'Smallholder farmers face unpredictable weather shifts, delayed crop disease detection, and opaque market pricing without unified mobile decision-support tools.',
      architectureOverview:
        'Designed around a Flutter cross-platform mobile interface connected to Supabase real-time tables, integrating vision/AI inference endpoints for leaf disease classification and IoT sensor feeds for precision irrigation.',
      features: [
        'Planned: AI crop disease detection from mobile leaf photography',
        'Planned: Live localized weather forecasting and agricultural advisories',
        'Planned: Seasonal crop lifecycle and fertilizer schedule management',
        'Planned: Real-time regional agricultural market price tracking',
        'Planned: Smart irrigation scheduling linked to soil moisture thresholds',
      ],
      technologies: ['Flutter', 'Dart', 'Supabase', 'AI Integration', 'IoT Architecture'],
      githubUrl: 'https://github.com/ambatitharunsai-tech',
      previewImage: '/src/assets/images/agrinova_iot_visual_1793945508612.jpg',
      updatedAt: '2026-10-30',
      highlightMetric: 'Smart Agriculture Concept · AI + IoT',
      nodeIndex: 4,
    },
    {
      id: 'smart-irrigation-system',
      title: 'Smart Irrigation System',
      subtitle: 'Flutter & Supabase Automated Irrigation Monitoring System',
      category: 'Mobile & IoT',
      status: 'Completed',
      description:
        'A cross-platform smart irrigation monitoring and control application (`Ireagation_system` on GitHub) built with Flutter, Dart, and Supabase to streamline agricultural water management.',
      problemSolved:
        'Manual field irrigation often results in water wastage or crop stress due to lack of remote visibility into soil moisture levels and pump states.',
      architectureOverview:
        'Implemented using Flutter (`lib/`, multi-platform Android, iOS, and Web targets) integrated with a Supabase PostgreSQL backend (`supabase/`) for real-time sensor state synchronization and pump control.',
      features: [
        'Real-time soil moisture and environmental sensor telemetry dashboard',
        'Remote irrigation valve and pump state monitoring',
        'Supabase cloud database synchronization with custom SQL rules',
        'Cross-platform Flutter UI supporting Android, iOS, and Web viewports',
        'Automated threshold alerts for dry-soil and over-watering conditions',
      ],
      technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'IoT Telemetry'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/Ireagation_system',
      previewImage: '/src/assets/images/agrinova_iot_visual_1793945508612.jpg',
      updatedAt: '2026-10-30',
      highlightMetric: 'Verified GitHub Repo · Flutter + Supabase',
      nodeIndex: 5,
    },
    {
      id: 'ticket-generator-system',
      title: 'Ticket Generator System',
      subtitle: 'Automated Event & Service Ticket Issuance Workflow',
      category: 'Full-Stack & Web',
      status: 'Completed',
      description:
        'A software development project focused on generating structured digital tickets with unique reference identifiers, validation metadata, and clean printable/downloadable layouts.',
      problemSolved:
        'Manual ticket issuance for campus events, workshops, and service queues is error-prone and lacks verifiable serial tracking.',
      architectureOverview:
        'Combines form validation, deterministic ticket ID generation, database persistence, and structured document rendering for rapid ticket creation and verification.',
      features: [
        'Automated unique ticket ID and serial code generation',
        'Attendee / requester metadata validation and record persistence',
        'Formatted digital ticket rendering for instant download or printing',
        'Status lookup and duplicate-submission prevention',
      ],
      technologies: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'SQLite'],
      githubUrl: 'https://github.com/ambatitharunsai-tech',
      updatedAt: '2026-09-20',
      highlightMetric: 'Automated Ticket Synthesis & Validation',
      nodeIndex: 6,
    },
    {
      id: 'groq-api-chatbot',
      title: 'Groq API Chatbot & Mini LLM (Hema AI)',
      subtitle: 'Ultra-Low-Latency Conversational AI & Custom Transformer Pipeline',
      category: 'AI & LLM Systems',
      status: 'Completed',
      description:
        'Conversational AI engineering encompassing both high-speed cloud LLM chatbots using the Groq API and custom 75k-parameter Transformer LLM experimentation (`mini_llm` / Hema AI on GitHub).',
      problemSolved:
        'Standard LLM integrations often suffer from high time-to-first-token latency and opaque model behavior; combining Groq LPU inference with hands-on Transformer architecture training bridges practical deployment and foundational AI theory.',
      architectureOverview:
        'Integrates Groq API endpoints with structured system prompts, multi-turn conversation memory, and streaming/fast response handling alongside a full TypeScript/Node `mini_llm` pipeline implementing pretraining, Supervised Fine-Tuning (SFT), and Direct Preference Optimization (DPO).',
      features: [
        'Ultra-fast conversational inference powered by Groq API and open-weight LLMs',
        'Multi-turn context management and domain-specific system prompt engineering',
        'Custom 75k-parameter Transformer (`mini_llm` / Hema AI) with pretraining, SFT, and DPO stages',
        'Clean interactive chat interface with code formatting and error resilience',
      ],
      technologies: [
        'Groq API',
        'Large Language Models',
        'Python',
        'TypeScript',
        'Prompt Engineering',
        'LangChain',
        'REST APIs',
      ],
      githubUrl: 'https://github.com/ambatitharunsai-tech/mini_llm',
      updatedAt: '2026-11-05',
      highlightMetric: 'Groq LPU Inference + 75k Transformer LLM',
      nodeIndex: 7,
    },
  ],

  innovations: [
    {
      id: 'inn-1',
      index: '01',
      title: 'AI-Powered Curriculum Generation',
      domain: 'Generative AI · Structured Knowledge Synthesis',
      problem:
        'Unstructured LLM text outputs are difficult to render into consistent, multi-week academic syllabi or formatted PDF documents without hallucinated fields.',
      approach:
        'Enforced strict JSON Schema validation (`schema.json`) over Generative AI outputs in Python/Flask, coupling the validated JSON tree directly to a programmatic ReportLab PDF typesetter.',
      technologies: ['Python', 'Flask', 'Generative AI', 'JSON Schema', 'ReportLab'],
      applications: [
        'Self-paced technical bootcamps and personalized study roadmaps',
        'Automated faculty syllabus drafting and workshop preparation',
      ],
    },
    {
      id: 'inn-2',
      index: '02',
      title: 'Student Performance Analytics & AI Insights',
      domain: 'Educational Data Science · Decision Intelligence',
      problem:
        'Raw academic records (attendance percentages, midterm scores, lab completions) rarely surface actionable early-warning signals for educators in time to help struggling students.',
      approach:
        'Engineered a composite Student Success Score in PostgreSQL/Supabase and FastAPI that aggregates multi-dimensional academic indicators and feeds anonymized summaries into an LLM advisory pipeline.',
      technologies: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'PLpgSQL', 'LLMs'],
      applications: [
        'University student retention and academic advising platforms',
        'Cohort-level bottleneck detection across engineering departments',
      ],
    },
    {
      id: 'inn-3',
      index: '03',
      title: 'Device Telemetry & Location-Based Recovery',
      domain: 'Mobile Systems · Geospatial Tracking',
      problem:
        'Recovering lost mobile hardware requires reliable background telemetry that pairs GPS coordinate streams with battery depletion awareness.',
      approach:
        'Designed a Flutter/Dart mobile client that dispatches periodic location and battery packets to a Flask + SQLite REST service with interactive Google Maps visualization.',
      technologies: ['Flutter', 'Dart', 'Flask', 'REST APIs', 'Google Maps', 'SQLite'],
      applications: [
        'Personal mobile device recovery and family safety monitoring',
        'Campus equipment and field-asset telemetry tracking',
      ],
    },
    {
      id: 'inn-4',
      index: '04',
      title: 'AI-Assisted Agricultural Solutions',
      domain: 'Smart Agriculture · IoT & Mobile Telemetry',
      problem:
        'Resource-constrained farmers need accessible mobile tools that unify soil irrigation control, weather awareness, and crop health diagnostics.',
      approach:
        'Developed cross-platform Flutter interfaces backed by Supabase real-time state (`Ireagation_system`) and architected the AGRINOVA concept for AI leaf disease classification.',
      technologies: ['Flutter', 'Dart', 'Supabase', 'IoT Sensors', 'AI Vision Concepts'],
      applications: [
        'Precision drip-irrigation scheduling and water conservation',
        'Early crop disease triage for rural agricultural communities',
      ],
    },
    {
      id: 'inn-5',
      index: '05',
      title: 'Intelligent Chatbots & Custom Transformer Pipelines',
      domain: 'Large Language Models · High-Speed Inference',
      problem:
        'Building responsive AI assistants requires both low-latency inference orchestration and a deep understanding of underlying Transformer attention, SFT, and alignment mechanics.',
      approach:
        'Implemented Groq API conversational agents with structured prompt engineering while building `mini_llm` (Hema AI)—a 75k-parameter Transformer with pretraining, SFT, and DPO pipelines.',
      technologies: ['Groq API', 'TypeScript', 'Python', 'LangChain', 'Transformer Architecture'],
      applications: [
        'Low-latency technical support and documentation assistants',
        'Domain-aligned compact language models for edge workflows',
      ],
    },
    {
      id: 'inn-6',
      index: '06',
      title: 'NLP & Semantic Search Experimentation',
      domain: 'Natural Language Processing · Vector Retrieval',
      problem:
        'Keyword-only search fails to match user intent when querying educational materials, project documentation, or domain knowledge bases.',
      approach:
        'Experimented with TF-IDF weighting, Sentence Transformers embeddings, and cosine similarity ranking using Pandas and NumPy to retrieve semantically related passages.',
      technologies: ['Python', 'Sentence Transformers', 'TF-IDF', 'NumPy', 'Pandas'],
      applications: [
        'Semantic academic resource discovery and FAQ matching',
        'Automated resume-to-job-description relevance analysis',
      ],
    },
    {
      id: 'inn-7',
      index: '07',
      title: 'Personal AI Assistant Development',
      domain: 'Local & Cloud AI Orchestration',
      problem:
        'Developers need privacy-respecting, customizable AI assistants capable of running locally via Ollama or scaling via cloud LLM APIs for task automation.',
      approach:
        'Combined local Ollama model runners and cloud LLM endpoints with modular Python/REST wrappers to handle summarization, code explanation, and task routing.',
      technologies: ['Ollama', 'Python', 'Groq API', 'LangChain', 'Prompt Engineering'],
      applications: [
        'Offline-capable developer productivity and code review assistants',
        'Automated study-note synthesis and technical Q&A workflows',
      ],
    },
    {
      id: 'inn-8',
      index: '08',
      title: 'Automation & Backend API Engineering',
      domain: 'Backend Architecture · Systems Integration',
      problem:
        'Frontend applications and mobile clients require dependable, well-documented backend APIs that handle validation, database transactions, and file generation cleanly.',
      approach:
        'Standardized backend services around FastAPI, Flask, and Express.js with modular routing, SQL/Supabase persistence, Postman-verified contracts, and Render cloud deployment.',
      technologies: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'PostgreSQL', 'Render'],
      applications: [
        'Scalable microservices for web and Flutter mobile applications',
        'Automated PDF report and digital ticket generation pipelines',
      ],
    },
  ],

  hackathons: [
    {
      id: 'hack-hacxlerate-2026',
      eventName: 'HacXLerate 2026 Hackathon',
      organizer: 'HacXLerate 2026',
      date: '2026',
      participationDetails:
        'Verified hackathon participation record. Add specific track, problem statement, and sprint details via the Studio Editor.',
      teamInfo: 'Editable in Studio Editor (Add team name and member roles)',
      projectDeveloped: 'Editable in Studio Editor (Link or describe the hackathon prototype)',
      outcome: 'Verified Participation (Update in Studio Editor if additional official results are added)',
      certificateUrl: '',
      eventPhotos: [],
      verified: true,
    },
  ],

  achievements: [
    {
      id: 'ach-github-portfolio',
      category: 'Technical Milestone',
      title: '17+ Public Engineering Repositories & Full-Stack AI Prototypes',
      organization: 'GitHub (ambatitharunsai-tech)',
      date: '2025 – 2026',
      description:
        'Designed, built, and open-sourced multiple software systems across Generative AI (-CourseCraft / CurricuForge), Student Analytics (EduNexus AI), Custom LLM Pipelines (mini_llm), Smart Agriculture (Ireagation_system), and Public Health Web (safe-water-web).',
      verificationUrl: 'https://github.com/ambatitharunsai-tech',
      verified: true,
    },
    {
      id: 'ach-live-render-deploy',
      category: 'Project Recognition',
      title: 'Production Deployment of Safe Drinking Water Web Platform',
      organization: 'Render Cloud & GitHub',
      date: '2026',
      description:
        'Successfully deployed and maintained the Safe Drinking Water awareness web application in live cloud production.',
      verificationUrl: 'https://safe-water-web.onrender.com/',
      verified: true,
    },
  ],

  certificates: [],

  education: {
    degree: 'Bachelor of Technology / Undergraduate in Computer Science (Editable in Studio)',
    branch: 'Computer Science & Engineering',
    institution: 'Add College / University Name in Studio Editor',
    location: 'Andhra Pradesh, India',
    startYear: 'Add Start Year',
    graduationYear: 'Add Graduation Year',
    cgpa: 'Add Verified CGPA',
    academicAchievements: [
      'Active builder of practical AI/ML, Python backend, and Flutter mobile applications alongside core Computer Science studies.',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java, Python)',
      'Database Management Systems (SQL, PostgreSQL)',
      'Artificial Intelligence & Machine Learning Fundamentals',
      'Web & Mobile Application Development',
      'Computer Networks & Operating Systems',
    ],
  },

  experiences: [
    {
      id: 'exp-open-source',
      type: 'Open-Source Contribution',
      role: 'Independent Software & AI Developer',
      organization: 'GitHub · ambatitharunsai-tech',
      period: '2025 – Present',
      description:
        'Developing and maintaining public repositories spanning Python (FastAPI, Flask), TypeScript/React web platforms, Flutter/Dart mobile applications, and compact Transformer LLM pipelines.',
      technologies: ['Python', 'FastAPI', 'Flask', 'TypeScript', 'React', 'Flutter', 'Supabase'],
      verificationLink: 'https://github.com/ambatitharunsai-tech',
    },
  ],
};
