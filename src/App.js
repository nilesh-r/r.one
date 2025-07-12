import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import AnimatedHeader from './components/AnimatedHeader';
import DesktopCalendar from './components/DesktopCalendar';
import MobileCalendar from './components/MobileCalendar';
import AppointmentForm from './components/AppointmentForm';
import ConfirmationPage from './components/ConfirmationPage';
import { LOGIN_CREDENTIALS } from './constants/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (email, password) => {
    if (email === LOGIN_CREDENTIALS.email && password === LOGIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      date: selectedDate.toISOString().split('T')[0]
    };
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentForm(false);
    setSelectedDate(null);
    setConfirmedAppointment(newAppointment);
    setShowConfirmation(true);
  };

  const updateAppointment = (appointmentData) => {
    const updatedAppointment = {
      ...editingAppointment,
      ...appointmentData
    };
    setAppointments(appointments.map(apt => 
      apt.id === editingAppointment.id ? updatedAppointment : apt
    ));
    setShowAppointmentForm(false);
    setEditingAppointment(null);
    setConfirmedAppointment(updatedAppointment);
    setShowConfirmation(true);
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    showToast('Appointment deleted!');
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setConfirmedAppointment(null);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {toast.message}
        </div>
      )}
      <AnimatedHeader />
      <main className="container mx-auto px-4 py-6">
        {isMobile ? (
          <MobileCalendar 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            appointments={appointments}
            onAddAppointment={() => {
              setSelectedDate(currentDate);
              setShowAppointmentForm(true);
            }}
            onEditAppointment={(apt) => {
              setEditingAppointment(apt);
              setShowAppointmentForm(true);
            }}
            onDeleteAppointment={deleteAppointment}
          />
        ) : (
          <DesktopCalendar 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            appointments={appointments}
            onDateClick={(date) => {
              setSelectedDate(date);
              setShowAppointmentForm(true);
            }}
            onEditAppointment={(apt) => {
              setEditingAppointment(apt);
              setShowAppointmentForm(true);
            }}
            onDeleteAppointment={deleteAppointment}
          />
        )}
      </main>

      {showAppointmentForm && (
        <AppointmentForm
          appointment={editingAppointment}
          selectedDate={selectedDate}
          onSave={editingAppointment ? updateAppointment : addAppointment}
          onCancel={() => {
            setShowAppointmentForm(false);
            setEditingAppointment(null);
            setSelectedDate(null);
          }}
        />
      )}

      {showConfirmation && confirmedAppointment && (
        <ConfirmationPage
          appointment={confirmedAppointment}
          isUpdate={!!editingAppointment}
          onClose={closeConfirmation}
        />
      )}
    </div>
  );
}

export default App;
