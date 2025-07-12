import React from 'react';
import { CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

const ConfirmationPage = ({ appointment, isUpdate, onClose }) => {
  const appointmentDate = new Date(appointment.date);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isUpdate ? 'Appointment Updated!' : 'Appointment Confirmed!'}
            </h2>
            <p className="text-gray-600">
              {isUpdate ? 'Your appointment has been successfully updated.' : 'Your appointment has been successfully scheduled.'}
            </p>
          </div>

          {/* Rest of the confirmation page content */}
          {/* ... */}
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;