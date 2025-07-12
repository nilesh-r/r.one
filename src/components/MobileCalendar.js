import React from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

function MobileCalendar({ currentDate, setCurrentDate, appointments, onAddAppointment, onEditAppointment, onDeleteAppointment }) {
  const today = new Date();
  const dateString = currentDate.toISOString().split('T')[0];
  const dayAppointments = appointments.filter(apt => apt.date === dateString);

  const previousDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const nextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-indigo-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={previousDay}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
          </div>
          <button
            onClick={nextDay}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Appointments ({dayAppointments.length})
          </h3>
          <button
            onClick={onAddAppointment}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {dayAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No appointments scheduled</p>
            </div>
          ) : (
            dayAppointments.map(apt => (
              <div key={apt.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Clock className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{apt.time}</div>
                      <div className="text-sm text-gray-600">{apt.patientName}</div>
                      <div className="text-sm text-gray-600">{apt.doctorName}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditAppointment(apt)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDeleteAppointment(apt.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileCalendar;