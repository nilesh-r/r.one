import React from 'react';

function AppointmentCard({ appointment, onEdit, onDelete }) {
  return (
    <div className="bg-blue-100 rounded px-2 py-1 text-xs group relative mb-1">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{appointment.time}</div>
          <div className="text-gray-700">{appointment.patientName}</div>
          <div className="text-gray-600">{appointment.doctorName}</div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(appointment)}
            className="text-blue-600 hover:text-blue-800 mr-1"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(appointment.id)}
            className="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;