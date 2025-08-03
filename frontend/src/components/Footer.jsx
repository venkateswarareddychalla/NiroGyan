import nirogGyanLogo from '../assets/niroggyan logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="bg-[#2B7A78] text-white py-10 mt-16 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-start lg:justify-items-center">
        {/* Logo + Made With Love - LEFT */}
        <div className="flex flex-col items-start gap-3">
          <div className="bg-white rounded-md px-2 py-1 inline-block">
            <img
              src={nirogGyanLogo}
              alt="Niroggyan Logo"
              className="h-16 object-contain object-left"
              style={{ width: 'auto' }}
            />
          </div>
          <p className="text-sm text-gray-300">
            Made with <span className="text-red-500">❤️</span> by the health geeks at NirogGyan
          </p>
        </div>

        {/* Social Media Links - CENTER */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-semibold text-lg">Follow Us</h3>
          <div className="flex gap-4 justify-start">
            <a href="https://www.facebook.com/niroggyan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-300 hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-md flex items-center justify-center group shadow-md hover:shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/niroggyan_officialpage" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-300 hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-md flex items-center justify-center group shadow-md hover:shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/niroggyan/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-300 hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-md flex items-center justify-center group shadow-md hover:shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://x.com/niroggyanhealth" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-300 hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-md flex items-center justify-center group shadow-md hover:shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UC4CmbjD2IHANS5bf3wQMbmA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-300 hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-md flex items-center justify-center group shadow-md hover:shadow-lg cursor-pointer">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Us - RIGHT */}
        <div className="flex flex-col items-start gap-3">
          <h3 className="font-semibold text-lg">Contact Us</h3>
          <div className="text-left space-y-1">
            <p className="text-sm text-gray-300">
              D-533, Sec 1, Avantika Rohini, <br /> New Delhi, India - 110085
            </p>
            <p className="text-sm text-gray-300">contact@niroggyan.com</p>
            <p className="text-sm text-gray-300">+917678277891</p>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-4 right-4 bg-[#3AAFA9] hover:bg-white text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer animate-bounce group"
        title="Scroll to top"
      >
        <svg className="w-6 h-6 group-hover:fill-[#2B7A78] group-hover:stroke-[#2B7A78] transition-colors duration-300" fill="white" stroke="white" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
    </footer>
  );
};

export default Footer;
