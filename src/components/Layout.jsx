import React from 'react';
import ExpandingNavbar from './ExpandingNavbar';
import Footer from './Footer';

const Layout = ({ children, onNavClick, activePage }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800">
            {/* 
        Navbar wrapper ensures it stays fixed at the top with a high z-index.
        We pass the navigation props down to ExpandingNavbar.
      */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <ExpandingNavbar onNavClick={onNavClick} activePage={activePage} />
            </div>

            {/* 
        Main content wrapper. 
        pt-20 or pt-24 offsets the fixed navbar.
        flex-grow ensures the footer is pushed to the bottom.
      */}
            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
                {children}
            </main>

            {/* Footer stays at the bottom */}
            <Footer onNavClick={onNavClick} />
        </div>
    );
};

export default Layout;
