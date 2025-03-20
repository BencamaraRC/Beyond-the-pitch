import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { Play, X, Heart, ChevronLeft, ChevronRight, GraduationCap, Clock, DollarSign } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  educationTime: string;
  description: string;
  imageUrl: string;
  requirements: string[];
}

const jobs: Job[] = [
  {
    id: '1',
    title: 'Product Manager',
    company: 'SportsTech Inc.',
    salary: '$90,000 - $120,000',
    educationTime: '6 months bootcamp',
    description: 'Lead product development for sports analytics platforms. Perfect for athletes with strategic mindset.',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80',
    requirements: ['Leadership skills', 'Strategic thinking', 'Tech interest', 'Communication skills']
  },
  {
    id: '2',
    title: 'Sports Marketing Director',
    company: 'Global Athletics',
    salary: '$85,000 - $110,000',
    educationTime: '4 months certification',
    description: 'Drive marketing strategies for sports brands using your firsthand industry experience.',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    requirements: ['Sports background', 'Marketing interest', 'Creative thinking', 'Project management']
  },
  {
    id: '3',
    title: 'Tech Sales Executive',
    company: 'TechFit Solutions',
    salary: '$75,000 - $100,000 + Commission',
    educationTime: '3 months training',
    description: 'Leverage your competitive spirit and people skills in high-stakes tech sales.',
    imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=600&q=80',
    requirements: ['People skills', 'Competitive drive', 'Quick learning', 'Negotiation skills']
  }
];

export function JobSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gone] = useState(() => new Set());
  const [showAIPreview, setShowAIPreview] = useState(false);

  const [props, api] = useSprings(jobs.length, i => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
    delay: i * 100,
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    
    if (!down && trigger) {
      gone.add(index);
      if (dir === 1) {
        // Swiped right - save job
        console.log('Saved job:', jobs[index].title);
      }
    }
    
    api.start(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
  });

  const handleNext = () => {
    if (currentIndex < jobs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative h-[600px] w-full max-w-md mx-auto">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          style={{
            transform: x.to(x => `translate3d(${x}px,0,0)`),
            position: 'absolute',
            width: '100%',
            height: '100%',
            willChange: 'transform',
            display: i === currentIndex ? 'block' : 'none',
          }}
        >
          <animated.div
            {...bind(i)}
            style={{
              transform: rot.to(r => `rotate(${r}deg)`),
              scale: scale.to(s => s),
              touchAction: 'none',
            }}
            className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="relative h-64">
              <img
                src={jobs[i].imageUrl}
                alt={jobs[i].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">{jobs[i].title}</h2>
                <p className="text-white/90">{jobs[i].company}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{jobs[i].salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <span>{jobs[i].educationTime}</span>
                </div>
              </div>

              <p className="text-gray-600">{jobs[i].description}</p>

              <div className="flex flex-wrap gap-2">
                {jobs[i].requirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {req}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowAIPreview(true)}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700"
              >
                <Play className="w-5 h-5" />
                <span>Watch AI Job Preview</span>
              </button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
              <button
                onClick={() => {
                  gone.add(i);
                  api.start(i => ({
                    x: -500,
                    rot: -10,
                    scale: 0.9,
                    delay: undefined,
                  }));
                }}
                className="p-4 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  gone.add(i);
                  api.start(i => ({
                    x: 500,
                    rot: 10,
                    scale: 0.9,
                    delay: undefined,
                  }));
                }}
                className="p-4 bg-green-500 rounded-full text-white shadow-lg hover:bg-green-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </animated.div>
        </animated.div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-800 shadow-md hover:bg-gray-50'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === jobs.length - 1}
          className={`p-2 rounded-full ${
            currentIndex === jobs.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-800 shadow-md hover:bg-gray-50'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {showAIPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-bold mb-4">AI Job Preview</h3>
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-6">
              AI-generated preview is being prepared. This feature will show a day-in-the-life
              simulation of the role, including key responsibilities, work environment, and required skills.
            </p>
            <button
              onClick={() => setShowAIPreview(false)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}