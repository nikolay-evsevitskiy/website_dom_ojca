import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import { PageView, Language } from './types';
import { getUpcomingEvents, getLatestSermons, getMinistries } from './constants';
import { Calendar, Clock, MapPin, Play, ArrowRight, Heart, Users, Flame, HandHeart } from 'lucide-react';
import { Logo } from './components/Logo';
import { translations } from './translations';

// Helper component for icons in Ministries
const IconMap: Record<string, React.ElementType> = {
  Heart, Users, Flame, HandHeart
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [language, setLanguage] = useState<Language>('pl');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const t = translations[language];

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
              src="./components/images/imgWroclaw.png" 
              alt="Wrocław Panorama"
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-church-dark/90 dark:to-church-darker"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full pt-24 md:pt-32 pb-24 md:pb-32">
          <div className="mb-4 md:mb-6 animate-fade-in-up">
            <Logo className="w-32 h-32 md:w-48 md:h-48 text-gold-500 mx-auto mb-4 md:mb-6" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight px-2">
            {t.hero.welcome} 
            <div className="text-gold-500">{t.hero.churchName}</div>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-10 max-w-2xl mx-auto font-light px-2">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20 px-2">
            <button 
              onClick={() => setCurrentPage(PageView.EVENTS)}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-gold-500 text-white rounded-full font-semibold hover:bg-gold-600 transition-all transform hover:scale-105 shadow-lg shadow-gold-500/30 relative z-20 text-sm md:text-base"
            >
              {t.hero.joinUs}
            </button>
            <button 
              onClick={() => setCurrentPage(PageView.SERMONS)}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-church-dark transition-all relative z-20 text-sm md:text-base"
            >
              {t.hero.watchOnline}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <ArrowRight className="transform rotate-90" />
        </div>
      </section>

      {/* Service Times Card */}
      <section className="bg-church-light dark:bg-church-dark py-20 px-4 -mt-20 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t-4 border-gold-500">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">{t.service.invite}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t.service.subInvite}</p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <Clock className="text-gold-500 w-8 h-8" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">11:00</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.service.mainService}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-left">
              <MapPin className="text-gold-500 w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">ul. Sołtysowicka 62A</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">51-168 Wrocław</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-24 bg-white dark:bg-church-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gold-500 font-semibold tracking-wider uppercase mb-3">{t.ministries.forEveryone}</h2>
            <h3 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">{t.ministries.ourMinistries}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getMinistries(language).map((m, idx) => {
              const Icon = IconMap[m.icon];
              return (
                <div key={idx} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gold-500 dark:hover:bg-gold-600 transition-all duration-300 text-center hover:shadow-xl cursor-default">
                  <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="text-gold-500 dark:text-gold-400 group-hover:text-gold-500 w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors">{m.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Sermon Preview */}
      <section className="py-24 bg-church-dark dark:bg-church-darker text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Logo className="w-96 h-96 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-gold-500 font-semibold tracking-wider uppercase mb-3">{t.sermons.teaching}</h2>
              <h3 className="text-4xl font-serif font-bold">{t.sermons.latest}</h3>
            </div>
            <button 
              onClick={() => setCurrentPage(PageView.SERMONS)}
              className="hidden md:flex items-center gap-2 text-gold-500 hover:text-white transition-colors mt-4 md:mt-0"
            >
              {t.sermons.archive} <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getLatestSermons(language).slice(0, 3).map((sermon) => (
              <div key={sermon.id} className="bg-white/5 rounded-xl overflow-hidden group hover:bg-white/10 transition-colors border border-white/10">
                <div className="relative aspect-video bg-gray-800">
                  <img src={`https://picsum.photos/seed/${sermon.id}/400/225`} alt={sermon.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center pl-1 transform scale-90 group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="text-white fill-current" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>{sermon.date}</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-1 group-hover:text-gold-500 transition-colors">{sermon.title}</h4>
                  <p className="text-gray-400">{sermon.speaker}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentPage(PageView.SERMONS)}
            className="md:hidden w-full mt-8 py-3 border border-white/20 rounded-lg text-center hover:bg-white/5 transition-colors"
          >
            {t.sermons.watchAll}
          </button>
        </div>
      </section>
    </>
  );

  const renderContent = () => {
    switch (currentPage) {
      case PageView.EVENTS:
        return (
          <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
             <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">{t.events.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.events.subTitle}</p>
            </div>
            <div className="space-y-6">
              {getUpcomingEvents(language).map(event => (
                <div key={event.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-gold-500 font-semibold mb-2">
                      <Calendar size={18} />
                      <span>{event.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{event.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{event.description}</p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin size={18} className="mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case PageView.SERMONS:
        return (
          <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
             <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">{t.sermons.mainTitle}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.sermons.subTitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getLatestSermons(language).map(sermon => (
                <div key={sermon.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                    <img src={`https://picsum.photos/seed/${sermon.id}/600/340`} alt={sermon.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                       <Play className="text-white w-12 h-12 opacity-90 group-hover:scale-110 transition-transform" fill="currentColor" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gold-500 font-medium mb-1">{sermon.date}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{sermon.speaker}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case PageView.CONTACT:
        return (
           <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">{t.contact.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">{t.contact.subTitle}</p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full text-gold-600 dark:text-gold-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t.contact.address}</h3>
                      <p className="text-gray-600 dark:text-gray-300">ul. Sołtysowicka 62A<br />51-168 Wrocław</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full text-gold-600 dark:text-gold-400">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t.contact.office}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t.contact.hours}<br />9:00 - 15:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.contact.nameLabel}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.contact.messageLabel}</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"></textarea>
                  </div>
                  <button className="w-full py-4 bg-gold-500 text-white font-bold rounded-xl hover:bg-gold-600 transition-colors shadow-lg">
                    {t.contact.sendButton}
                  </button>
                </form>
              </div>
            </div>
           </div>
        );
      case PageView.ABOUT:
         return (
          <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 min-h-screen text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">{t.about.title}</h1>
            <img src="https://picsum.photos/id/292/1200/600" alt="Community" className="w-full rounded-2xl shadow-xl mb-12" />
            <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300 text-left">
              <p className="mb-6">
                {t.about.description}
              </p>
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">{t.about.visionTitle}</h3>
              <p className="mb-6">
                {t.about.visionDesc}
              </p>
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">{t.about.leadersTitle}</h3>
              <p>
                {t.about.leadersDesc}
              </p>
            </div>
          </div>
         );
      default:
        return renderHome();
    }
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