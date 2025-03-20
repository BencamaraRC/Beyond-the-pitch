export interface User {
  id: string;
  name: string;
  email: string;
  formerClub?: string;
  position?: string;
  interests: string[];
  skills: string[];
}

export interface JobPreview {
  id: string;
  title: string;
  company: string;
  salary: string;
  industry: string;
  transitionTime: string;
  description: string;
  videoUrl?: string;
  requirements: string[];
  responsibilities: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  experience: number;
  imageUrl: string;
  availability: string[];
  bio: string;
  expertise: string[];
  rating: number;
  totalSessions: number;
}

export interface TimeSlot {
  id: string;
  day: string;
  time: string;
  available: boolean;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type?: 'open' | 'multiple-choice';
  options?: {
    text: string;
    score: Partial<{
      leadership: number;
      teamwork: number;
      problemSolving: number;
      communication: number;
      adaptability: number;
    }>;
  }[];
}

export interface AssessmentResult {
  leadership: number;
  teamwork: number;
  problemSolving: number;
  communication: number;
  adaptability: number;
}

export interface CVSection {
  id: string;
  title: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  description: string;
  imageUrl: string;
  price: string;
  rating: number;
  enrolled: number;
  skills: string[];
}

export interface Message {
  id: string;
  type: 'bot' | 'user' | 'multiple-choice';
  content: string;
  options?: string[];
}