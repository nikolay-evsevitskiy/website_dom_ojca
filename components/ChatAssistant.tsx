import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, Language } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAssistantProps {
  language: Language;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when language changes or initialize
  useEffect(() => {
    let welcomeText = 'Szczęść Boże! Witaj w Domu Ojca. W czym mogę Ci dzisiaj pomóc?';
    if (language === 'en') welcomeText = 'God bless! Welcome to Father\'s House. How can I help you today?';
    if (language === 'ua') welcomeText = 'Слава Богу! Ласкаво просимо. Чим можу допомогти?';
    if (language === 'be') welcomeText = 'Слава Богу! Вітаем. Чым магу дапамагчы?';
    if (language === 'ru') welcomeText = 'Слава Богу! Добро пожаловать. Чем могу помочь?';

    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Append language instruction
      const languageNames: Record<Language, string> = {
        pl: 'Polish',
        en: 'English',
        ua: 'Ukrainian',
        be: 'Belarusian',
        ru: 'Russian'
      };
      const prompt = `${input} (Please reply in ${languageNames[language]} language)`;

      const responseText = await sendMessageToGemini(history, prompt);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gold-500 hover:bg-gold-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle size={24} />
        <span className="font-medium hidden sm:inline">
          {language === 'pl' ? 'Zapytaj asystenta' : language === 'en' ? 'Ask Assistant' : 'Assistant'}
        </span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] bg-white dark:bg-church-dark rounded-none sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 transform border dark:border-gray-800 ${
          isOpen ? 'translate-y-0 opacity-100 h-[600px] max-h-[100dvh]' : 'translate-y-20 opacity-0 pointer-events-none h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-600 to-gold-500 text-white p-4 sm:rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-semibold">Asystent Domu Ojca</h3>
              <p className="text-xs text-white/80">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#121212]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gold-500 text-white rounded-br-none'
                    : 'bg-white dark:bg-church-dark border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-church-dark border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-gold-500" />
                <span className="text-xs text-gray-500 dark:text-gray-400">...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-church-dark sm:rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'pl' ? "Zadaj pytanie..." : language === 'en' ? "Ask a question..." : "..."}
              className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder-gray-400 dark:placeholder-gray-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gold-500 text-white p-2 rounded-full hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;