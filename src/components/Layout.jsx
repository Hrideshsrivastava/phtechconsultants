import React from 'react';
import { useLocation } from 'react-router-dom';
import ExpandingNavbar from './ExpandingNavbar';
import Footer from './Footer';
import ImageTrack from './ImageTrack';

const Layout = ({ children, onNavClick, activePage }) => {
    const location = useLocation();
    const isGallery = location.pathname === '/gallery';
    const isTestPage = location.pathname.startsWith('/lms/tests/') && location.pathname !== '/lms/tests';
    const isPublicSite = [
        '/',
        '/services',
        '/training',
        '/simulation',
        '/products',
        '/trainers',
        '/events',
        '/contact'
    ].includes(location.pathname) || location.pathname.startsWith('/services/') || location.pathname.startsWith('/training/');
    const isServicePage = location.pathname.startsWith('/services/');
    const isTrainingPage = location.pathname.startsWith('/training/');
    const extensionSide = isServicePage || isTrainingPage ? 'right' : null;

    return (
        <div className="min-h-screen flex flex-col overflow-x-clip font-sans text-slate-800">
            {isPublicSite && <ImageTrack extensionSide={extensionSide} />}
            {/* 
        Navbar wrapper ensures it stays fixed at the top with a high z-index.
        We pass the navigation props down to ExpandingNavbar.
      */}
            {!isTestPage && (
                <div className="fixed top-0 left-0 right-0 z-50">
                    <ExpandingNavbar onNavClick={onNavClick} activePage={activePage} />
                </div>
            )}

            {/* 
        Main content wrapper. 
        pt-20 or pt-24 offsets the fixed navbar.
        flex-grow ensures the footer is pushed to the bottom.
      */}
            <main className={`flex-grow ${isGallery || isTestPage ? '' : 'pt-24 pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto'}`}>
                {children}
            </main>

            {/* Footer stays at the bottom */}
            {!isGallery && !isTestPage && !isServicePage && !isTrainingPage && <Footer onNavClick={onNavClick} />}
        </div>
    );
};

export default Layout;
