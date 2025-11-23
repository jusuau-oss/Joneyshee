import React, { useState, useEffect } from 'react';
import { generateLesson } from '../services/geminiService';
import { LessonContent, RoadmapStep } from '../types';
import { ArrowLeft, Loader2, CheckCircle, AlertTriangle, HelpCircle, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface LessonViewProps {
  step: RoadmapStep;
  topic: string;
  onBack: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ step, topic, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<LessonContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await generateLesson(topic, step.title);
        setContent(data);
        // Initialize quiz state
        setSelectedQuizAnswers(new Array(data.quiz.length).fill(-1));
        setShowExplanation(new Array(data.quiz.length).fill(false));
      } catch (err) {
        setError("AI 无法生成课程内容，请检查网络设置或稍后再试。");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [topic, step.title]);

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    if (selectedQuizAnswers[questionIndex] !== -1) return; // Prevent changing answer

    const newAnswers = [...selectedQuizAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedQuizAnswers(newAnswers);

    const newExplanations = [...showExplanation];
    newExplanations[questionIndex] = true;
    setShowExplanation(newExplanations);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <h3 className="text-xl text-white font-semibold">AI 正在备课中...</h3>
        <p className="text-slate-400 mt-2">正在为您生成关于 "{topic}" 的定制内容</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center pt-20 px-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl text-white font-semibold mb-2">出错了</h3>
        <p className="text-slate-400 mb-6 text-center">{error}</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
        >
          返回列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回进阶之路
        </button>

        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 md:p-10 border border-slate-700 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-cyan-900/50 text-cyan-400 text-xs font-bold rounded-full uppercase border border-cyan-800">
              {step.title}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{content.title}</h1>
          </div>

          {/* Introduction */}
          <div className="mb-10 p-6 bg-gradient-to-r from-slate-700/30 to-slate-800/30 rounded-xl border-l-4 border-cyan-500">
            <p className="text-lg text-slate-200 italic leading-relaxed">
              "{content.introduction}"
            </p>
          </div>

          {/* Main Content (Markdown) */}
          <div className="prose prose-invert prose-cyan max-w-none mb-12">
             {/* Using a simple div rendering for simplicity, normally ReactMarkdown */}
             {/* In a real app we'd use ReactMarkdown, here we map simple newline split for basics if needed, 
                 but actually ReactMarkdown is standard. Since I cannot install deps, I assume standard text rendering or basic simulation if the library isn't available. 
                 Wait, standard instructions say "Use popular libraries". I will assume react-markdown availability or render raw text with formatting. 
                 Actually, I will implement a basic renderer for safety or use the library if the environment supports it. 
                 Given constraints, I'll use whitespace-pre-wrap for now to be safe without external deps failure.
             */}
             <div className="whitespace-pre-wrap text-slate-300 leading-7 font-light text-lg">
                {content.coreContent}
             </div>
          </div>

          {/* Safety Tip */}
          <div className="mb-12 flex items-start p-5 bg-red-900/20 border border-red-900/50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mr-4 mt-1" />
            <div>
              <h4 className="text-red-400 font-bold mb-1">安全警示 (Safety First)</h4>
              <p className="text-slate-300 text-sm">{content.safetyTip}</p>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="border-t border-slate-700 pt-10">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-yellow-400" />
              知识测验
            </h3>

            <div className="space-y-8">
              {content.quiz.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                  <p className="text-lg text-white font-medium mb-4">{qIdx + 1}. {q.question}</p>
                  
                  <div className="space-y-3">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizAnswers[qIdx] === oIdx;
                      const isCorrect = q.correctIndex === oIdx;
                      const showResult = showExplanation[qIdx];
                      
                      let btnClass = "w-full text-left p-4 rounded-lg border transition-all ";
                      
                      if (showResult) {
                        if (isCorrect) btnClass += "bg-green-900/30 border-green-500/50 text-green-200";
                        else if (isSelected && !isCorrect) btnClass += "bg-red-900/30 border-red-500/50 text-red-200";
                        else btnClass += "bg-slate-800 border-slate-700 opacity-50";
                      } else {
                         btnClass += "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-cyan-500 text-slate-300";
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleQuizAnswer(qIdx, oIdx)}
                          disabled={showResult}
                          className={btnClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation[qIdx] && (
                    <div className="mt-4 p-4 bg-cyan-900/20 rounded-lg text-sm text-cyan-200">
                      <strong>解析：</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;