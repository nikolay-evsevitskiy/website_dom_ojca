import { Language } from '../types';

/**
 * Interface for translation service
 * Follows DIP - Dependency Inversion Principle
 * Components depend on abstraction, not concrete implementation
 */
export interface ITranslationService {
  getTranslation(language: Language): any;
  getDonationTranslation(language: Language): any;
}

/**
 * Interface for theme service
 * Follows DIP - Dependency Inversion Principle
 */
export interface IThemeService {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
