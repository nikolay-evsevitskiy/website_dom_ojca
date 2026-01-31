import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import { PageView, Language } from './types';
import { useTheme } from './hooks/useTheme';
import { PageRouter } from './routing/PageRouter';
import { HomePage } from './pages/HomePage';
import { getPageFromPath } from './routing/routes';

/**
 * Main App Component
 * Refactored to follow SOLID principles:
 * - SRP: Separated concerns (theme, routing, pages)
 * - OCP: Open for extension via PageRouter
 * - DIP: Depends on abstractions (hooks, components)
 */
function App() {
  const { pathname } = useLocation();
  const currentPage = getPageFromPath(pathname);
  const [language, setLanguage] = useState<Language>('pl');
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-church-darker text-white' : 'bg-white text-gray-900'} selection:bg-gold-200 selection:text-gold-900`}>
      <Navigation
        currentPage={currentPage}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main>
        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/about" element={<PageRouter currentPage={PageView.ABOUT} language={language} />} />
          <Route path="/sermons" element={<PageRouter currentPage={PageView.SERMONS} language={language} />} />
          <Route path="/events" element={<PageRouter currentPage={PageView.EVENTS} language={language} />} />
          <Route path="/contact" element={<PageRouter currentPage={PageView.CONTACT} language={language} />} />
          <Route path="/donation" element={<PageRouter currentPage={PageView.DONATION} language={language} />} />
        </Routes>
      </main>

      <Footer language={language} />
      <ChatAssistant language={language} />
    </div>
  );
}

export default App;