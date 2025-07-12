import React from 'react';
import { Calendar } from 'lucide-react';

function AnimatedHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 rounded-lg p-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">MedScheduler</h1>
          </div>
          <div className="text-sm text-gray-600">
            Medical Appointment System
          </div>
        </div>
      </div>
    </header>
  );
}

export default AnimatedHeader;