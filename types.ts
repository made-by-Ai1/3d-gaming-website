
export interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string;
  price: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}

export interface Tournament {
  id: number;
  title: string;
  game: string;
  prizePool: string;
  date: string;
  image: string;
  status: 'open' | 'ongoing' | 'finished';
  participants: number;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In a real app, never store plain passwords
  createdAt: string;
}

export enum AppSection {
  HOME = 'home',
  GAMES = 'games',
  NEWS = 'news',
  TOURNAMENTS = 'tournaments',
  PROFILE = 'profile'
}