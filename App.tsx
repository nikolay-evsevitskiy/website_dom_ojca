import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import { PageView, Language } from './types';
import { translations } from './translations';
import { useTheme } from './hooks/useTheme';
import { PageRouter } from './routing/PageRouter';
import { HomePage } from './pages/HomePage';

/**
 * Main App Component
 * Refactored to follow SOLID principles:
 * - SRP: Separated concerns (theme, routing, pages)
 * - OCP: Open for extension via PageRouter
 * - DIP: Depends on abstractions (hooks, components)
 */
function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [language, setLanguage] = useState<Language>('pl');
  const { isDarkMode, toggleTheme } = useTheme();

  const t = translations[language];

  const handleNavigateToEvents = () => setCurrentPage(PageView.EVENTS);
  const handleNavigateToSermons = () => setCurrentPage(PageView.SERMONS);

  const renderContent = () => {
    if (currentPage === PageView.HOME) {
      return (
        <HomePage
          language={language}
          onNavigateToEvents={handleNavigateToEvents}
          onNavigateToSermons={handleNavigateToSermons}
        />
      );
    }
    return <PageRouter currentPage={currentPage} language={language} />;
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-church-darker text-white' : 'bg-white text-gray-900'} selection:bg-gold-200 selection:text-gold-900`}>
      <Navigation 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main>
        {renderContent()}
      </main>

      <Footer language={language} />
      <ChatAssistant language={language} />
    </div>
  );
}

export default App;