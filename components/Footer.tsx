import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;
  const tc = translations[language].contact;
  const tn = translations[language].nav;
  const th = translations[language].hero;

  return (
    <footer className="bg-church-dark dark:bg-black text-white pt-16 pb-8 border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="text-gold-500 w-8 h-8" />
              <span className="font-serif text-xl font-bold">{th.churchName.toUpperCase()}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">{t.shortcuts}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{tn.about}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{tn.sermons}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.groups}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.support}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">{tn.contact}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-gold-500" />
                <span>ul. Sołtysowicka 62A<br/>51-168 Wrocław</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-500" />
                <span>+48 71 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-500" />
                <span>biuro@domojca.pl</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">Social Media</h3>
            <div className="flex space-x-4">
              {/* <a href="#" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-gold-500 hover:text-white transition-all">
                <Facebook size={20} />
              </a> */}
              <a href="https://www.instagram.com/domojca.wroclaw/" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-gold-500 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@DomOjca-Wroclaw" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-gold-500 hover:text-white transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {th.churchName} Wrocław. {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;