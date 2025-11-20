import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'سلام رفیق گیمر! 👋 من نوا هستم. چه کمکی ازم برمیاد؟' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-slate-900 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center animate-pulse">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">دستیار هوشمند نوا</h3>
                <span className="text-xs text-neon-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  آنلاین
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-700 text-white rounded-br-none' 
                      : 'bg-gradient-to-br from-neon-purple/20 to-slate-800 border border-neon-purple/30 text-gray-100 rounded-bl-none shadow-[0_0_10px_rgba(176,38,255,0.1)]'
                  }`}
                >
                  {msg.role === 'model' && <Sparkles size={12} className="inline-block mb-1 ml-1 text-neon-cyan" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
               <div className="flex justify-end">
                 <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none">
                   <div className="flex gap-1">
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="چیزی بپرسید..."
                className="w-full bg-slate-800 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-neon-purple placeholder-gray-500"
              />
              <button 
                onClick={handleSend}
                className="absolute left-2 p-1.5 bg-neon-purple hover:bg-purple-600 rounded-lg text-white transition-colors"
              >
                <Send size={16} className={document.dir === 'rtl' ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 bg-gradient-to-r from-neon-purple to-purple-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(176,38,255,0.5)] hover:shadow-[0_0_30px_rgba(176,38,255,0.8)]`}
      >
        <MessageSquare size={28} fill="currentColor" />
      </button>
    </div>
  );
};