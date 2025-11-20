
import { User } from '../types';

const DB_KEY = 'nexgen_users_db';
const SESSION_KEY = 'nexgen_session_user';

// Mock Hashing (In production, use bcrypt/argon2 on server side)
const hashPassword = (password: string): string => {
  return btoa(password).split('').reverse().join('') + '_salted';
};

export const authService = {
  // Get all users from "Database"
  getUsers: (): User[] => {
    const usersStr = localStorage.getItem(DB_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  },

  // Save users to "Database"
  saveUsers: (users: User[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
  },

  // Register new user
  register: async (username: string, email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = authService.getUsers();
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      throw new Error('این ایمیل قبلاً ثبت شده است.');
    }
    if (users.find(u => u.username === username)) {
      throw new Error('این نام کاربری قبلاً گرفته شده است.');
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    authService.saveUsers(users);
    
    // Auto login after register
    authService.createSession(newUser);
    
    return newUser;
  },

  // Login user
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = authService.getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('کاربری با این ایمیل یافت نشد.');
    }

    if (user.passwordHash !== hashPassword(password)) {
      throw new Error('رمز عبور اشتباه است.');
    }

    authService.createSession(user);
    return user;
  },

  // Session Management
  createSession: (user: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(SESSION_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  }
};
