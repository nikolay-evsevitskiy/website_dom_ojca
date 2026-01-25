export interface ServiceTime {
  day: string;
  time: string;
  description: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  videoUrl?: string; // Placeholder for YouTube link
  duration: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERMONS = 'SERMONS',
  EVENTS = 'EVENTS',
  CONTACT = 'CONTACT',
  DONATION = 'DONATION'
}

export type Language = 'pl' | 'be' | 'ua' | 'ru' | 'en';