import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import OnePage from './components/OnePage';

// Service Deep Links
import HR_OD from './components/services/HR_OD';
import SCM from './components/services/SCM';
import IPA from './components/services/IPA';
import PPM from './components/services/PPM';
import MRBD from './components/services/MRBD';
import GalleryPage from './components/GalleryPage';

// --- Scroll to top on route change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // We handle custom scrolling in OnePage, so we only scroll to top for deep links
    if (pathname.startsWith('/services/')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

// --- Main App Component ---

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full h-full">
          <Layout>
            <Routes>
              {/* Map all primary routes to OnePage so the URL can change but render the same scrolling component */}
              <Route path="/" element={<OnePage />} />
              <Route path="/services" element={<OnePage />} />
              <Route path="/training" element={<OnePage />} />
              <Route path="/simulation" element={<OnePage />} />
              <Route path="/products" element={<OnePage />} />
              <Route path="/trainers" element={<OnePage />} />
              <Route path="/events" element={<OnePage />} />
              <Route path="/contact" element={<OnePage />} />

              {/* Service Deep Links */}
              <Route path="/services/hr-od" element={<HR_OD />} />
              <Route path="/services/scm" element={<SCM />} />
              <Route path="/services/ipa" element={<IPA />} />
              <Route path="/services/ppm" element={<PPM />} />
              <Route path="/services/mrbd" element={<MRBD />} />

              <Route path="/gallery" element={<GalleryPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
      </div>
    </Router>
  );
}

export default App;
