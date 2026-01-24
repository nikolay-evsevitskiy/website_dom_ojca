import React from 'react';
import { Calendar, Clock, MapPin, Play, ArrowRight, Heart, Users, Flame, HandHeart } from 'lucide-react';
import { Language } from '../types';
import { getUpcomingEvents, getLatestSermons, getMinistries } from '../constants';
import { translations } from '../translations';
import { Logo } from '../components/Logo';

interface HomePageProps {
  language: Language;
  onNavigateToEvents: () => void;
  onNavigateToSermons: () => void;
}

// Helper component for icons in Ministries
const IconMap: Record<string, React.ElementType> = {
  Heart,
  Users,
  Flame,
  HandHeart,
};

/**
 * HomePage Component
 * Follows SRP - single responsibility for home page display
 */
export const HomePage: React.FC<HomePageProps> = ({
  language,
  onNavigateToEvents,
  onNavigateToSermons,
}) => {
  const t = translations[language];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${(import.meta as any).env?.BASE_URL || '/'}components/images/imgWroclaw.png`}
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
            {t.hero.welcome}{' '}
            <span className="text-gold-500">{t.hero.churchName}</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-10 max-w-2xl mx-auto font-light px-2">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20 px-2">
            <button
              onClick={onNavigateToEvents}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-gold-500 text-white rounded-full font-semibold hover:bg-gold-600 transition-all transform hover:scale-105 shadow-lg shadow-gold-500/30 relative z-20 text-sm md:text-base"
            >
              {t.hero.joinUs}
            </button>
            <button
              onClick={onNavigateToSermons}
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
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                {t.service.invite}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{t.service.subInvite}</p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                <Clock className="text-gold-500 w-8 h-8" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg">11:00</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.service.mainService}
                  </p>
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
            <h2 className="text-gold-500 font-semibold tracking-wider uppercase mb-3">
              {t.ministries.forEveryone}
            </h2>
            <h3 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
              {t.ministries.ourMinistries}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getMinistries(language).map((m, idx) => {
              const Icon = IconMap[m.icon];
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gold-500 dark:hover:bg-gold-600 transition-all duration-300 text-center hover:shadow-xl cursor-default"
                >
                  <div className="bg-white dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="text-gold-500 dark:text-gold-400 group-hover:text-gold-500 w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors">
                    {m.title}
                  </h4>
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
              <h2 className="text-gold-500 font-semibold tracking-wider uppercase mb-3">
                {t.sermons.teaching}
              </h2>
              <h3 className="text-4xl font-serif font-bold">{t.sermons.latest}</h3>
            </div>
            <button
              onClick={onNavigateToSermons}
              className="hidden md:flex items-center gap-2 text-gold-500 hover:text-white transition-colors mt-4 md:mt-0"
            >
              {t.sermons.archive} <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getLatestSermons(language).slice(0, 3).map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white/5 rounded-xl overflow-hidden group hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="relative aspect-video bg-gray-800">
                  <img
                    src={`https://picsum.photos/seed/${sermon.id}/400/225`}
                    alt={sermon.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
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
                  <h4 className="text-xl font-bold mb-1 group-hover:text-gold-500 transition-colors">
                    {sermon.title}
                  </h4>
                  <p className="text-gray-400">{sermon.speaker}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNavigateToSermons}
            className="md:hidden w-full mt-8 py-3 border border-white/20 rounded-lg text-center hover:bg-white/5 transition-colors"
          >
            {t.sermons.watchAll}
          </button>
        </div>
      </section>
    </>
  );
};
