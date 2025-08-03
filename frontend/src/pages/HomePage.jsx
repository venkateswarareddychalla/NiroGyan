import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import DoctorListCard from '../components/DoctorListCard';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { doctors, loading, error, fetchDoctors } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    // Real-time search - no need to wait for form submission
    fetchDoctors(query);
  }, [fetchDoctors]);

  const handleViewChange = (view) => {
    setViewMode(view);
  };

  return (
    <div className="space-y-10">
      {/* Hero Section for Small Screens (xs, sm, md) - Clipboard Stethoscope Background */}
      <div className="relative overflow-hidden lg:hidden animate-fade-in-scale">
        <div 
          className="bg-[#F8F9FA] rounded-2xl shadow-2xl bg-cover bg-center bg-no-repeat transition-shadow duration-500 hover:shadow-3xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(43, 122, 120, 0.85), rgba(43, 122, 120, 0.4), rgba(58, 175, 169, 0.2)), url('https://res.cloudinary.com/dykjwqjqi/image/upload/v1754200612/clipboard-stethoscope_khzpid.jpg')`
          }}
        >
          <div className="relative px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
            <div className="w-full sm:max-w-2xl md:max-w-2xl mx-auto sm:ml-4 md:ml-4"> 
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-6 leading-tight text-white animate-slide-in-left">
                Find & Book Appointments with
                <span className="block text-[#3AAFA9] mt-2">
                  Top Doctors
                </span>
              </h1>
              <div className="mb-6 sm:mb-8 md:mb-8 w-full sm:max-w-lg md:max-w-lg mx-auto sm:mx-0 md:mx-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section for Large Screens (lg, xl) - Doctor Background */}
      <div className="relative overflow-hidden hidden lg:block animate-fade-in-scale">
        <div 
          className="bg-[#F8F9FA] rounded-2xl shadow-2xl min-h-[450px] bg-cover bg-center bg-no-repeat transition-shadow duration-500 hover:shadow-3xl"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(43, 122, 120, 0.85), rgba(43, 122, 120, 0.4), rgba(58, 175, 169, 0.2)), url('https://res.cloudinary.com/dykjwqjqi/image/upload/v1754115564/portrait-smiling-medical-worker-girl-doctor-white-coat-with-stethoscope-pointing-fingers-left_fhvcs9.jpg')`
          }}
        >
          <div className="relative px-12 py-16 h-full flex items-center">
            <div className="max-w-2xl ml-8"> 
              <h1 className="text-6xl font-bold mb-6 leading-tight text-white animate-slide-in-left">
                Find & Book Appointments with
                <span className="block text-[#3AAFA9] mt-2">
                  Top Doctors
                </span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Connect with experienced healthcare professionals near you. 
                Quality care is just a click away.
              </p>
              <div className="mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {/* Feature highlights */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-base animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">Verified Doctors</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">Instant Booking</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Doctors List Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-scale transition-shadow duration-300 hover:shadow-xl" style={{ animationDelay: '0.5s' }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
              <div className="animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-[#2B7A78]">
                  {searchQuery ? `Search Results` : 'Our Expert Doctors'}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                    Showing results for "<span className="font-semibold text-blue-600">{searchQuery}</span>"
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <div className="bg-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                  <span className="text-blue-700 font-semibold text-lg">
                    {doctors.length}
                  </span>
                  <span className="text-blue-600 ml-1">
                    doctor{doctors.length !== 1 ? 's' : ''} available
                  </span>
                </div>
                <div className="hidden lg:block">
                  <ViewToggle view={viewMode} onViewChange={handleViewChange} />
                </div>
              </div>
            </div>

          {doctors.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-6">
                <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or browse all available doctors</p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Show All Doctors
                </button>
              )}
            </div>
          ) : (
            <div>
              {/* Mobile/Tablet View (xs, sm, md) - Only Grid View */}
              <div className="lg:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </div>
              
              {/* Desktop View (lg, xl) - Toggle between Grid and List */}
              <div className="hidden lg:block">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <DoctorListCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
