import React, { useState } from 'react';
import { Briefcase, Video, FileText, Users, Trophy, BookOpen } from 'lucide-react';
import { JobPreview, Mentor } from '../types';
import { JobPreviewModal } from './JobPreviewModal';
import { MentorBookingModal } from './MentorBookingModal';
import { CVBuilder } from './CVBuilder';
import { CourseBrowser } from './CourseBrowser';
import { JobSwiper } from './JobSwiper';

const jobPreviews: JobPreview[] = [
  {
    id: '1',
    title: 'Product Manager',
    company: 'SportsTech Inc.',
    salary: '$90,000 - $120,000',
    industry: 'Technology',
    transitionTime: '6-8 months',
    description: 'Lead product development for sports analytics platforms, leveraging your unique perspective as a former athlete to create innovative solutions for sports organizations.',
    requirements: [
      'Bachelor\'s degree in Business, Technology, or related field',
      'Strong leadership and communication skills',
      'Experience with agile methodologies',
      'Understanding of sports analytics (your athletic background is a plus)',
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Lead cross-functional teams',
      'Analyze market trends and competitor products',
      'Collaborate with sports organizations to understand their needs',
    ],
  },
  {
    id: '2',
    title: 'Sports Marketing Director',
    company: 'Global Athletics',
    salary: '$85,000 - $110,000',
    industry: 'Marketing',
    transitionTime: '4-6 months',
    description: 'Drive marketing strategies for sports brands, utilizing your firsthand experience in professional sports to create authentic and engaging campaigns.',
    requirements: [
      'Marketing degree or equivalent experience',
      'Strong understanding of sports industry',
      'Digital marketing expertise',
      'Project management skills',
    ],
    responsibilities: [
      'Develop marketing strategies',
      'Manage brand partnerships',
      'Lead digital marketing campaigns',
      'Analyze market data and ROI',
    ],
  },
];

const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    title: 'Former Premier League Player, Now Tech Executive',
    company: 'TechCorp',
    industry: 'Technology',
    experience: 8,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    availability: ['Mon', 'Wed', 'Fri'],
    bio: 'After 10 years as a professional footballer, I successfully transitioned into tech leadership. I now help athletes leverage their unique skills in the corporate world.',
    expertise: ['Tech Leadership', 'Career Transition', 'Product Strategy', 'Team Management'],
    rating: 4.9,
    totalSessions: 156,
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    title: 'Ex-National Team Player, Investment Banker',
    company: 'Goldman Sachs',
    industry: 'Finance',
    experience: 6,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
    availability: ['Tue', 'Thu'],
    bio: 'Former national team player turned investment banker. I specialize in helping athletes understand and transition into the financial sector.',
    expertise: ['Investment Banking', 'Financial Analysis', 'Career Coaching', 'Networking'],
    rating: 4.8,
    totalSessions: 98,
  },
];

export function Dashboard() {
  const [selectedJob, setSelectedJob] = useState<JobPreview | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [activeTab, setActiveTab] = useState<'swiper' | 'jobs' | 'cv' | 'courses'>('swiper');

  const renderContent = () => {
    switch (activeTab) {
      case 'swiper':
        return <JobSwiper />;
      case 'cv':
        return <CVBuilder />;
      case 'courses':
        return <CourseBrowser />;
      default:
        return (
          <>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Your Career Matches</h2>
              <div className="space-y-4">
                {jobPreviews.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500 mt-2">{job.salary}</p>
                        <p className="text-sm text-gray-500">Transition Time: {job.transitionTime}</p>
                      </div>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                      >
                        <Video className="w-4 h-4" />
                        <span>View Preview</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-full" />
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.title}</p>
                        <p className="text-sm text-gray-500">{mentor.industry} • {mentor.experience} years</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMentor(mentor)}
                      className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Book Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('swiper')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'swiper'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Video className="w-5 h-5" />
          <span>Quick Match</span>
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'jobs'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Job Matches</span>
        </button>
        <button
          onClick={() => setActiveTab('cv')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'cv'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Build CV</span>
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Browse Courses</span>
        </button>
      </div>

      {renderContent()}

      {selectedJob && (
        <JobPreviewModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {selectedMentor && (
        <MentorBookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}
    </div>
  );
}