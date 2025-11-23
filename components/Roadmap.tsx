import React from 'react';
import { ROADMAP } from '../constants';
import { RoadmapStep } from '../types';
import { BookOpen, Lock, Trophy } from 'lucide-react';

interface RoadmapProps {
  onSelectTopic: (step: RoadmapStep, topic: string) => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ onSelectTopic }) => {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">潜水员晋升之路</h2>
          <p className="text-slate-400">从初次体验到专业教学，每一步都是新的冒险</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-900 transform md:-translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {ROADMAP.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-8`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-cyan-500 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/20">
                      
                      {/* Card Header Image */}
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <h3 className="text-2xl font-bold text-white drop-shadow-md">{step.title}</h3>
                          <span className="text-xs font-bold px-2 py-1 bg-cyan-600 rounded text-white shadow-lg">Level {index + 1}</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <p className="text-slate-300 mb-6 text-sm leading-relaxed">{step.description}</p>
                        
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {step.topics.map((topic, i) => (
                            <button
                              key={i}
                              onClick={() => onSelectTopic(step, topic)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-cyan-600 text-slate-200 hover:text-white rounded-lg text-xs transition-colors duration-200"
                            >
                              <BookOpen className="w-3 h-3" />
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
          
          {/* Final Trophy */}
          <div className="flex justify-center mt-12 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-900/50 animate-bounce">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;