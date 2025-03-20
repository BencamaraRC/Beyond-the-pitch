import React from 'react';
import { Bell, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">AthleteNext</h1>
        </div>
        <div className="flex items-center space-x-6">
          <button className="p-2 hover:bg-indigo-700 rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-indigo-700 rounded-full">
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}