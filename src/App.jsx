import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import ServiceExperience from './components/ServiceExperience';
import GalleryPage, { imagesList } from './components/GalleryPage';
import LMSDashboard from './components/lms/LMSDashboard';
import TestsDashboard from './components/lms/TestsDashboard';
import GenericQuiz from './components/lms/GenericQuiz';
import LMSLogin from './components/lms/LMSLogin';
import ProtectedRoute from './components/lms/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';

// --- Scroll to top on route change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // We handle custom scrolling in OnePage, so we only scroll to top for deep links and new pages
    if (pathname.startsWith('/lms') || pathname.startsWith('/privacy') || pathname.startsWith('/terms')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return null;
};

// --- Main App Component ---

function App() {
  // Preload gallery images in the background as soon as the app loads
  useEffect(() => {
    imagesList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <div className="w-full h-full">
            <Layout>
            <Routes>
              {/* The public site stays mounted while service details slide over it. */}
              <Route element={<ServiceExperience />}>
                <Route path="/" element={null} />
                <Route path="/services" element={null} />
                <Route path="/training" element={null} />
                <Route path="/simulation" element={null} />
                <Route path="/products" element={null} />
                <Route path="/trainers" element={null} />
                <Route path="/events" element={null} />
                <Route path="/contact" element={null} />
                <Route path="/services/hr-od" element={null} />
                <Route path="/services/scm" element={null} />
                <Route path="/services/ipa" element={null} />
                <Route path="/services/ppm" element={null} />
                <Route path="/services/mrbd" element={null} />
                <Route path="/training/:trainingId" element={null} />
              </Route>

              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/lms/login" element={<LMSLogin />} />
              <Route path="/lms" element={<ProtectedRoute><LMSDashboard /></ProtectedRoute>} />
              <Route path="/lms/tests" element={<ProtectedRoute><TestsDashboard /></ProtectedRoute>} />
              <Route path="/lms/tests/:testId" element={<ProtectedRoute><GenericQuiz /></ProtectedRoute>} />

              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
