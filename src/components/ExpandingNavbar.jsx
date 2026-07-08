import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ExpandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'training', label: 'Training' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'products', label: 'Products' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'lms', label: 'LMS' }
  ];

  // Scroll spy effect
  useEffect(() => {
    // If not on the main page, don't spy
    if (location.pathname.startsWith('/services/')) return;

    const handleScroll = () => {
      let current = 'home';
      // Find the lowest section whose top is above the viewport middle
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = item.id;
          }
        }
      }
      if (activeSection !== current) {
        setActiveSection(current);
        // We can dynamically update the URL without triggering a re-render/jump
        // window.history.replaceState(null, '', current === 'home' ? '/' : `/${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, location.pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // If it is the gallery, navigate there directly
    if (item.id === 'gallery') {
        navigate('/gallery');
        return;
    }
    // If it is the LMS, navigate there directly
    if (item.id === 'lms') {
        navigate('/lms');
        return;
    }

    // If we are currently on a separate page (not the main OnePage layout)
    if (location.pathname !== '/') {
        // Navigate to the correct hash route which OnePage will handle on mount
        navigate(item.id === 'home' ? '/' : `/${item.id}`);
        return;
    }

    // Standard in-page smooth scrolling for OnePage
    const el = document.getElementById(item.id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm relative z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Logo area */}
            <a
              href="#home"
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={(e) => handleNavClick(e, {id: 'home'})}
            >
              <span className="text-2xl font-extrabold text-blue-900 tracking-tight">PHTech</span>
              <span className="text-2xl font-medium text-slate-500 ml-1">Consultants</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Highlight if we are in deep links and it's services
              const isDeepLink = location.pathname.startsWith('/services/') && item.id === 'services';
              const isGalleryLink = location.pathname === '/gallery' && item.id === 'gallery';
              const isLMSLink = location.pathname.startsWith('/lms') && item.id === 'lms';
              const isOnePage = location.pathname === '/';
              const isActive = (isOnePage && activeSection === item.id) || isDeepLink || isGalleryLink || isLMSLink;
              
              return (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-300 py-2 border-b-2 ${isActive
                    ? 'border-blue-900 text-blue-900 scale-105'
                    : 'border-transparent text-slate-600 hover:text-blue-900 hover:border-slate-300'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-blue-900 hover:bg-slate-100 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md absolute w-full left-0 top-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              // Highlight if we are in deep links and it's services
              const isDeepLink = location.pathname.startsWith('/services/') && item.id === 'services';
              const isGalleryLink = location.pathname === '/gallery' && item.id === 'gallery';
              const isLMSLink = location.pathname.startsWith('/lms') && item.id === 'lms';
              const isOnePage = location.pathname === '/';
              const isActive = (isOnePage && activeSection === item.id) || isDeepLink || isGalleryLink || isLMSLink;
              
              return (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-900'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ExpandingNavbar;