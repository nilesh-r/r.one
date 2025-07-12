import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

function DesktopCalendar({ currentDate, setCurrentDate, appointments, onDateClick, onEditAppointment, onDeleteAppointment }) {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDayAppointments = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-indigo-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0 bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-3 text-center font-medium text-gray-700 border-r border-gray-200">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const dayAppointments = getDayAppointments(date);
          const isToday = date.toDateString() === today.toDateString();
          const isCurrentMonth = date.getMonth() === month;
          
          return (
            <div
              key={index}
              onClick={() => onDateClick(date)}
              className={`bg-white p-2 min-h-24 cursor-pointer hover:bg-gray-50 transition-colors border-r border-b border-gray-200 ${
                !isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''
              }`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
              }`}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayAppointments.map(apt => (
                  <AppointmentCard
                    key={apt.id}
                    appointment={apt}
                    onEdit={onEditAppointment}
                    onDelete={onDeleteAppointment}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DesktopCalendar;