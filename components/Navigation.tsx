import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { PageView, Language } from '../types';
import { translations } from '../translations';

interface NavigationProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  setPage, 
  language, 
  setLanguage,
  isDarkMode,
  toggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.home, value: PageView.HOME },
    { label: t.about, value: PageView.ABOUT },
    { label: t.sermons, value: PageView.SERMONS },
    { label: t.events, value: PageView.EVENTS },
    { label: t.contact, value: PageView.CONTACT },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'pl', label: 'PL' },
    { code: 'be', label: 'BE' },
    { code: 'ua', label: 'UA' },
    { code: 'ru', label: 'RU' },
  ];

  // Определяем, должна ли навигация иметь темный текст (на страницах кроме главной или при прокрутке)
  const shouldHaveDarkText = currentPage !== PageView.HOME || isScrolled;
  const shouldHaveBackground = currentPage !== PageView.HOME || isScrolled;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        shouldHaveBackground
          ? 'bg-white dark:bg-church-dark shadow-md py-2 border-b dark:border-gray-800' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer gap-3" 
            onClick={() => setPage(PageView.HOME)}
          >
            <Logo className={`w-10 h-10 ${shouldHaveDarkText ? 'text-gold-500' : 'text-white'}`} />
            <span className={`font-serif text-xl font-bold tracking-wide ${
              shouldHaveDarkText ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              DOM OJCA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setPage(link.value)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === link.value
                    ? 'text-gold-500' 
                    : shouldHaveDarkText
                      ? 'text-gray-700 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400' 
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  shouldHaveDarkText ? 'text-gray-700 dark:text-gray-300' : 'text-white'
                }`}
              >
                <Globe size={18} />
                <span className="uppercase">{language}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-church-darker rounded-md shadow-lg py-1 border border-gray-100 dark:border-gray-800">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        language === lang.code ? 'text-gold-500 font-bold' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                shouldHaveDarkText ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`${shouldHaveDarkText ? 'text-gray-900 dark:text-white' : 'text-white'}`}
            >
               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${shouldHaveDarkText ? 'text-gray-900 dark:text-white' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-church-darker shadow-xl absolute w-full top-full left-0 border-t border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setPage(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === link.value
                    ? 'bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-2">
              <p className="px-3 text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase">Język / Mowa</p>
              <div className="flex gap-2 px-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded border ${
                      language === lang.code
                        ? 'bg-gold-500 text-white border-gold-500'
                        : 'bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;