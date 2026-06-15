import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ExpandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activePage = location.pathname;

  const navItems = [
    { id: '', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'training', label: 'Training' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'products', label: 'Products' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (activePage === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Logo area */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => handleNavClick('/')}
            >
              <span className="text-2xl font-extrabold text-blue-900 tracking-tight">PHTech</span>
              <span className="text-2xl font-medium text-slate-500 ml-1">Consultants</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const itemPath = `/${item.id}`;
              const isActive = item.id === '' ? activePage === '/' : activePage.startsWith(itemPath);
              return (
                <Link
                  key={item.id || 'home'}
                  to={itemPath}
                  onClick={() => handleNavClick(itemPath)}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 py-2 border-b-2 ${isActive
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-slate-600 hover:text-blue-900 hover:border-slate-300'
                    }`}
                >
                  {item.label}
                </Link>
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
        <div className="md:hidden bg-white border-b border-slate-200 shadow-md absolute w-full left-0 top-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const itemPath = `/${item.id}`;
              const isActive = item.id === '' ? activePage === '/' : activePage.startsWith(itemPath);
              return (
                <Link
                  key={item.id || 'home'}
                  to={itemPath}
                  onClick={() => handleNavClick(itemPath)}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${isActive
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-900'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ExpandingNavbar;