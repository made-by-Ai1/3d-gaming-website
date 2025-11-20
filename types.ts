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

export enum AppSection {
  HOME = 'home',
  GAMES = 'games',
  NEWS = 'news',
  COMMUNITY = 'community'
}