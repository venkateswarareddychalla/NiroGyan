import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import nirogGyanLogo from '../assets/niroggyan logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactActive, setIsContactActive] = useState(false);
  
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactActive(true);
    closeMobileMenu();
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
      // Remove active state after a delay
      setTimeout(() => setIsContactActive(false), 2000);
    }, 100);
  };

  const handleNavContactClick = () => {
    setIsContactActive(true);
    // Smooth scroll to footer
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    // Remove active state after a delay
    setTimeout(() => setIsContactActive(false), 2000);
  };

  return (
    <nav className="bg-[#2B7A78] shadow-xl sticky top-0 z-40">
      <div className="w-full max-w-7xl mx-auto pl-2 pr-6">
        <div className="flex justify-between items-center py-4">
          {/* Brand/Logo */}
          <Link to="/" className="flex items-center group cursor-pointer ml-4">
            <div className="bg-white rounded-md px-2 py-1 inline-block">
              <img 
                src={nirogGyanLogo} 
                alt="NirogGyan Logo" 
                className="h-11 object-contain object-left"
                style={{ width: 'auto' }}
              />
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 border-b-2 cursor-pointer ${
                isActiveLink('/') 
                  ? 'text-white border-white' 
                  : 'text-[#F8F9FA] hover:text-[#3AAFA9] border-transparent hover:border-[#3AAFA9]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Find Doctors</span>
            </Link>
            
            <Link 
              to="/appointments" 
              className={`flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 border-b-2 cursor-pointer ${
                isActiveLink('/appointments') 
                  ? 'text-white border-white' 
                  : 'text-[#F8F9FA] hover:text-[#3AAFA9] border-transparent hover:border-[#3AAFA9]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Appointments</span>
            </Link>
            
            {/* Contact Us Link */}
            <button 
              onClick={handleNavContactClick}
              className={`hidden lg:flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-300 border-b-2 cursor-pointer ${
                isContactActive
                  ? 'text-white border-white' 
                  : 'text-[#F8F9FA] hover:text-[#3AAFA9] border-transparent hover:border-[#3AAFA9]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contact Us</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-3 text-white hover:text-gray-200 transition-all duration-300 border-b-2 border-transparent hover:border-gray-200 cursor-pointer"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#2B7A78] border-t border-[#3AAFA9]/20 animate-slide-down overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer ${
                  isActiveLink('/') 
                    ? 'text-white bg-[#3AAFA9]/20' 
                    : 'text-[#F8F9FA] hover:text-[#3AAFA9] hover:bg-[#3AAFA9]/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Find Doctors</span>
              </Link>
              
              <Link 
                to="/appointments" 
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer ${
                  isActiveLink('/appointments') 
                    ? 'text-white bg-[#3AAFA9]/20' 
                    : 'text-[#F8F9FA] hover:text-[#3AAFA9] hover:bg-[#3AAFA9]/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Appointments</span>
              </Link>

              <button 
                onClick={handleContactClick}
                className="flex items-center space-x-3 px-4 py-3 rounded-md font-medium transition-all duration-300 cursor-pointer text-[#F8F9FA] hover:text-[#3AAFA9] hover:bg-[#3AAFA9]/10 w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
