import React from 'react';
import { X, PlayCircle, BookmarkPlus, BriefcaseIcon, Clock, Building2 } from 'lucide-react';
import { JobPreview } from '../types';

interface JobPreviewModalProps {
  job: JobPreview;
  onClose: () => void;
}

export function JobPreviewModal({ job, onClose }: JobPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <BriefcaseIcon className="w-5 h-5" />
                <span>{job.industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Transition: {job.transitionTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span>{job.salary}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700">
                <PlayCircle className="w-5 h-5" />
                <span>Watch AI Preview</span>
              </button>
              <button className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50">
                <BookmarkPlus className="w-5 h-5" />
                <span>Save Job</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t p-6 bg-gray-50">
          <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}