import React, { useState } from 'react';
import ExpandingNavbar from './components/ExpandingNavbar';


import { useSwipeable } from 'react-swipeable';
import { useIsMobile } from './hooks/useIsMobile';

// --- Dummy Page Components (for this example) ---
// In a real app, you would import these from separate files.
const HomePage = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold">Home Page</h2>
    <p>Welcome to the home page content!</p>
  </div>
);

const AboutPage = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold">About Us</h2>
    <p>This is the about section.</p>
  </div>
);

const ServicesPage = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold">Our Services</h2>
    <p>Here are the services we offer.</p>
  </div>
);

const ContactPage = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-2xl font-bold">Contact</h2>
    <p>Get in touch with us!</p>
  </div>
);
// --- End of Dummy Components ---

const pages = ['home', 'about', 'services', 'contact'];

function App() {
  // State to manage which page is currently active
  
  const [activePage, setActivePage] = useState(pages[0]);

  const isMobile = useIsMobile();



  // 4. Create swipe handler functions
  const handleSwipe = (direction) => {
    const currentIndex = pages.indexOf(activePage);
    
    if (direction === 'LEFT') {
      // Move to the next page, or wrap to the first
      const nextIndex = (currentIndex + 1) % pages.length;
      setActivePage(pages[nextIndex]);
    } else if (direction === 'RIGHT') {
      // Move to the previous page, or wrap to the last
      const prevIndex = (currentIndex - 1 + pages.length) % pages.length;
      setActivePage(pages[prevIndex]);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
    preventScrollOnSwipe: true, // Prevents vertical scroll while swiping
    trackMouse: true,          // Don't allow swiping with a mouse
    // 6. Disable the hook entirely if not on mobile
    disabled: !isMobile,
  });

  // Function to render the correct page component based on state
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans">
      {/*
        1. Pass the setter function `setActivePage` as a prop.
        2. Pass the current `activePage` to highlight the active link.
      */}
      <ExpandingNavbar 
        onNavClick={setActivePage} 
        activePage={activePage}
      />

      {/* Content area: pt-20 to avoid navbar overlap */}
      <main className="pt-20 p-8"{...swipeHandlers}>
        {/* 3. Render the component based on the state */}
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;







