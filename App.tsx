import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GeneratorPage } from './pages/GeneratorPage';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };

        // Set initial route if hash is empty
        if (window.location.hash === '') {
            window.location.hash = '#/';
        }
        setRoute(window.location.hash);

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderPage = () => {
        switch (route) {
            case '#/generator':
                return <GeneratorPage />;
            case '#/':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

export default App;
