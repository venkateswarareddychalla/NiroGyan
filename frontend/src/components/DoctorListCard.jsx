import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DoctorListCard = ({ doctor }) => {
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
    return status === 'available' ? 'bg-[#28C76F]' : 'bg-[#FF6B6B]'; // Success/Alert colors
  };

  const getStatusText = (status) => {
    return status === 'available' ? 'Available Now' : 'Busy';
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
    <div className="relative bg-white rounded-lg border border-gray-200 hover:border-[#3AAFA9] hover:shadow-md transition-all duration-300 p-4">
      <div className="flex items-center justify-between">
        {/* Left side - Doctor info in 2 rows */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {doctor.profile_image ? (
              <img 
                src={doctor.profile_image} 
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-lg font-bold" style={{display: doctor.profile_image ? 'none' : 'flex'}}>
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            {/* Status indicator */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(doctor.availability_status)} rounded-full border-2 border-white`}></div>
          </div>
          
          {/* Doctor details in 2 rows */}
          <div>
            {/* Row 1: Name and Rating */}
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="text-lg font-bold text-[#17252A]">Dr. {doctor.name}</h3>
              <div className="flex items-center bg-[#3AAFA9] text-white px-2 py-1 rounded-full text-xs">
                <span className="mr-1">★</span>
                <span>{doctor.rating}</span>
              </div>
            </div>
            
            {/* Row 2: Specialization and Experience */}
            <div className="flex items-center space-x-3 text-sm text-[#6C757D]">
              <span className="font-medium text-[#3AAFA9]">{doctor.specialization}</span>
              <span>•</span>
              <span>{doctor.experience_years} years exp.</span>
            </div>
          </div>
        </div>

        {/* Right side - Fee and Actions */}
        <div className="flex items-center space-x-4">
          {/* Fee */}
          <div className="text-right">
            <div className="text-xl font-bold text-[#2B7A78]">${doctor.consultation_fee}</div>
            <div className="text-xs text-[#6C757D]">consultation</div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <Link
              to={`/doctor/${doctor.id}`}
              className="bg-white border border-[#2B7A78] text-[#2B7A78] font-semibold py-2 px-3 rounded-lg transition-transform duration-300 text-sm cursor-pointer hover:scale-105"
            >
              View Profile
            </Link>
            {doctor.availability_status === 'available' ? (
              <Link
                to={`/book/${doctor.id}`}
                className="bg-[#2B7A78] text-white font-semibold py-2 px-3 rounded-lg transition-transform duration-300 text-sm cursor-pointer hover:scale-105"
              >
                Book Now
              </Link>
            ) : (
              <button 
                onClick={handleBusyBookingClick}
                className="bg-[#FF6B6B] text-white font-semibold py-2 px-3 rounded-lg transition-transform duration-300 text-sm cursor-pointer hover:scale-105"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Busy Doctor Toast */}
      {showBusyToast && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20 rounded-lg">
          <div className="flex items-center p-3 rounded-lg shadow-lg bg-red-500 text-white max-w-xs animate-slide-in-right">
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
              className="ml-2 flex-shrink-0 rounded-md p-1 hover:bg-black hover:bg-opacity-20 focus:outline-none cursor-pointer"
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

export default DoctorListCard;
