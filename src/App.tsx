import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Assessment } from './components/Assessment';
import type { AssessmentResult } from './types';

function App() {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  const handleAssessmentComplete = (result: AssessmentResult) => {
    console.log('Assessment Results:', result);
    setAssessmentCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {!assessmentCompleted ? (
        <div className="container mx-auto px-4 py-8">
          <Assessment onComplete={handleAssessmentComplete} />
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;