import React from 'react';

/**
 * A horizontal navigation bar that expands on hover.
 * Receives `onNavClick` and `activePage` as props.
 */
const ExpandingNavbar = ({ onNavClick, activePage }) => {
  
  // Helper function to dynamically set link styles
  const getLinkClass = (page) => {
    const baseStyle = "hover:text-cyan-300 transition-colors";
    const activeStyle = "text-cyan-400 font-bold";
    
    return `${baseStyle} ${activePage === page ? activeStyle : ''}`;
  };

  return (
    <nav 
      className="
        fixed top-0 w-full 
        bg-gray-800 text-white 
        shadow-lg
        transition-all duration-300 ease-in-out
        py-2
        hover:py-6
      "
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        
        <div className="text-xl font-bold">
          MySite
        </div>

        {/* Navigation Links are now buttons that send a "signal" up */}
        <div className="flex space-x-8">
          <button 
            onClick={() => onNavClick('home')} 
            className={getLinkClass('home')}
          >
            Home
          </button>
          <button 
            onClick={() => onNavClick('about')} 
            className={getLinkClass('about')}
          >
            About
          </button>
          <button 
            onClick={() => onNavClick('services')} 
            className={getLinkClass('services')}
          >
            Services
          </button>
          <button 
            onClick={() => onNavClick('contact')} 
            className={getLinkClass('contact')}
          >
            Contact
          </button>
        </div>

      </div>
    </nav>
  );
};

export default ExpandingNavbar;