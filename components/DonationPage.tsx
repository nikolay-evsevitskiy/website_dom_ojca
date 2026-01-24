import React from 'react';
import { Heart, CreditCard, Building2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { BANK_ACCOUNT } from '../constants/bankAccount';
import { BankAccountField } from './ui/BankAccountField';

interface DonationPageProps {
  language: Language;
}

/**
 * DonationPage Component
 * Follows SRP - single responsibility for donation page display
 * Uses reusable components and hooks
 */
const DonationPage: React.FC<DonationPageProps> = ({ language }) => {
  const t = translations[language].donation;

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gold-100 dark:bg-gold-900/30 rounded-full mb-6">
          <Heart className="text-gold-600 dark:text-gold-400 w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Description */}
      <div className="bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 rounded-2xl p-8 mb-12 text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          {t.description}
        </p>
        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          {t.verse}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bank Transfer */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full">
              <Building2 className="text-gold-600 dark:text-gold-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              {t.bankTransfer}
            </h2>
          </div>

          <div className="space-y-4">
            <BankAccountField
              label={t.accountNumber}
              value={BANK_ACCOUNT.number}
              isMonospace
            />
            <BankAccountField
              label={t.accountName}
              value={BANK_ACCOUNT.name}
            />
            <BankAccountField
              label={t.purpose}
              value={BANK_ACCOUNT.purpose}
            />
          </div>
        </div>

        {/* Online Payment */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gold-100 dark:bg-gold-900/30 p-3 rounded-full">
              <CreditCard className="text-gold-600 dark:text-gold-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              {t.onlinePayment}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              {t.onlinePaymentDesc}
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t.onlinePaymentSoon}
              </p>
              <button
                disabled
                className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
              >
                {t.soon}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 text-gold-600 dark:text-gold-400">
          <Heart className="w-5 h-5" />
          <p className="text-lg font-semibold">{t.thankYou}</p>
          <Heart className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default DonationPage;

