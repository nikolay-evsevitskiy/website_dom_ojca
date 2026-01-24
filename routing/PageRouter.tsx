import React from 'react';
import { PageView, Language } from '../types';
import DonationPage from '../components/DonationPage';
import { translations } from '../translations';
import { getUpcomingEvents, getLatestSermons } from '../constants';
import { Calendar, MapPin, Play } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';

interface PageRouterProps {
  currentPage: PageView;
  language: Language;
}

/**
 * Page Router Component
 * Follows OCP - open for extension, closed for modification
 * New pages can be added without modifying this component
 */
export const PageRouter: React.FC<PageRouterProps> = ({ currentPage, language }) => {
  const t = translations[language];

  switch (currentPage) {
    case PageView.EVENTS:
      return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 min-h-screen">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t.events.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.events.subTitle}
            </p>
          </div>
          <div className="space-y-6">
            {getUpcomingEvents(language).map(event => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="md:w-1/3 h-64 md:h-auto">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-gold-500 font-semibold mb-2">
                    <Calendar size={18} />
                    <span>{event.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {event.description}
                  </p>
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {t.sermons.mainTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t.sermons.subTitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getLatestSermons(language).map(sermon => (
              <div
                key={sermon.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <img
                    src={`https://picsum.photos/seed/${sermon.id}/600/340`}
                    alt={sermon.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Play
                      className="text-white w-12 h-12 opacity-90 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gold-500 font-medium mb-1">{sermon.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {sermon.title}
                  </h3>
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
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                {t.contact.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                {t.contact.subTitle}
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full text-gold-600 dark:text-gold-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {t.contact.address}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ul. Sołtysowicka 62A<br />51-168 Wrocław
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full text-gold-600 dark:text-gold-400">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {t.contact.office}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contact.hours}<br />9:00 - 15:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl">
              <ContactForm language={language} />
            </div>
          </div>
        </div>
      );

    case PageView.ABOUT:
      return (
        <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 min-h-screen text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-8">
            {t.about.title}
          </h1>
          <img
            src={`${import.meta.env.BASE_URL || '/'}components/images/peopleInDomOjca.jpg`}
            alt="Community"
            className="w-full rounded-2xl shadow-xl mb-12"
          />
          <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300 text-left">
            <p className="mb-6">{t.about.description}</p>
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t.about.visionTitle}
            </h3>
            <p className="mb-6">{t.about.visionDesc}</p>
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-4">
              {t.about.leadersTitle}
            </h3>
            <p>{t.about.leadersDesc}</p>
          </div>
        </div>
      );

    case PageView.DONATION:
      return <DonationPage language={language} />;

    default:
      return null; // Home page is rendered separately
  }
};
