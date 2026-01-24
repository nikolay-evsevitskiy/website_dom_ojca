import React, { useMemo, useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { sendContactMessage } from '../services/contactService';

interface ContactFormProps {
  language: Language;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const t = translations[language].contact;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 1 &&
      isValidEmail(email) &&
      message.trim().length > 5 &&
      status !== 'sending'
    );
  }, [name, email, message, status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (name.trim().length <= 1 || message.trim().length <= 5 || !isValidEmail(email)) {
      setStatus('error');
      setErrorMessage(t.formInvalid);
      return;
    }

    try {
      setStatus('sending');
      await sendContactMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Contact form submit failed:', err);
      setStatus('error');
      setErrorMessage(t.formError);
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.nameLabel}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder={t.namePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.emailLabel}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.messageLabel}
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all"
        />
      </div>

      {status === 'success' ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-200">
          {t.formSuccess}
        </div>
      ) : null}

      {status === 'error' && errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full py-4 font-bold rounded-xl transition-colors shadow-lg ${
          canSubmit
            ? 'bg-gold-500 text-white hover:bg-gold-600'
            : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {status === 'sending' ? t.formSending : t.sendButton}
      </button>
    </form>
  );
};

