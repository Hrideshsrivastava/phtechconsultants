import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import Layout from './components/Layout';
import Footer from './components/Footer'; // New import

// Main Corporate Pages
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import TrainingPage from './components/TrainingPage'; // New import
import SimulationPage from './components/SimulationPage'; // New import
import ProductsPage from './components/ProductsPage'; // New import
import TrainersPage from './components/TrainersPage'; // New import
import EventsPage from './components/EventsPage'; // New import
import ContactPage from './components/ContactPage'; // New import

// Service Deep Links
import HR_OD from './components/services/HR_OD';
import SCM from './components/services/SCM';
import IPA from './components/services/IPA';
import PPM from './components/services/PPM';
import MRBD from './components/services/MRBD';

// --- Scroll to top on route change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // Only scroll to top if not an intra-page navigation (like hash links if any existed)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// --- Top Level Routes for Swiping ---
const topLevelRoutes = [
  '/',
  '/services',
  '/training',
  '/simulation',
  '/products',
  '/trainers',
  '/events',
  '/contact'
];

// --- Swipe Wrapper ---
const SwipeableLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = topLevelRoutes.indexOf(location.pathname);
      if (currentIndex !== -1 && currentIndex < topLevelRoutes.length - 1) {
        navigate(topLevelRoutes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = topLevelRoutes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(topLevelRoutes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: false,
    trackMouse: false
  });

  return (
    <div {...handlers} className="w-full h-full min-h-screen">
      {children}
    </div>
  );
}; // This brace closes the SwipeableLayout component

// --- Main App Component ---

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full h-full">
        <SwipeableLayout>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* Services (Consulting Only) */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/hr-od" element={<HR_OD />} />
              <Route path="/services/scm" element={<SCM />} />
              <Route path="/services/ipa" element={<IPA />} />
              <Route path="/services/ppm" element={<PPM />} />
              <Route path="/services/mrbd" element={<MRBD />} />

              {/* Other Main Sections */}
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/simulation" element={<SimulationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/events" element={<EventsPage />} />

              <Route path="/contact" element={<ContactPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </SwipeableLayout>
      </div>
    </Router>
  );
}

export default App;
