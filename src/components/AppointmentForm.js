import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PATIENTS, DOCTORS } from '../constants/data';

function AppointmentForm({ appointment, selectedDate, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    patientId: appointment?.patientId || '',
    patientName: appointment?.patientName || '',
    doctorId: appointment?.doctorId || '',
    doctorName: appointment?.doctorName || '',
    time: appointment?.time || ''
  });

  const handleSubmit = () => {
    if (!formData.patientId || !formData.doctorId || !formData.time) {
      return;
    }

    const patient = PATIENTS.find(p => p.id === parseInt(formData.patientId));
    const doctor = DOCTORS.find(d => d.id === parseInt(formData.doctorId));

    onSave({
      ...formData,
      patientName: patient?.name || '',
      doctorName: doctor?.name || ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {appointment ? 'Edit Appointment' : 'New Appointment'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {selectedDate && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  Date: {selectedDate.toLocaleDateString()}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Patient</option>
                {PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor
              </label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Doctor</option>
                {DOCTORS.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {appointment ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;