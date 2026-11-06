import { GitHubRepoSummary, PortfolioData } from '../types/portfolio';
import agrinovaVisual from '../assets/images/agrinova_iot_visual_1793945508612.jpg';
import curricuforgeVisual from '../assets/images/curricuforge_ai_visual_1793945508544.jpg';
import edunexusVisual from '../assets/images/edunexus_architecture_visual_1793945504742.jpg';
import lostphoneVisual from '../assets/images/lostphone_telemetry_visual_1793945506422.jpg';

export const BUNDLED_PROJECT_IMAGES: Record<string, string> = {
  'edunexus-ai': edunexusVisual,
  'smart-irrigation-system': agrinovaVisual,
  curricuforge: curricuforgeVisual,
  'lost-phone-finder': lostphoneVisual,
  agrinova: agrinovaVisual,
};

export const VERIFIED_GITHUB_FALLBACK_REPOS: GitHubRepoSummary[] = [
  {
    id: 101,
    name: 'edunexus-ai',
    full_name: 'ambatitharunsai-tech/edunexus-ai',
    html_url: 'https://github.com/ambatitharunsai-tech/edunexus-ai',
    description:
      'EduNexus AI — Smart Campus Analytics, student success analytics, academic & placement risk indicators, and student journey tracking.',
    language: 'PLpgSQL',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-24T18:33:31Z',
    homepage: null,
    topics: ['fastapi', 'supabase', 'ai', 'education', 'analytics'],
  },
  {
    id: 102,
    name: 'safe-water-web',
    full_name: 'ambatitharunsai-tech/safe-water-web',
    html_url: 'https://github.com/ambatitharunsai-tech/safe-water-web',
    description:
      'Safe Drinking Water Web — Water awareness platform with hydration tracker, safety checklist, and community alerts.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-02T10:41:14Z',
    homepage: 'https://safe-water-web.onrender.com/',
    topics: ['react', 'typescript', 'tailwindcss', 'social-impact'],
  },
  {
    id: 103,
    name: 'Ireagation_system',
    full_name: 'ambatitharunsai-tech/Ireagation_system',
    html_url: 'https://github.com/ambatitharunsai-tech/Ireagation_system',
    description:
      'Ireagation System — Smart agriculture application featuring IoT-based irrigation, crop management, weather integration, and AI agronomist.',
    language: 'Dart',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-30T17:24:36Z',
    homepage: null,
    topics: ['flutter', 'dart', 'supabase', 'iot', 'agriculture'],
  },
  {
    id: 104,
    name: '-CourseCraft',
    full_name: 'ambatitharunsai-tech/-CourseCraft',
    html_url: 'https://github.com/ambatitharunsai-tech/-CourseCraft',
    description:
      'CourseCraft AI — AI-powered learning curriculum generator with personalized learning paths and PDF/Markdown exports.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-14T17:02:17Z',
    homepage: 'https://coursecraft-e1jx.onrender.com/',
    topics: ['python', 'flask', 'generative-ai', 'reportlab', 'json-schema'],
  },
  {
    id: 105,
    name: 'mini_llm',
    full_name: 'ambatitharunsai-tech/mini_llm',
    html_url: 'https://github.com/ambatitharunsai-tech/mini_llm',
    description:
      'Hema AI — NLP-based intelligent assistant featuring semantic search, intent classification, document analysis, and custom Transformer LLM pipelines.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-05T14:57:44Z',
    homepage: null,
    topics: ['llm', 'nlp', 'semantic-search', 'intent-classification', 'transformer'],
  },
  {
    id: 106,
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
    headline: 'Full-Stack Developer | AI Enthusiast | Software Developer',
    heroHeadline: "Hi, I'm Ambati Tharun Sai.",
    heroSubheadline:
      'Computer Science engineering student and software developer building full-stack applications, AI-powered systems, mobile apps, and cloud-deployed digital solutions.',
    typingRoles: [
      'Full-Stack Developer',
      'AI Enthusiast',
      'Software Developer',
      'Machine Learning & NLP Builder',
    ],
    introParagraphs: [
      'I am Ambati Tharun Sai, a Computer Science engineering student from Andhra Pradesh, India, passionate about full-stack development, artificial intelligence, machine learning, NLP, and mobile application development.',
      'I enjoy transforming complex real-world problems into production-ready software by combining clean frontend interfaces, resilient Python and Node.js backend APIs, relational and cloud databases, and modern LLM integrations.',
      'My work spans smart campus analytics, generative AI curriculum engines, public health web platforms, IoT-enabled smart irrigation apps, and custom NLP assistants deployed to the cloud.',
    ],
    location: 'Andhra Pradesh, India',
    regionDetail: 'Narasaraopet, Andhra Pradesh, India',
    githubUrl: 'https://github.com/ambatitharunsai-tech',
    githubUsername: 'ambatitharunsai-tech',
    linkedinUrl: 'https://www.linkedin.com/in/tharun-sai-ambati-452249428/',
    email: 'ambatitharunsai@gmail.com',
    phone: '',
    availabilityStatus: 'Open to Software Engineering & AI Internships / Projects',
    portraitUrl: 'https://avatars.githubusercontent.com/u/236998948?v=4',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/236998948?v=4',
    resumePdfDataUrl: '',
    resumeFileName: 'Ambati_Tharun_Sai_Resume.pdf',
    lastUpdated: '2026-11-06',
  },

  aboutPassions: [
    {
      title: 'Full-Stack Development',
      summary:
        'Architecting responsive React & TypeScript web applications backed by modular Python (FastAPI, Flask) and Node.js/Express REST APIs.',
    },
    {
      title: 'Artificial Intelligence',
      summary:
        'Integrating Large Language Models, Generative AI pipelines, Ollama local models, and ultra-low-latency Groq inference into practical applications.',
    },
    {
      title: 'Machine Learning & NLP',
      summary:
        'Building semantic search, intent classification, document analysis, and predictive analytics pipelines using NLP and vector embeddings.',
    },
    {
      title: 'Mobile Application Development',
      summary:
        'Developing cross-platform mobile applications and IoT companion interfaces using Flutter and Dart with real-time cloud synchronization.',
    },
    {
      title: 'Cloud Deployment & DevOps',
      summary:
        'Containerizing services with Docker, managing Git/GitHub workflows, and deploying production web apps and APIs on Render and Supabase.',
    },
    {
      title: 'Algorithmic Problem Solving',
      summary:
        'Taking ownership of the full engineering lifecycle—from identifying real-world bottlenecks and schema design to testing and cloud delivery.',
    },
  ],

  lifecycleStages: [
    {
      step: '01',
      title: 'Problem Discovery & Architecture',
      detail:
        'Identifying high-impact problems in education, public health, and agriculture and designing clean database and API contracts.',
    },
    {
      step: '02',
      title: 'Full-Stack & Mobile Engineering',
      detail:
        'Building responsive React/TypeScript web interfaces and Flutter/Dart mobile apps backed by FastAPI, Flask, and Express services.',
    },
    {
      step: '03',
      title: 'AI, LLM & NLP Integration',
      detail:
        'Embedding semantic search, intent classification, Groq/Ollama LLM inference, and schema-validated generative pipelines.',
    },
    {
      step: '04',
      title: 'Testing & Cloud Deployment',
      detail:
        'Validating endpoints, containerizing workloads with Docker, and shipping live production builds to Render and Supabase.',
    },
  ],

  timeline: [
    {
      id: 'tl-1',
      category: 'Education',
      title: 'Undergraduate Studies in Computer Science & Engineering',
      organization: 'Institution configurable in Studio Editor',
      period: 'Current Student',
      description:
        'Pursuing Computer Science & Engineering coursework with focus on Data Structures, Algorithms, DBMS, Operating Systems, Software Engineering, and Artificial Intelligence.',
      verified: true,
    },
    {
      id: 'tl-2',
      category: 'Projects',
      title: 'CourseCraft AI & Safe Drinking Water Web — Live Cloud Deployments',
      organization: 'Render Cloud & GitHub (ambatitharunsai-tech)',
      period: '2026',
      description:
        'Engineered and deployed CourseCraft AI (https://coursecraft-e1jx.onrender.com/) and Safe Drinking Water Web (https://safe-water-web.onrender.com/) to live production on Render.',
      verified: true,
    },
    {
      id: 'tl-3',
      category: 'Projects',
      title: 'EduNexus AI, Ireagation System & Hema AI Development',
      organization: 'GitHub · ambatitharunsai-tech',
      period: '2026',
      description:
        'Built EduNexus AI smart campus analytics, the Flutter-based Ireagation System for smart agriculture, and Hema AI for NLP semantic search and document analysis.',
      verified: true,
    },
    {
      id: 'tl-4',
      category: 'Hackathons',
      title: 'HacXLerate 2026 & Technical Sprints',
      organization: 'Hackathon Participation Record',
      period: '2026',
      description:
        'Participated in HacXLerate 2026. Specific team details, project submission, and verified certificates can be updated at any time via the Studio Editor.',
      verified: true,
    },
  ],

  skillGroups: [
    {
      id: 'sk-front',
      category: 'Frontend',
      description: 'Modern component architecture, type-safe state management, and responsive UI design.',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    },
    {
      id: 'sk-back',
      category: 'Backend',
      description: 'Scalable server frameworks, asynchronous REST APIs, and microservice orchestration.',
      skills: ['Python', 'Flask', 'FastAPI', 'Node.js', 'Express'],
    },
    {
      id: 'sk-mobile',
      category: 'Mobile',
      description: 'Cross-platform mobile application development and IoT hardware telemetry.',
      skills: ['Flutter', 'Dart'],
    },
    {
      id: 'sk-db',
      category: 'Databases',
      description: 'Relational SQL engines, cloud Backend-as-a-Service, and managed document stores.',
      skills: ['MySQL', 'SQLite', 'MongoDB Atlas', 'Supabase', 'PostgreSQL'],
    },
    {
      id: 'sk-ai',
      category: 'AI',
      description: 'Large Language Model orchestration, semantic NLP, and local/cloud inference.',
      skills: ['LLM integration', 'NLP', 'Ollama', 'Groq', 'Generative AI'],
    },
    {
      id: 'sk-tools',
      category: 'Tools',
      description: 'Version control, containerization, cloud hosting, and developer workflow tooling.',
      skills: ['Git', 'GitHub', 'Docker', 'Render', 'VS Code'],
    },
  ],

  projects: [
    {
      id: 'edunexus-ai',
      title: 'EduNexus AI',
      subtitle: 'Smart Campus Analytics & Student Journey Intelligence Platform',
      category: 'AI & LLM Systems',
      status: 'Completed',
      description:
        'Smart Campus Analytics platform engineered for student success analytics, academic and placement risk indicators, and end-to-end student journey tracking.',
      problemSolved:
        'Educational institutions often track attendance, grades, and placement readiness in disconnected silos, delaying timely support for at-risk students.',
      architectureOverview:
        'Combines a Python FastAPI backend and Supabase PostgreSQL relational schema with a TypeScript/React analytics dashboard and AI-driven risk indicator synthesis.',
      features: [
        'Smart Campus Analytics across cohorts and departments',
        'Student success analytics and composite performance scoring',
        'Automated academic and placement risk indicators',
        'End-to-end longitudinal student journey tracking',
        'AI-generated intervention insights with FastAPI and Supabase',
      ],
      technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI Analytics'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/edunexus-ai',
      secondaryGithubUrl: 'https://github.com/ambatitharunsai-tech/EduNexusAI',
      previewImage: edunexusVisual,
      updatedAt: '2026-10-24',
      highlightMetric: 'Smart Campus & Student Success Analytics',
      nodeIndex: 0,
    },
    {
      id: 'safe-drinking-water-web',
      title: 'Safe Drinking Water Web',
      subtitle: 'Water Awareness Platform, Hydration Tracker & Community Alerts',
      category: 'Social Impact',
      status: 'Live Production',
      description:
        'A live water awareness platform featuring an interactive hydration tracker, drinking water safety checklist, and real-time community alerts.',
      problemSolved:
        'Communities frequently lack an accessible web platform that combines daily hydration tracking with actionable water safety checklists and contamination alerts.',
      architectureOverview:
        'Built with React, TypeScript, Vite, and Tailwind CSS, featuring interactive hydration and safety checklist modules and deployed live on Render.',
      features: [
        'Comprehensive drinking water awareness and quality education platform',
        'Interactive daily hydration tracker and goal monitoring',
        'Actionable household water safety and filtration checklist',
        'Community water quality and safety alerts',
        'Live production deployment hosted on Render',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Render'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/safe-water-web',
      liveUrl: 'https://safe-water-web.onrender.com/',
      updatedAt: '2026-11-02',
      highlightMetric: 'Live on Render · Hydration & Safety Platform',
      nodeIndex: 1,
    },
    {
      id: 'smart-irrigation-system',
      title: 'Ireagation System',
      subtitle: 'Smart Agriculture, IoT Irrigation & AI Agronomist Application',
      category: 'Mobile & IoT',
      status: 'Completed',
      description:
        'Smart agriculture application combining IoT-based irrigation monitoring, crop lifecycle management, live weather integration, and an AI agronomist assistant.',
      problemSolved:
        'Manual irrigation and fragmented weather tracking lead to water inefficiency and delayed crop care decisions for farmers.',
      architectureOverview:
        'Developed as a cross-platform Flutter & Dart application integrated with Supabase PostgreSQL real-time telemetry, weather APIs, and AI agronomist advisory workflows.',
      features: [
        'Smart agriculture application for precision field management',
        'IoT-based soil moisture and automated irrigation control',
        'Seasonal crop management and growth stage tracking',
        'Real-time localized weather integration and watering forecasts',
        'AI agronomist assistant for crop health and irrigation guidance',
      ],
      technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'IoT', 'AI Agronomist'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/Ireagation_system',
      previewImage: agrinovaVisual,
      updatedAt: '2026-10-30',
      highlightMetric: 'Smart Agriculture · Flutter + IoT + AI',
      nodeIndex: 2,
    },
    {
      id: 'curricuforge',
      title: 'CourseCraft AI',
      subtitle: 'AI-Powered Learning Curriculum Generator with PDF & Markdown Exports',
      category: 'AI & LLM Systems',
      status: 'Live Production',
      description:
        'An AI-powered learning curriculum generator that creates personalized multi-week learning paths with one-click PDF and Markdown exports.',
      problemSolved:
        'Learners and educators spend hours assembling scattered tutorials without a structured syllabus, milestone progression, or portable study guide.',
      architectureOverview:
        'Engineered with Python, Flask, and Generative AI constrained by JSON Schema validation, featuring automated ReportLab PDF synthesis, Markdown export, and live cloud deployment on Render.',
      features: [
        'AI-powered learning curriculum generator tailored to any topic',
        'Personalized learning paths adapted to skill level and timeline',
        'Instant PDF and Markdown curriculum exports',
        'Deterministic JSON Schema validation for structured module breakdowns',
        'Live production deployment accessible on Render',
      ],
      technologies: ['Python', 'Flask', 'Generative AI', 'JSON Schema', 'ReportLab PDF', 'Markdown', 'Render'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/-CourseCraft',
      liveUrl: 'https://coursecraft-e1jx.onrender.com/',
      previewImage: curricuforgeVisual,
      updatedAt: '2026-10-14',
      highlightMetric: 'Live on Render · AI Curriculum + PDF/MD Export',
      nodeIndex: 3,
    },
    {
      id: 'hema-ai',
      title: 'Hema AI',
      subtitle: 'NLP-Based Intelligent Assistant for Semantic Search & Document Analysis',
      category: 'AI & LLM Systems',
      status: 'Completed',
      description:
        'An NLP-based intelligent assistant featuring semantic search, automated intent classification, document analysis, and custom Transformer LLM experimentation.',
      problemSolved:
        'Keyword-only search and rigid rule-based bots fail to capture user intent or extract structured answers from complex technical documents.',
      architectureOverview:
        'Combines NLP vector embeddings for semantic search, supervised intent classification, and document analysis pipelines alongside a custom Transformer architecture (`mini_llm` on GitHub).',
      features: [
        'NLP-based intelligent assistant for natural language queries',
        'Vector-based semantic search across knowledge bases',
        'Real-time user intent classification and routing',
        'Automated document analysis and key passage extraction',
        'Custom Transformer pretraining, SFT, and DPO pipeline architecture',
      ],
      technologies: ['NLP', 'LLM Integration', 'TypeScript', 'Python', 'Semantic Search', 'Transformer'],
      githubUrl: 'https://github.com/ambatitharunsai-tech/mini_llm',
      updatedAt: '2026-11-05',
      highlightMetric: 'NLP Assistant · Semantic Search & Intent AI',
      nodeIndex: 4,
    },
    {
      id: 'lost-phone-finder',
      title: 'LostPhoneFinder',
      subtitle: 'Cross-Platform Device Telemetry & Location Recovery Platform',
      category: 'Mobile & IoT',
      status: 'Prototype',
      description:
        'A device recovery platform designed to help users monitor registered devices using real-time telemetry, battery diagnostics, and GPS location reporting.',
      problemSolved:
        'When mobile devices are misplaced, users need a lightweight telemetry bridge that reports last-known GPS coordinates and battery health.',
      architectureOverview:
        'Pairs a Flutter & Dart mobile client that collects hardware telemetry and GPS coordinates with a Python Flask REST API backend and SQLite persistence.',
      features: [
        'Secure device registration and unique hardware identifier binding',
        'Real-time battery level and power-saving state reporting',
        'High-accuracy GPS location reporting and coordinate history logs',
        'Interactive Google Maps integration for visualizing device paths',
      ],
      technologies: ['Flutter', 'Dart', 'Python', 'Flask', 'REST APIs', 'Google Maps', 'SQLite'],
      githubUrl: 'https://github.com/ambatitharunsai-tech',
      previewImage: lostphoneVisual,
      updatedAt: '2026-10-15',
      highlightMetric: 'Flutter + Flask + GPS Telemetry',
      nodeIndex: 5,
    },
  ],

  innovations: [
    {
      id: 'inn-1',
      index: '01',
      title: 'AI-Powered Curriculum Generation (CourseCraft AI)',
      domain: 'Generative AI · Structured Knowledge Synthesis',
      problem:
        'Unstructured LLM text outputs are difficult to render into consistent, multi-week academic syllabi or formatted PDF/Markdown documents.',
      approach:
        'Enforced strict JSON Schema validation over Generative AI outputs in Python/Flask, coupling the validated structure directly to PDF and Markdown exporters deployed on Render.',
      technologies: ['Python', 'Flask', 'Generative AI', 'JSON Schema', 'ReportLab', 'Render'],
      applications: [
        'Personalized self-paced learning paths and technical roadmaps',
        'Automated syllabus drafting with instant PDF and Markdown downloads',
      ],
    },
    {
      id: 'inn-2',
      index: '02',
      title: 'Smart Campus & Student Success Analytics (EduNexus AI)',
      domain: 'Educational Data Science · Decision Intelligence',
      problem:
        'Raw academic records rarely surface actionable early-warning signals for educators in time to support at-risk students.',
      approach:
        'Engineered a composite Student Success Score and academic/placement risk indicators in PostgreSQL/Supabase and FastAPI with longitudinal student journey tracking.',
      technologies: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'React', 'TypeScript'],
      applications: [
        'Smart campus analytics and student retention dashboards',
        'Early identification of academic and placement risk factors',
      ],
    },
    {
      id: 'inn-3',
      index: '03',
      title: 'NLP Semantic Search & Document Intelligence (Hema AI)',
      domain: 'Natural Language Processing · Custom LLM Systems',
      problem:
        'Keyword matching fails to understand user intent or synthesize insights across multi-document repositories.',
      approach:
        'Implemented semantic vector retrieval, intent classification, and document analysis pipelines paired with custom Transformer SFT/DPO experimentation.',
      technologies: ['NLP', 'LLM Integration', 'Semantic Search', 'TypeScript', 'Python', 'Groq'],
      applications: [
        'Intelligent document analysis and semantic Q&A assistants',
        'Automated intent classification for developer and academic workflows',
      ],
    },
    {
      id: 'inn-4',
      index: '04',
      title: 'IoT Smart Irrigation & AI Agronomist (Ireagation System)',
      domain: 'Smart Agriculture · Flutter & Cloud Telemetry',
      problem:
        'Farmers need unified mobile tools that combine real-time soil irrigation control, weather forecasting, and AI crop guidance.',
      approach:
        'Built a cross-platform Flutter application backed by Supabase real-time telemetry, weather integration, and AI agronomist decision support.',
      technologies: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'IoT'],
      applications: [
        'Automated drip-irrigation scheduling and water conservation',
        'Weather-informed crop management and AI agronomy advisories',
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
      outcome: 'Verified Participation (Update in Studio Editor when official results/certificates are added)',
      certificateUrl: '',
      eventPhotos: [],
      verified: true,
    },
  ],

  achievements: [
    {
      id: 'ach-live-deployments',
      category: 'Project Recognition',
      title: 'Live Cloud Production Deployments on Render (CourseCraft AI & Safe Water Web)',
      organization: 'Render Cloud & GitHub',
      date: '2026',
      description:
        'Architected, built, and deployed CourseCraft AI (https://coursecraft-e1jx.onrender.com/) and Safe Drinking Water Web (https://safe-water-web.onrender.com/) as public cloud applications.',
      verificationUrl: 'https://coursecraft-e1jx.onrender.com/',
      verified: true,
    },
    {
      id: 'ach-github-portfolio',
      category: 'Technical Milestone',
      title: 'Open-Source Full-Stack, AI & Mobile Engineering Portfolio',
      organization: 'GitHub (ambatitharunsai-tech)',
      date: '2025 – 2026',
      description:
        'Developed public software systems spanning EduNexus AI, CourseCraft AI, Ireagation System, Safe Drinking Water Web, and Hema AI (mini_llm).',
      verificationUrl: 'https://github.com/ambatitharunsai-tech',
      verified: true,
    },
  ],

  certificates: [],

  education: {
    degree: 'Bachelor of Technology in Computer Science & Engineering (Editable in Studio)',
    branch: 'Computer Science & Engineering',
    institution: 'Add College / University Name in Studio Editor',
    location: 'Andhra Pradesh, India',
    startYear: 'Add Start Year',
    graduationYear: 'Add Graduation Year',
    cgpa: 'Add Verified CGPA',
    academicAchievements: [
      'Active builder of full-stack web applications, AI/NLP systems, and Flutter mobile apps alongside core Computer Science engineering studies.',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems (SQL, PostgreSQL)',
      'Artificial Intelligence & Machine Learning',
      'Full-Stack Web & Mobile Application Development',
      'Computer Networks & Operating Systems',
    ],
  },

  experiences: [
    {
      id: 'exp-open-source',
      type: 'Open-Source Contribution',
      role: 'Full-Stack & AI Software Developer',
      organization: 'GitHub · ambatitharunsai-tech',
      period: '2025 – Present',
      description:
        'Designing, building, and deploying full-stack web apps, AI curriculum generators, NLP assistants, and Flutter IoT mobile applications on GitHub and Render.',
      technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'Flask', 'Flutter', 'Supabase', 'Docker', 'Render'],
      verificationLink: 'https://github.com/ambatitharunsai-tech',
    },
  ],
};
