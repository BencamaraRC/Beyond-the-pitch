import React, { useState } from 'react';
import { X, Calendar, Star, Users, Trophy } from 'lucide-react';
import { Mentor, TimeSlot } from '../types';

interface MentorBookingModalProps {
  mentor: Mentor;
  onClose: () => void;
}

const timeSlots: TimeSlot[] = [
  { id: '1', day: 'Monday', time: '10:00 AM', available: true },
  { id: '2', day: 'Monday', time: '2:00 PM', available: true },
  { id: '3', day: 'Wednesday', time: '11:00 AM', available: true },
  { id: '4', day: 'Wednesday', time: '3:00 PM', available: false },
  { id: '5', day: 'Friday', time: '1:00 PM', available: true },
];

export function MentorBookingModal({ mentor, onClose }: MentorBookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img src={mentor.imageUrl} alt={mentor.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold">{mentor.name}</h2>
                <p className="text-gray-600">{mentor.title}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-lg">
              <Star className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">{mentor.rating}</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">{mentor.totalSessions}+</p>
                <p className="text-sm text-gray-600">Sessions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-indigo-50 p-4 rounded-lg">
              <Trophy className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-semibold">{mentor.experience} Years</p>
                <p className="text-sm text-gray-600">Experience</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <p className="text-gray-600">{mentor.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                      selectedSlot === slot.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : slot.available
                        ? 'border-gray-200 hover:border-indigo-600'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <div className="text-left">
                      <p className="font-medium">{slot.day}</p>
                      <p className="text-sm text-gray-600">{slot.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-6 bg-gray-50">
          <button
            disabled={!selectedSlot}
            className={`w-full px-6 py-3 rounded-lg font-semibold ${
              selectedSlot
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
}