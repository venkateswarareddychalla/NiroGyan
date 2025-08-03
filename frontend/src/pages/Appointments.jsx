import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/appointments`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Appointments</h1>
          <p className="text-gray-600">
            Total appointments: {appointments.length}
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M8 11h8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Found</h3>
            <p className="text-gray-600">There are no appointments scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Appointment Details */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {appointment.patient_name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {appointment.patient_email}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Dr. {appointment.doctor_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                            <span>{appointment.specialization}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-col sm:flex-row gap-4 md:text-right">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {formatDate(appointment.appointment_date)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(appointment.appointment_time)}
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-center justify-start md:justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment ID and Created Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500">
                    <span>Appointment ID: #{appointment.id}</span>
                    <span>
                      Booked: {new Date(appointment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
