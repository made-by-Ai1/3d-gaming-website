
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLogin: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setMode(initialMode);
    if (isOpen) {
        resetForm();
    }
  }, [initialMode, isOpen]);

  const resetForm = () => {
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setValidationErrors({ username: '', email: '', password: '', confirmPassword: '' });
    setError(null);
    setSuccessMsg(null);
  };

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'لطفا یک ایمیل معتبر وارد کنید.';
      isValid = false;
    }

    // Password Validation (Min 8 chars, 1 uppercase, 1 number, 1 special char)
    // Note: For demo simplicity, we might relax this slightly or keep it strict
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!formData.password) {
        newErrors.password = 'رمز عبور الزامی است.';
        isValid = false;
    } else if (mode === 'register' && !passwordRegex.test(formData.password)) {
       newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، عدد و کاراکتر خاص (@$!%) باشد.';
       isValid = false;
    }

    if (mode === 'register') {
        if (formData.username.length < 3) {
            newErrors.username = 'نام کاربری باید حداقل ۳ کاراکتر باشد.';
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند.';
            isValid = false;
        }
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
        if (mode === 'register') {
            const user = await authService.register(formData.username, formData.email, formData.password);
            setSuccessMsg('ثبت نام با موفقیت انجام شد!');
            setTimeout(() => {
                onLogin(user.username);
                onClose();
            }, 1500);
        } else {
            const user = await authService.login(formData.email, formData.password);
            setSuccessMsg('خوش آمدید!');
            setTimeout(() => {
                onLogin(user.username);
                onClose();
            }, 1000);
        }
    } catch (err: any) {
        setError(err.message || 'خطایی رخ داده است.');
    } finally {
        setIsLoading(false);
    }
  };

  const switchMode = (newMode: 'login' | 'register') => {
      setMode(newMode);
      resetForm();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors z-10 bg-slate-800/50 rounded-full p-1">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-8 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-800 shrink-0">
           <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
             {mode === 'login' ? 'ورود به نکس‌جن' : 'ثبت نام در نکس‌جن'}
           </h2>
           <p className="text-gray-400 text-sm">
             {mode === 'login' ? 'به دنیای حرفه‌ای‌ها بازگردید' : 'حساب کاربری خود را ایمن بسازید'}
           </p>
        </div>

        {/* Error/Success Message Overlay */}
        {error && (
            <div className="bg-red-500/10 border-y border-red-500/20 p-3 flex items-center gap-2 text-red-400 text-sm px-8">
                <AlertCircle size={16} className="shrink-0" />
                {error}
            </div>
        )}
        {successMsg && (
            <div className="bg-green-500/10 border-y border-green-500/20 p-3 flex items-center gap-2 text-green-400 text-sm px-8">
                <CheckCircle2 size={16} className="shrink-0" />
                {successMsg}
            </div>
        )}

        {/* Scrollable Form Area */}
        <div className="overflow-y-auto p-8 pt-4 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
                <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-1">نام کاربری</label>
                <div className="relative">
                    <User className={`absolute right-3 top-3.5 size={18} ${validationErrors.username ? 'text-red-400' : 'text-gray-500'}`} />
                    <input 
                        type="text" 
                        className={`w-full bg-slate-800 border ${validationErrors.username ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 pr-10 pl-4 text-white focus:border-neon-purple focus:outline-none transition-colors text-sm`}
                        placeholder="مثال: Gamer123"
                        value={formData.username}
                        onChange={e => setFormData({...formData, username: e.target.value})}
                    />
                </div>
                {validationErrors.username && <span className="text-xs text-red-400 block">{validationErrors.username}</span>}
                </div>
            )}

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-1">ایمیل</label>
                <div className="relative">
                    <Mail className={`absolute right-3 top-3.5 size={18} ${validationErrors.email ? 'text-red-400' : 'text-gray-500'}`} />
                    <input 
                        type="email" 
                        className={`w-full bg-slate-800 border ${validationErrors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 pr-10 pl-4 text-white focus:border-neon-purple focus:outline-none transition-colors text-sm`}
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                {validationErrors.email && <span className="text-xs text-red-400 block">{validationErrors.email}</span>}
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-1">رمز عبور</label>
                <div className="relative">
                    <Lock className={`absolute right-3 top-3.5 size={18} ${validationErrors.password ? 'text-red-400' : 'text-gray-500'}`} />
                    <input 
                        type="password" 
                        className={`w-full bg-slate-800 border ${validationErrors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 pr-10 pl-4 text-white focus:border-neon-purple focus:outline-none transition-colors text-sm`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                {validationErrors.password && <span className="text-xs text-red-400 block leading-tight">{validationErrors.password}</span>}
            </div>

            {mode === 'register' && (
                <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 mr-1">تکرار رمز عبور</label>
                <div className="relative">
                    <Lock className={`absolute right-3 top-3.5 size={18} ${validationErrors.confirmPassword ? 'text-red-400' : 'text-gray-500'}`} />
                    <input 
                        type="password" 
                        className={`w-full bg-slate-800 border ${validationErrors.confirmPassword ? 'border-red-500' : 'border-slate-700'} rounded-xl py-3 pr-10 pl-4 text-white focus:border-neon-purple focus:outline-none transition-colors text-sm`}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                </div>
                {validationErrors.confirmPassword && <span className="text-xs text-red-400 block">{validationErrors.confirmPassword}</span>}
            </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-neon-purple hover:bg-purple-600 disabled:bg-slate-700 disabled:text-gray-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.6)] transition-all transform active:scale-95 flex justify-center items-center gap-2 mt-6"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                <>
                    {mode === 'login' ? 'ورود به حساب' : 'ثبت نام نهایی'}
                    <ArrowRight size={18} className="rotate-180" />
                </>
                )}
            </button>

            <div className="text-center mt-4 pt-4 border-t border-slate-800">
                <p className="text-sm text-gray-400">
                {mode === 'login' ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت نام کرده‌اید؟'}
                <button 
                    type="button"
                    onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                    className="text-neon-cyan font-bold mr-2 hover:underline transition-all"
                >
                    {mode === 'login' ? 'ثبت نام کنید' : 'وارد شوید'}
                </button>
                </p>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};
