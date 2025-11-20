import React, { useState } from 'react';
import { Hero3D } from './components/Hero3D';
import { GameCard } from './components/GameCard';
import { ChatWidget } from './components/ChatWidget';
import { Game, AppSection, Tournament, NewsItem } from './types';
import { Gamepad2, Trophy, Users, Zap, Calendar, ArrowRight, Newspaper, Filter, Search, Clock } from 'lucide-react';

// --- Mock Data ---

const GAMES_DATA: Game[] = [
  { id: 1, title: "سایبرپانک: تهران ۲۰۸۸", category: "RPG / Action", rating: 4.8, image: "https://picsum.photos/400/300?random=1", price: "۱,۲۰۰,۰۰۰ تومان" },
  { id: 2, title: "افسانه زاگرس", category: "Adventure", rating: 4.9, image: "https://picsum.photos/400/300?random=2", price: "۸۵۰,۰۰۰ تومان" },
  { id: 3, title: "مسابقات سرعت کهکشان", category: "Racing", rating: 4.5, image: "https://picsum.photos/400/300?random=3", price: "رایگان" },
  { id: 4, title: "مدافعان خلیج فارس", category: "Strategy", rating: 4.7, image: "https://picsum.photos/400/300?random=4", price: "۶۰۰,۰۰۰ تومان" },
  { id: 5, title: "سکوت فضایی", category: "Horror", rating: 4.6, image: "https://picsum.photos/400/300?random=5", price: "۹۸۰,۰۰۰ تومان" },
  { id: 6, title: "آرنا: نبرد نهایی", category: "Multiplayer", rating: 4.3, image: "https://picsum.photos/400/300?random=6", price: "رایگان" },
  { id: 7, title: "شکارچی سایه", category: "Action", rating: 4.4, image: "https://picsum.photos/400/300?random=7", price: "۴۵۰,۰۰۰ تومان" },
  { id: 8, title: "فوتبال خیابانی تهران", category: "Sports", rating: 4.2, image: "https://picsum.photos/400/300?random=8", price: "۳۰۰,۰۰۰ تومان" },
];

const TOURNAMENTS_DATA: Tournament[] = [
  { id: 1, title: "جام قهرمانان زاگرس", game: "افسانه زاگرس", prizePool: "۵۰,۰۰۰,۰۰۰ تومان", date: "۱۵ آبان ۱۴۰۳", image: "https://picsum.photos/600/300?random=10", status: 'open', participants: 128 },
  { id: 2, title: "لیگ حرفه‌ای آرنا", game: "آرنا: نبرد نهایی", prizePool: "۱۰۰,۰۰۰,۰۰۰ تومان", date: "۲۰ آذر ۱۴۰۳", image: "https://picsum.photos/600/300?random=11", status: 'ongoing', participants: 256 },
  { id: 3, title: "مسابقات دریفت شبانه", game: "مسابقات سرعت", prizePool: "۲۰,۰۰۰,۰۰۰ تومان", date: "۱ دی ۱۴۰۳", image: "https://picsum.photos/600/300?random=12", status: 'open', participants: 64 },
];

const NEWS_DATA: NewsItem[] = [
  { id: 1, title: "رونمایی از نسل جدید کنسول‌های دستی", summary: "شرکت‌های بزرگ تکنولوژی از کنسول‌های جدید خود با قابلیت اجرای بازی‌های AAA رونمایی کردند.", date: "۲ ساعت پیش", image: "https://picsum.photos/500/300?random=20", category: "تکنولوژی" },
  { id: 2, title: "آپدیت بزرگ برای سایبرپانک منتشر شد", summary: "این آپدیت شامل مراحل جدید داستانی و بهبود گرافیکی چشمگیر برای کارت‌های گرافیک سری جدید است.", date: "دیروز", image: "https://picsum.photos/500/300?random=21", category: "بازی‌ها" },
  { id: 3, title: "مصاحبه با سازندگان افسانه زاگرس", summary: "تیم توسعه‌دهنده ایرانی از چالش‌های ساخت بزرگترین بازی جهان‌باز خاورمیانه می‌گویند.", date: "۳ روز پیش", image: "https://picsum.photos/500/300?random=22", category: "مصاحبه" },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppSection>(AppSection.HOME);

  // --- Sub-Components for Sections ---

  const HomeSection = () => (
    <>
      <Hero3D />
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

      <section className="py-20 px-4 relative">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[128px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">بازی‌های <span className="text-neon-purple">برگزیده</span></h2>
              <p className="text-gray-400">محبوب‌ترین بازی‌های این هفته در ایران</p>
            </div>
            <button onClick={() => setActiveTab(AppSection.GAMES)} className="hidden md:flex items-center gap-2 text-neon-cyan hover:text-white transition-colors font-medium">
              مشاهده همه
              <ArrowRight size={20} className="rotate-180" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAMES_DATA.slice(0, 6).map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

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
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-cyan/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-pink/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </>
  );

  const GamesSection = () => (
    <div className="pt-10 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-black text-white border-r-4 border-neon-cyan pr-4">فروشگاه <span className="text-neon-purple">بازی‌ها</span></h2>
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <input type="text" placeholder="جستجو..." className="w-full bg-slate-800 border border-slate-700 rounded-lg pr-10 pl-4 py-2.5 text-white focus:border-neon-purple outline-none" />
             <Search className="absolute right-3 top-3 text-gray-400" size={18} />
           </div>
           <button className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 hover:bg-slate-700 text-white">
             <Filter size={20} />
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GAMES_DATA.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );

  const TournamentsSection = () => (
    <div className="pt-10 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
       <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">تورنمنت‌های <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">قهرمانی</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">در مسابقات حرفه‌ای شرکت کنید، مهارت خود را به چالش بکشید و جوایز نقدی ارزشمند ببرید.</p>
       </div>

       <div className="grid gap-8">
          {TOURNAMENTS_DATA.map(tourney => (
            <div key={tourney.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-yellow-500/50 transition-all group relative">
               <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="h-48 md:h-auto relative">
                    <img src={tourney.image} alt={tourney.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent md:bg-gradient-to-l opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1">
                       <Gamepad2 size={14} /> {tourney.game}
                    </div>
                  </div>
                  <div className="p-6 md:col-span-2 flex flex-col justify-center relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 md:mb-0 group-hover:text-yellow-400 transition-colors">{tourney.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${tourney.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                          {tourney.status === 'open' ? 'در حال ثبت نام' : 'در حال برگزاری'}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                       <div className="flex items-center gap-2 text-gray-300">
                          <Trophy className="text-yellow-400" size={18} />
                          <span className="font-mono font-bold text-white">{tourney.prizePool}</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="text-neon-cyan" size={18} />
                          <span>{tourney.date}</span>
                       </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Users className="text-neon-purple" size={18} />
                          <span>{tourney.participants} شرکت کننده</span>
                       </div>
                    </div>

                    <div className="flex justify-end">
                       <button className="w-full md:w-auto bg-neon-purple hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)] flex items-center justify-center gap-2">
                         ثبت نام در مسابقات
                         <ArrowRight size={18} className="rotate-180" />
                       </button>
                    </div>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const NewsSection = () => (
    <div className="pt-10 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
        <div className="flex items-center gap-3 mb-10">
           <Newspaper className="text-neon-cyan w-8 h-8" />
           <h2 className="text-3xl font-black text-white">اخبار <span className="text-neon-cyan">دنیای گیم</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {NEWS_DATA.map(news => (
             <div key={news.id} className="bg-slate-800 rounded-2xl overflow-hidden flex flex-col border border-slate-700 hover:border-neon-cyan/50 transition-all hover:-translate-y-1">
                <div className="h-52 overflow-hidden relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-neon-purple text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
                    {news.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                   <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                      <Clock size={14} />
                      <span>{news.date}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-neon-cyan cursor-pointer transition-colors">{news.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{news.summary}</p>
                   <button className="text-neon-cyan font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start">
                     ادامه مطلب
                     <ArrowRight size={16} className="rotate-180" />
                   </button>
                </div>
             </div>
           ))}
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-neon-purple selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab(AppSection.HOME)}>
               <Gamepad2 className="text-neon-purple w-8 h-8" />
               <span className="text-2xl font-black tracking-tighter text-white">
                 NEX<span className="text-neon-cyan">GEN</span>
               </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <button 
                onClick={() => setActiveTab(AppSection.HOME)}
                className={`${activeTab === AppSection.HOME ? 'text-white border-b-2 border-neon-purple pb-1' : 'hover:text-neon-cyan'} transition-all`}
              >
                خانه
              </button>
              <button 
                onClick={() => setActiveTab(AppSection.GAMES)}
                className={`${activeTab === AppSection.GAMES ? 'text-white border-b-2 border-neon-purple pb-1' : 'hover:text-neon-cyan'} transition-all`}
              >
                بازی‌ها
              </button>
              <button 
                onClick={() => setActiveTab(AppSection.TOURNAMENTS)}
                className={`${activeTab === AppSection.TOURNAMENTS ? 'text-white border-b-2 border-neon-purple pb-1' : 'hover:text-neon-cyan'} transition-all`}
              >
                مسابقات
              </button>
              <button 
                onClick={() => setActiveTab(AppSection.NEWS)}
                className={`${activeTab === AppSection.NEWS ? 'text-white border-b-2 border-neon-purple pb-1' : 'hover:text-neon-cyan'} transition-all`}
              >
                اخبار
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block text-sm bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-700 transition-colors">ورود</button>
              <button className="bg-neon-cyan text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.4)]">عضویت</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeTab === AppSection.HOME && <HomeSection />}
        {activeTab === AppSection.GAMES && <GamesSection />}
        {activeTab === AppSection.TOURNAMENTS && <TournamentsSection />}
        {activeTab === AppSection.NEWS && <NewsSection />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900 relative z-10">
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
                <li><button onClick={() => setActiveTab(AppSection.HOME)} className="hover:text-neon-cyan">درباره ما</button></li>
                <li><button className="hover:text-neon-cyan">تماس با ما</button></li>
                <li><button className="hover:text-neon-cyan">قوانین و مقررات</button></li>
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