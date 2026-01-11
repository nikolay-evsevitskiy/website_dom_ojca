import React from 'react';
import { Heart, CreditCard, Building2, Copy, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface DonationPageProps {
  language: Language;
}

const DonationPage: React.FC<DonationPageProps> = ({ language }) => {
  const t = translations[language].donation;
  const [copied, setCopied] = React.useState(false);

  // Данные банковского счета (можно вынести в константы)
  const bankAccount = {
    number: '12 3456 7890 1234 5678 9012 3456',
    name: 'Kościół Dom Ojca',
    swift: 'BPKOPLPW',
    purpose: 'Darowizna na działalność kościoła'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t.accountNumber}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={bankAccount.number}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono text-lg"
                />
                <button
                  onClick={() => copyToClipboard(bankAccount.number)}
                  className="p-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
                  title="Kopiuj"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t.accountName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={bankAccount.name}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(bankAccount.name)}
                  className="p-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                SWIFT
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={bankAccount.swift}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono"
                />
                <button
                  onClick={() => copyToClipboard(bankAccount.swift)}
                  className="p-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {t.purpose}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={bankAccount.purpose}
                  className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(bankAccount.purpose)}
                  className="p-3 bg-gold-500 hover:bg-gold-600 text-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
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
              {language === 'pl' 
                ? 'Możesz również dokonać płatności online za pomocą karty kredytowej lub debetowej.'
                : language === 'ua'
                ? 'Ви також можете здійснити онлайн платіж за допомогою кредитної або дебетової картки.'
                : language === 'be'
                ? 'Вы таксама можаце ажыццявіць анлайн плацёж з дапамогай крэдытнай або дэбетовай карткі.'
                : 'Вы также можете осуществить онлайн платеж с помощью кредитной или дебетовой карты.'}
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {language === 'pl'
                  ? 'Funkcja płatności online będzie dostępna wkrótce'
                  : language === 'ua'
                  ? 'Функція онлайн оплати буде доступна незабаром'
                  : language === 'be'
                  ? 'Функцыя анлайн аплаты будзе даступная хутка'
                  : 'Функция онлайн оплаты будет доступна в ближайшее время'}
              </p>
              <button
                disabled
                className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
              >
                {language === 'pl' ? 'Wkrótce' : language === 'ua' ? 'Незабаром' : language === 'be' ? 'Хутка' : 'Скоро'}
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

