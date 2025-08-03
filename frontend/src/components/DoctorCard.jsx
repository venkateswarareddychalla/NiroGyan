import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DoctorCard = ({ doctor }) => {
  const [showBusyToast, setShowBusyToast] = useState(false);

  useEffect(() => {
    if (showBusyToast) {
      const timer = setTimeout(() => {
        setShowBusyToast(false);
      }, 3000); // Auto dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showBusyToast]);

  const getStatusColor = (status) => {
    return status === 'available' 
      ? 'bg-[#28C76F]' // Success/Available - Green with white text
      : 'bg-[#FF6B6B]'; // Alert/Warning - Red with white text
  };

  const getStatusText = (status) => {
    return status === 'available' ? 'Available Now' : 'Currently Busy';
  };

  const renderRating = (rating) => {
    return (
      <div className="inline-flex items-center bg-[#3AAFA9] text-white px-3 py-1 rounded-full text-sm font-medium">
        <span className="mr-1">★</span>
        <span>{rating}</span>
      </div>
    );
  };

  const handleBusyBookingClick = () => {
    setShowBusyToast(true);
  };

  const handleCloseBusyToast = () => {
    setShowBusyToast(false);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-300 overflow-hidden hover:border-[#3AAFA9] h-fit relative">
      {/* Card Header with Doctor Avatar */}
      <div className="relative p-4 pb-3 bg-gradient-to-br from-[#F8F9FA] to-white">
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(doctor.availability_status)}`}>
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-white animate-pulse"></span>
            {getStatusText(doctor.availability_status)}
          </span>
        </div>
        
        {/* Doctor Avatar */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            {doctor.profile_image ? (
              <img 
                src={doctor.profile_image} 
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg" style={{display: doctor.profile_image ? 'none' : 'flex'}}>
              <div className="text-white text-xl font-bold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            {/* Online indicator for available doctors */}
            {doctor.availability_status === 'available' && (
              <div className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 ${getStatusColor(doctor.availability_status)} rounded-full border-2 border-white flex items-center justify-center shadow-md`}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[#17252A] mb-1 group-hover:text-[#2B7A78] transition-colors duration-300">
            {doctor.name}
          </h3>
          <p className="text-[#3AAFA9] font-semibold mb-2 text-sm">
            {doctor.specialization}
          </p>
          
          {/* Rating */}
          <div className="flex justify-center items-center mb-2">
            {renderRating(doctor.rating)}
          </div>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="px-4 pb-4">
        <div className="bg-[#DEF2F1] rounded-lg p-3 space-y-2 mb-4 border border-[#B8E6E1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#3AAFA9] rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs text-[#17252A] font-medium">Experience</span>
            </div>
            <span className="font-semibold text-[#17252A] text-sm">{doctor.experience_years} years</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#3AAFA9] rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-xs text-[#17252A] font-medium">Consultation</span>
            </div>
            <span className="font-bold text-[#2B7A78] text-base">${doctor.consultation_fee}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            to={`/doctor/${doctor.id}`}
            className="w-full bg-white border-2 border-[#E0E0E0] text-[#2B7A78] py-2.5 px-4 rounded-lg hover:bg-[#F8F9FA] hover:border-[#3AAFA9] transition-all duration-300 text-center block font-semibold text-sm"
          >
            View Profile
          </Link>
          
          {doctor.availability_status === 'available' ? (
            <Link
              to={`/book/${doctor.id}`}
              className="w-full bg-[#2B7A78] hover:bg-[#3AAFA9] text-white py-2.5 px-4 rounded-lg transition-all duration-300 text-center block font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Book Appointment
            </Link>
          ) : (
            <button
              onClick={handleBusyBookingClick}
              className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-2.5 px-4 rounded-lg transition-all duration-300 text-center font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>

      {/* Busy Doctor Toast */}
      {showBusyToast && (
        <div className="absolute top-2 right-2 z-50 animate-slide-in-right">
          <div className="flex items-center p-3 rounded-lg shadow-lg bg-red-500 text-white max-w-xs">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <p className="text-xs font-medium">Doctor busy at moment</p>
            </div>
            <button
              onClick={handleCloseBusyToast}
              className="ml-2 flex-shrink-0 rounded-md p-1 hover:bg-black hover:bg-opacity-20 focus:outline-none"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
