import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GeneratorPage } from './pages/GeneratorPage';

const App: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

    const isGeneratorPage = route === '#/generator';

    const renderPage = () => {
        switch (route) {
            case '#/generator':
                return <GeneratorPage isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />;
            case '#/':
            default:
                return <LandingPage />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen}
                showMenuButton={isGeneratorPage}
            />
            <main className="flex-grow">
                {renderPage()}
            </main>
            {isGeneratorPage ? null : <Footer />}
        </div>
    );
};

export default App;
