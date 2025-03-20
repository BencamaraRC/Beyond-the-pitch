import React, { useState } from 'react';
import { Search, Star, Users, Clock, ExternalLink } from 'lucide-react';
import type { Course } from '../types';

const courses: Course[] = [
  {
    id: '1',
    title: 'Business Management Fundamentals',
    provider: 'Harvard Business School Online',
    duration: '8 weeks',
    level: 'Beginner',
    description: 'Learn essential business concepts and management skills to transition into a business leadership role.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
    price: '$1,500',
    rating: 4.8,
    enrolled: 1250,
    skills: ['Leadership', 'Strategy', 'Finance', 'Operations']
  },
  {
    id: '2',
    title: 'Sports Marketing & Brand Management',
    provider: 'Northwestern University',
    duration: '12 weeks',
    level: 'Intermediate',
    description: 'Master the principles of sports marketing and learn how to build powerful brands in the sports industry.',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    price: '$2,000',
    rating: 4.7,
    enrolled: 850,
    skills: ['Marketing', 'Branding', 'Digital Media', 'Analytics']
  },
  {
    id: '3',
    title: 'Tech Product Management',
    provider: 'Stanford Online',
    duration: '10 weeks',
    level: 'Advanced',
    description: 'Learn to lead product development teams and create successful tech products from concept to launch.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    price: '$1,800',
    rating: 4.9,
    enrolled: 975,
    skills: ['Product Strategy', 'Agile', 'User Experience', 'Tech Leadership']
  }
];

export function CourseBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recommended Courses</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="border rounded-lg overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1 text-sm">{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="ml-1 text-sm">{course.enrolled} enrolled</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="ml-1 text-sm">{course.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">{course.price}</span>
                <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  <span>Enroll</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}