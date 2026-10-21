import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Outline, { Marquee } from './components/Outline';
import Impact from './components/Impact';
import Pricing from './components/Pricing';
import Videos from './components/Videos';
import Register from './components/Register';
import Footer from './components/Footer';

const App = () => {
    // Wrapped in an object so picking the same plan twice still re-triggers the form highlight
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleSelectPackage = (name) => {
        setSelectedPackage({ name });
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="min-h-screen overflow-x-clip font-sans">
                <Navbar />
                <main>
                    <Hero />
                    <Marquee />
                    <Outline />
                    <Impact />
                    <Pricing onSelect={handleSelectPackage} />
                    <Videos />
                    <Register selectedPackage={selectedPackage} />
                </main>
                <Footer />
            </div>
        </MotionConfig>
    );
};

export default App;
