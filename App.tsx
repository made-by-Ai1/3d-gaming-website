import React from 'react';
import { Hero3D } from './components/Hero3D';
import { GameCard } from './components/GameCard';
import { ChatWidget } from './components/ChatWidget';
import { Game } from './types';
import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';

// Mock Data
const FEATURED_GAMES: Game[] = [
  {
    id: 1,
    title: "سایبرپانک: تهران ۲۰۸۸",
    category: "RPG / Action",
    rating: 4.8,
    image: "https://picsum.photos/400/300?random=1",
    price: "۱,۲۰۰,۰۰۰ تومان"
  },
  {
    id: 2,
    title: "افسانه زاگرس",
    category: "Adventure",
    rating: 4.9,
    image: "https://picsum.photos/400/300?random=2",
    price: "۸۵۰,۰۰۰ تومان"
  },
  {
    id: 3,
    title: "مسابقات سرعت کهکشان",
    category: "Racing",
    rating: 4.5,
    image: "https://picsum.photos/400/300?random=3",
    price: "رایگان"
  },
  {
    id: 4,
    title: "مدافعان خلیج فارس",
    category: "Strategy",
    rating: 4.7,
    image: "https://picsum.photos/400/300?random=4",
    price: "۶۰۰,۰۰۰ تومان"
  },
  {
    id: 5,
    title: "سکوت فضایی",
    category: "Horror",
    rating: 4.6,
    image: "https://picsum.photos/400/300?random=5",
    price: "۹۸۰,۰۰۰ تومان"
  },
  {
    id: 6,
    title: "آرنا: نبرد نهایی",
    category: "Multiplayer",
    rating: 4.3,
    image: "https://picsum.photos/400/300?random=6",
    price: "رایگان"
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-neon-purple selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
               <Gamepad2 className="text-neon-purple w-8 h-8" />
               <span className="text-2xl font-black tracking-tighter text-white">
                 NEX<span className="text-neon-cyan">GEN</span>
               </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <a href="#" className="hover:text-neon-cyan transition-colors">خانه</a>
              <a href="#" className="hover:text-neon-cyan transition-colors">بازی‌ها</a>
              <a href="#" className="hover:text-neon-cyan transition-colors">مسابقات</a>
              <a href="#" className="hover:text-neon-cyan transition-colors">اخبار</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 transition-colors">ورود</button>
              <button className="bg-neon-cyan text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]">عضویت</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero with 3D */}
        <Hero3D />

        {/* Stats Section */}
        <div className="bg-slate-900 py-10 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <Zap className="w-8 h-8 mx-auto text-neon-cyan mb-2" />
              <div className="text-3xl font-black text-white">240+</div>
              <div className="text-gray-400 text-sm">بازی جدید</div>
            </div>
            <div className="p-4">
              <Users className="w-8 h-8 mx-auto text-neon-purple mb-2" />
              <div className="text-3xl font-black text-white">50K+</div>
              <div className="text-gray-400 text-sm">کاربر فعال</div>
            </div>
            <div className="p-4">
              <Trophy className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-3xl font-black text-white">12</div>
              <div className="text-gray-400 text-sm">تورنمنت فعال</div>
            </div>
             <div className="p-4">
              <Gamepad2 className="w-8 h-8 mx-auto text-green-400 mb-2" />
              <div className="text-3xl font-black text-white">3D</div>
              <div className="text-gray-400 text-sm">محیط تعاملی</div>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <section className="py-20 px-4 relative">
           {/* Background Glow */}
           <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px] pointer-events-none"></div>
           <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[128px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">بازی‌های <span className="text-neon-purple">برگزیده</span></h2>
                <p className="text-gray-400">محبوب‌ترین بازی‌های این هفته در ایران</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-neon-cyan hover:text-white transition-colors font-medium">
                مشاهده همه
                <span className="text-xl">&larr;</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_GAMES.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
                <button className="text-neon-cyan font-bold border border-neon-cyan/50 px-6 py-3 rounded-xl w-full">مشاهده همه بازی‌ها</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-900 to-slate-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden border border-slate-700 shadow-2xl">
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black mb-6">آماده ورود به دنیای جدید هستی؟</h2>
               <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                 همین حالا ثبت نام کن و به بزرگترین کامیونیتی گیمرهای ایرانی بپیوند. دسترسی نامحدود به تورنمنت‌ها و جوایز ویژه.
               </p>
               <button className="bg-white text-purple-900 font-black text-lg px-10 py-4 rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 عضویت رایگان
               </button>
             </div>
             {/* Abstract Shapes */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-cyan/20 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-pink/20 rounded-full blur-3xl"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-right">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Gamepad2 className="text-neon-purple" />
                <span className="font-black text-xl">NEXGEN</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                اولین پلتفرم تمام سه بعدی گیمینگ در ایران با قابلیت‌های هوش مصنوعی و تورنمنت‌های آنلاین.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">لینک‌های مفید</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-neon-cyan">درباره ما</a></li>
                <li><a href="#" className="hover:text-neon-cyan">تماس با ما</a></li>
                <li><a href="#" className="hover:text-neon-cyan">قوانین و مقررات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">جامعه</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-neon-cyan">دیسکورد</a></li>
                <li><a href="#" className="hover:text-neon-cyan">تلگرام</a></li>
                <li><a href="#" className="hover:text-neon-cyan">اینستاگرام</a></li>
              </ul>
            </div>
             <div>
              <h4 className="font-bold text-white mb-4">خبرنامه</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="ایمیل شما" className="bg-slate-900 border border-slate-800 text-white text-sm rounded-lg px-3 py-2 w-full focus:outline-none focus:border-neon-purple" />
                <button className="bg-neon-purple text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">ثبت</button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-xs pt-8 border-t border-slate-900">
            © ۲۰۲۴ تمامی حقوق برای NexGen محفوظ است. طراحی شده با ❤️ برای گیمرهای ایران.
          </div>
        </div>
      </footer>

      {/* Floating Chat */}
      <ChatWidget />
    </div>
  );
};

export default App;