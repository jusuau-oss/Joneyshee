import React from 'react';
import { ChevronRight, Waves } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/1920/1080?random=1")',
          filter: 'brightness(0.6) contrast(1.1)' 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
          <Waves className="w-5 h-5 text-cyan-400 mr-2" />
          <span className="text-cyan-300 text-sm font-semibold tracking-wide uppercase">探索未知的70%</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          从呼吸<span className="text-cyan-400">第一口</span>水下空气开始
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          DeepBlue Journey 不仅仅是一个学习应用，它是你通往深蓝世界的护照。
          从克服恐惧到成为专业教练，AI 助教将全程陪伴你的每一次下潜。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.7)]"
          >
            <span className="flex items-center gap-2">
              开启旅程
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-10" />
    </div>
  );
};

export default Hero;