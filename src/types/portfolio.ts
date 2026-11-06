export type ProjectStatus = 'Live Production' | 'Completed' | 'Prototype' | 'Concept' | 'Work in Progress';

export type ProjectCategory =
  | 'AI & LLM Systems'
  | 'Full-Stack & Web'
  | 'Mobile & IoT'
  | 'Social Impact';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  description: string;
  problemSolved: string;
  architectureOverview: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  secondaryGithubUrl?: string;
  liveUrl?: string;
  previewImage?: string;
  updatedAt?: string;
  highlightMetric?: string;
  nodeIndex?: number; // Links to 3D neural core orbital node
}

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: string[];
}

export interface InnovationItem {
  id: string;
  index: string;
  title: string;
  domain: string;
  problem: string;
  approach: string;
  technologies: string[];
  applications: string[];
}

export interface TimelineEntry {
  id: string;
  category: 'Education' | 'Technical Journey' | 'Projects' | 'Hackathons' | 'Certifications' | 'Milestones';
  title: string;
  organization: string;
  period: string;
  description: string;
  verified: boolean;
}

export interface HackathonEntry {
  id: string;
  eventName: string;
  organizer: string;
  date: string;
  participationDetails: string;
  teamInfo: string;
  projectDeveloped: string;
  outcome: string;
  certificateUrl?: string;
  eventPhotos: string[];
  verified: boolean;
}

export interface AchievementEntry {
  id: string;
  category:
    | 'Academic'
    | 'Hackathon'
    | 'Coding Competition'
    | 'Project Recognition'
    | 'Technical Milestone'
    | 'Certification'
    | 'Workshop'
    | 'Leadership'
    | 'Community';
  title: string;
  organization: string;
  date: string;
  description: string;
  certificateImage?: string;
  verificationUrl?: string;
  verified: boolean;
}

export type CertificateCategory =
  | 'Programming'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Web Development'
  | 'Cloud and Databases'
  | 'Hackathons'
  | 'Workshops'
  | 'Other';

export type CertificateFileFormat = 'PDF' | 'PNG' | 'JPG' | 'SVG' | 'WEBP';

export interface CertificateEntry {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  relatedSkill: string;
  category: CertificateCategory;
  previewUrl?: string;
  fileFormat?: CertificateFileFormat;
  folderPath?: string;
  fileName?: string;
  fileSize?: string;
  description?: string;
}

export interface EducationProfile {
  degree: string;
  branch: string;
  institution: string;
  location: string;
  startYear: string;
  graduationYear: string;
  cgpa: string;
  academicAchievements: string[];
  coursework: string[];
}

export interface ExperienceEntry {
  id: string;
  type:
    | 'Internship'
    | 'Freelance'
    | 'Technical Volunteering'
    | 'College Activity'
    | 'Team Collaboration'
    | 'Leadership'
    | 'Technical Community'
    | 'Open-Source Contribution';
  role: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
  verificationLink?: string;
}

export interface GitHubRepoSummary {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
  topics: string[];
}

export interface PersonalProfile {
  fullName: string;
  headline: string;
  heroHeadline: string;
  heroSubheadline: string;
  typingRoles: string[];
  introParagraphs: string[];
  location: string;
  regionDetail: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  availabilityStatus: string;
  portraitUrl: string;
  profileImageUrl: string;
  resumePdfDataUrl: string;
  resumeFileName: string;
  lastUpdated: string;
}

export interface PortfolioData {
  profile: PersonalProfile;
  aboutPassions: { title: string; summary: string }[];
  lifecycleStages: { step: string; title: string; detail: string }[];
  timeline: TimelineEntry[];
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  innovations: InnovationItem[];
  hackathons: HackathonEntry[];
  achievements: AchievementEntry[];
  certificates: CertificateEntry[];
  education: EducationProfile;
  experiences: ExperienceEntry[];
}
