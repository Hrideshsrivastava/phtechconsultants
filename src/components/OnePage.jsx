import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HomePage from './HomePage';
import ServicesPage from './ServicesPage';
import TrainingPage from './TrainingPage';
import SimulationPage from './SimulationPage';
import ProductsPage from './ProductsPage';
import TrainersPage from './TrainersPage';
import EventsPage from './EventsPage';
import ContactPage from './ContactPage';

const OnePage = () => {
    const location = useLocation();

    useEffect(() => {
        // Disable browser's native scroll restoration to prevent it from fighting our custom logic
        // and scrolling to the bottom (where it remembered you were on the previous page).
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // If someone navigates to /services directly or via the Back button, scroll to that section
        const path = location.pathname.substring(1) || 'home';
        
        // Wait a brief moment for the DOM to paint so we get accurate element positions
        const timeoutId = setTimeout(() => {
            const el = document.getElementById(path);
            if (el) {
                // Calculate position relative to the document
                const y = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 150);

        return () => clearTimeout(timeoutId);
    }, [location.pathname]);

    return (
        <div className="flex flex-col">
            <div id="home" className="pt-4 relative z-10"><HomePage /></div>
            
            {/* Divider between major sections to make the background visible and spacing nice */}
            <div className="h-32 relative z-10 pointer-events-none"></div>
            
            <div id="services" className="scroll-mt-24 relative z-10"><ServicesPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="training" className="scroll-mt-24 relative z-10"><TrainingPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="simulation" className="scroll-mt-24 relative z-10"><SimulationPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="products" className="scroll-mt-24 relative z-10"><ProductsPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="trainers" className="scroll-mt-24 relative z-10"><TrainersPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="events" className="scroll-mt-24 relative z-10"><EventsPage /></div>
            
            <div className="h-32 relative z-10 pointer-events-none"></div>
            <div id="contact" className="scroll-mt-24 relative z-10"><ContactPage /></div>
        </div>
    );
};

export default OnePage;
