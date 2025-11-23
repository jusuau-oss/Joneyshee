import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Roadmap from './components/Roadmap';
import LessonView from './components/LessonView';
import ChatAssistant from './components/ChatAssistant';
import DiveLog from './components/DiveLog';
import { RoadmapStep } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'roadmap' | 'chat' | 'divelog'>('home');
  const [selectedTopic, setSelectedTopic] = useState<{ step: RoadmapStep; topic: string } | null>(null);

  const handleStart = () => {
    setCurrentView('roadmap');
  };

  const handleSelectTopic = (step: RoadmapStep, topic: string) => {
    setSelectedTopic({ step, topic });
  };

  const handleBackToRoadmap = () => {
    setSelectedTopic(null);
  };

  const handleNavigation = (view: 'home' | 'roadmap' | 'chat' | 'divelog') => {
    setCurrentView(view);
    if (view !== 'roadmap') {
      setSelectedTopic(null);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
      <Navigation currentView={currentView} setView={handleNavigation} />

      <main>
        {currentView === 'home' && (
          <Hero onStart={handleStart} />
        )}

        {currentView === 'roadmap' && !selectedTopic && (
          <Roadmap onSelectTopic={handleSelectTopic} />
        )}

        {currentView === 'roadmap' && selectedTopic && (
          <LessonView 
            step={selectedTopic.step} 
            topic={selectedTopic.topic} 
            onBack={handleBackToRoadmap} 
          />
        )}

        {currentView === 'chat' && (
          <ChatAssistant />
        )}

        {currentView === 'divelog' && (
          <DiveLog />
        )}
      </main>
    </div>
  );
}

export default App;