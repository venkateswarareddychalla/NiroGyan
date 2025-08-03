import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const DoctorProfile = () => {
  const { id } = useParams();
  const { selectedDoctor, loading, error, fetchDoctorById } = useApp();

  useEffect(() => {
    if (id) {
      fetchDoctorById(id);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!selectedDoctor) return <div>Doctor not found</div>;

  const getStatusColor = (status) => {
    return status === 'available' 
      ? 'bg-success text-white' 
      : 'bg-alert text-white';
  };

  const getStatusText = (status) => {
    return status === 'available' ? 'Available' : 'Currently Busy';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-secondary transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Doctors
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-primary px-6 md:px-8 py-8 md:py-12 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-center space-y-6 md:space-y-0 md:space-x-8 ml-8 md:ml-12">
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              {selectedDoctor.profile_image ? (
                <img 
                  src={selectedDoctor.profile_image} 
                  alt={selectedDoctor.name}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white border-opacity-30"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="w-28 h-28 md:w-32 md:h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                style={{display: selectedDoctor.profile_image ? 'none' : 'flex'}}
              >
                <svg className="w-14 h-14 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="text-center md:text-left flex-grow min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 font-heading">{selectedDoctor.name}</h1>
              <p className="text-lg md:text-xl mb-4 opacity-90">{selectedDoctor.specialization}</p>
              <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start space-y-3 md:space-y-0 md:space-x-3">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedDoctor.availability_status)}`}>
                    <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                    {getStatusText(selectedDoctor.availability_status)}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="inline-flex items-center bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span className="mr-2">★</span>
                    <span>{selectedDoctor.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Doctor Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 font-heading text-neutral">Doctor Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Experience</span>
                  <span className="text-neutral font-semibold">{selectedDoctor.experience_years} years</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Consultation Fee</span>
                  <span className="text-neutral font-semibold">${selectedDoctor.consultation_fee}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-600">Specialization</span>
                  <span className="text-neutral font-semibold">{selectedDoctor.specialization}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium text-gray-600">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDoctor.availability_status)}`}>
                    {getStatusText(selectedDoctor.availability_status)}
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 font-heading text-neutral">About Doctor</h2>
              <div className="bg-info p-6 rounded-lg">
                <p className="text-neutral leading-relaxed">
                  {selectedDoctor.about || `Dr. ${selectedDoctor.name} is a dedicated ${selectedDoctor.specialization.toLowerCase()} with ${selectedDoctor.experience_years} years of experience. Committed to providing exceptional healthcare services with a patient-centered approach.`}
                </p>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="mt-12 text-center">
            {selectedDoctor.availability_status === 'available' ? (
              <Link
                to={`/book/${selectedDoctor.id}`}
                className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-secondary transition-colors duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 012 0v4m4-4v4m1 0H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
                </svg>
                Book Appointment
              </Link>
            ) : (
              <div className="inline-flex items-center px-8 py-4 bg-alert text-white text-lg font-medium rounded-lg cursor-not-allowed">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Currently Unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
