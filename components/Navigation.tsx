import React from 'react';
import { Anchor, Map, MessageCircle, Home, NotebookPen } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'roadmap' | 'chat' | 'divelog';
  setView: (view: 'home' | 'roadmap' | 'chat' | 'divelog') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'roadmap', label: '潜水进阶之路', icon: Map },
    { id: 'chat', label: 'AI 教练', icon: MessageCircle },
    { id: 'divelog', label: '潜水日志', icon: NotebookPen },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <Anchor className="h-8 w-8 text-cyan-400" />
            <span className="font-bold text-xl tracking-wider text-white">DeepBlue</span>
          </div>
          
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${currentView === item.id 
                    ? 'bg-cyan-900/50 text-cyan-400' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;