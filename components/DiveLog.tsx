import React, { useState, useEffect } from 'react';
import { DiveLogEntry } from '../types';
import { Plus, Trash2, Calendar, Clock, ArrowDown, MapPin, Save, X } from 'lucide-react';

const DiveLog: React.FC = () => {
  const [logs, setLogs] = useState<DiveLogEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [depth, setDepth] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const savedLogs = localStorage.getItem('deepblue_divelogs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse dive logs", e);
      }
    }
  }, []);

  const saveLogsToStorage = (newLogs: DiveLogEntry[]) => {
    localStorage.setItem('deepblue_divelogs', JSON.stringify(newLogs));
    setLogs(newLogs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: DiveLogEntry = {
      id: Date.now().toString(),
      location,
      date,
      depth: Number(depth),
      duration: Number(duration),
      notes,
      timestamp: Date.now()
    };

    const updatedLogs = [newEntry, ...logs];
    saveLogsToStorage(updatedLogs);
    
    // Reset form
    setLocation('');
    setDate('');
    setDepth('');
    setDuration('');
    setNotes('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条日志吗?')) {
      const updatedLogs = logs.filter(log => log.id !== id);
      saveLogsToStorage(updatedLogs);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">潜水日志</h2>
            <p className="text-slate-400">记录每一次蔚蓝色的回忆</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-cyan-900/50"
          >
            {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {isAdding ? '取消' : '记录新潜水'}
          </button>
        </div>

        {/* Add New Log Form */}
        {isAdding && (
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-xl font-bold text-white mb-6">新增日志</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">潜点名称 / 地点</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      required
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="例如: 诗巴丹 Barracuda Point"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">日期</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">最大深度 (米)</label>
                  <div className="relative">
                    <ArrowDown className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      required
                      type="number"
                      step="0.1"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">潜水时长 (分钟)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <input
                      required
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">备注 (看到的生物、装备状况等)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none h-32 resize-none"
                  placeholder="今天看到了海龟和杰克鱼风暴..."
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  保存日志
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Logs List */}
        <div className="space-y-4">
          {logs.length === 0 ? (
            <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-lg">还没有日志记录</p>
              <p className="text-slate-500 text-sm mt-2">快去探索海洋，记录你的第一次潜水吧！</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{log.location}</h3>
                      <span className="text-xs font-mono bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700">
                        {log.date}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-4">
                      <div className="flex items-center gap-1.5">
                        <ArrowDown className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold">{log.depth}m</span> 深度
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="font-semibold">{log.duration}min</span> 时长
                      </div>
                    </div>

                    {log.notes && (
                      <p className="text-slate-400 text-sm leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        {log.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(log.id)}
                    className="self-end md:self-start p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="删除日志"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiveLog;