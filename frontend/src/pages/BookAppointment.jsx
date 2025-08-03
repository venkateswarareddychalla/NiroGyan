import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedDoctor, loading, error, fetchDoctorById, bookAppointment } = useApp();
  
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchDoctorById(id);
    }
  }, [id]);

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.patient_name.trim()) {
      errors.patient_name = 'Patient name is required';
    }

    if (!formData.patient_email.trim()) {
      errors.patient_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patient_email)) {
      errors.patient_email = 'Please enter a valid email address';
    }

    if (!formData.appointment_date) {
      errors.appointment_date = 'Appointment date is required';
    }

    if (!formData.appointment_time) {
      errors.appointment_time = 'Appointment time is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    try {
      const appointmentData = {
        doctor_id: parseInt(id),
        ...formData
      };

      await bookAppointment(appointmentData);
      
      // Show success toast
      setShowToast(true);
      
      // Reset form
      setFormData({
        patient_name: '',
        patient_email: '',
        appointment_date: '',
        appointment_time: '',
      });

      // Navigate back to doctor profile after a delay
      setTimeout(() => {
        navigate(`/doctor/${id}`);
      }, 3000);

    } catch (error) {
      // Show error toast for booking conflicts
      setErrorMessage(error.message);
      setShowErrorToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = () => {
    setShowConfirmation(false);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleCloseErrorToast = () => {
    setShowErrorToast(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error && !selectedDoctor) return <ErrorMessage message={error} />;
  if (!selectedDoctor) return <div>Doctor not found</div>;

  if (selectedDoctor.availability_status !== 'available') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-alert mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral mb-4 font-heading">Doctor Unavailable</h1>
          <p className="text-gray-600 mb-6">
            Dr. {selectedDoctor.name} is currently not available for appointments.
          </p>
          <Link
            to={`/doctor/${id}`}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to={`/doctor/${id}`} 
          className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Doctor Profile
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-primary px-6 py-6 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Doctor Info */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">Book Appointment</h1>
              <p className="mt-2 opacity-90">Schedule your appointment with Dr. {selectedDoctor.name}</p>
              <div className="mt-4 inline-flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {selectedDoctor.specialization}
              </div>
            </div>

            {/* Right Side - Appointment Summary */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mt-6 md:mt-0">
              <h3 className="text-lg font-semibold mb-3 font-heading">Appointment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Doctor:</span> 
                  <span className="font-medium">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Specialization:</span> 
                  <span className="font-medium">{selectedDoctor.specialization}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Consultation Fee:</span> 
                  <span className="font-semibold">${selectedDoctor.consultation_fee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">Status:</span>
                  <span className="inline-flex items-center bg-success text-white px-2 py-1 rounded-full text-xs">
                    <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Error Message */}
          {error && <ErrorMessage message={error} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name */}
            <div>
              <label htmlFor="patient_name" className="block text-sm font-medium text-neutral mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                id="patient_name"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  formErrors.patient_name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {formErrors.patient_name && (
                <p className="mt-1 text-sm text-alert">{formErrors.patient_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="patient_email" className="block text-sm font-medium text-neutral mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="patient_email"
                name="patient_email"
                value={formData.patient_email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  formErrors.patient_email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {formErrors.patient_email && (
                <p className="mt-1 text-sm text-alert">{formErrors.patient_email}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="appointment_date" className="block text-sm font-medium text-neutral mb-2">
                Appointment Date *
              </label>
              <input
                type="date"
                id="appointment_date"
                name="appointment_date"
                value={formData.appointment_date}
                onChange={handleInputChange}
                min={today}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  formErrors.appointment_date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formErrors.appointment_date && (
                <p className="mt-1 text-sm text-alert">{formErrors.appointment_date}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label htmlFor="appointment_time" className="block text-sm font-medium text-neutral mb-2">
                Appointment Time *
              </label>
              <select
                id="appointment_time"
                name="appointment_time"
                value={formData.appointment_time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
                  formErrors.appointment_time ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select time slot</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {formErrors.appointment_time && (
                <p className="mt-1 text-sm text-alert">{formErrors.appointment_time}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-secondary focus:ring-primary cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Booking Appointment...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 012 0v4m4-4v4m1 0H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
                    </svg>
                    Book Appointment
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 012 0v4m4-4v4m1 0H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Confirm Appointment
                </h3>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Please confirm your appointment details:
              </p>
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Doctor:</span>
                  <span>{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Patient:</span>
                  <span>{formData.patient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{formData.patient_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formData.appointment_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{formData.appointment_time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fee:</span>
                  <span>${selectedDoctor.consultation_fee}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelBooking}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 border border-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed focus:ring-gray-500' 
                    : 'bg-green-500 hover:bg-green-600 focus:ring-green-500 cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      <Toast
        message={`Appointment booked successfully with Dr. ${selectedDoctor.name}!`}
        type="success"
        isVisible={showToast}
        onClose={handleCloseToast}
        duration={4000}
      />

      {/* Error Toast */}
      <Toast
        message={errorMessage}
        type="error"
        isVisible={showErrorToast}
        onClose={handleCloseErrorToast}
        duration={4000}
      />
    </div>
  );
};

export default BookAppointment;
