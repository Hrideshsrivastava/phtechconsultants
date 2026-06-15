import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    const handleLinkClick = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-blue-900 py-12 text-slate-200 mt-auto border-t border-blue-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 tracking-tight">PHTech Consultants</h3>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                        Delivering performance excellence, strategic alignment, and high-performance team building for dynamic organizations.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/services" onClick={() => handleLinkClick('/services')} className="hover:text-white transition-colors">Services</Link></li>
                        <li><Link to="/training" onClick={() => handleLinkClick('/training')} className="hover:text-white transition-colors">Training</Link></li>
                        <li><Link to="/simulation" onClick={() => handleLinkClick('/simulation')} className="hover:text-white transition-colors">Simulation</Link></li>
                        <li><Link to="/products" onClick={() => handleLinkClick('/products')} className="hover:text-white transition-colors">Products</Link></li>
                        <li><Link to="/trainers" onClick={() => handleLinkClick('/trainers')} className="hover:text-white transition-colors">Trainers</Link></li>
                        <li><Link to="/events" onClick={() => handleLinkClick('/events')} className="hover:text-white transition-colors">Events</Link></li>
                        <li><Link to="/contact" onClick={() => handleLinkClick('/contact')} className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Connect</h4>
                    <p className="text-sm text-slate-400 mb-2">
                        <strong>Email:</strong> info@phtechconsultant.com
                    </p>
                    <p className="text-sm text-slate-400">
                        <strong>Location:</strong> Noida
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-blue-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} PHTech Consultants. All rights reserved.</p>
                <div className="space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
