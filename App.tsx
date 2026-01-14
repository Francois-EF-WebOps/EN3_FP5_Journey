
import React, { useState, useEffect, useRef } from 'react';
import { PHASES, TORQUE_TABLE, BOM_LIST } from './constants';
import { Phase, StageType, Message } from './types';
import { askExpert } from './services/geminiService';
import WarningBanner from './components/WarningBanner';
import ChecklistSection from './components/ChecklistSection';

const App: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<Phase>(PHASES[0]);
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the EcoMoto Expert. Ask me anything about your EN125 conversion, BOSC reinforcement, or battery swapping standards." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isTyping) return;
    
    const userMsg = userInput;
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const context = `Phase: ${selectedPhase.title}, Stage: ${selectedPhase.stage}. Components: ${JSON.stringify(BOM_LIST)}`;
    const result = await askExpert(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-slate-900 text-slate-300 md:h-screen sticky top-0 overflow-y-auto flex-shrink-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-bolt-lightning text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">EcoMoto</h1>
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">EN125 Open Platform</p>
            </div>
          </div>

          <nav className="space-y-6">
            {Object.values(StageType).map(stage => (
              <div key={stage}>
                <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">{stage}</h2>
                <div className="space-y-1">
                  {PHASES.filter(p => p.stage === stage).map(phase => (
                    <button
                      key={phase.id}
                      onClick={() => setSelectedPhase(phase)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center gap-3 ${selectedPhase.id === phase.id ? 'bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/20' : 'hover:bg-slate-800'}`}
                    >
                      <i className={`fa-solid ${selectedPhase.id === phase.id ? 'fa-circle-dot' : 'fa-circle'} text-[8px]`}></i>
                      {phase.title}
                    </button>
                  ))}
                  {PHASES.filter(p => p.stage === stage).length === 0 && (
                    <p className="px-3 py-2 text-slate-700 italic text-[10px]">Upcoming module...</p>
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">{selectedPhase.stage}</span>
              <h2 className="text-3xl font-extrabold text-slate-900">{selectedPhase.title}</h2>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <i className="fa-solid fa-file-pdf"></i>
                Export Guide
              </button>
            </div>
          </div>

          <WarningBanner />

          {/* Phase Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Phase Description</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{selectedPhase.description}</p>
                
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Immediate Actions</h4>
                <ul className="space-y-3">
                  {selectedPhase.tasks.map((task, idx) => (
                    <li key={idx} className="flex gap-4 text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 flex-shrink-0 mt-0.5">{idx + 1}</span>
                      <span className="text-sm leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Technical Specifications Area */}
              {selectedPhase.id === 'p03' && (
                <section className="bg-slate-900 text-slate-100 rounded-xl shadow-xl p-8 border border-slate-800">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <i className="fa-solid fa-wrench text-indigo-400"></i>
                      BOSC Torque Table
                    </h3>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">Standards v1.0</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800 text-left">
                          <th className="pb-3 pr-4 font-semibold uppercase text-[10px] tracking-wider">Location</th>
                          <th className="pb-3 px-4 font-semibold uppercase text-[10px] tracking-wider">Bolt</th>
                          <th className="pb-3 pl-4 font-semibold uppercase text-[10px] tracking-wider">Torque</th>
                        </tr>
                      </thead>
                      <tbody>
                        {TORQUE_TABLE.map((item, idx) => (
                          <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                            <td className="py-4 pr-4 font-medium text-slate-200">{item.location}</td>
                            <td className="py-4 px-4 text-slate-400 mono">{item.boltSize}</td>
                            <td className="py-4 pl-4 text-indigo-400 font-bold mono">{item.torque}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Sourcing Guide */}
              {selectedPhase.id === 'p01' && (
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Standardized BOM (Bill of Materials)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BOM_LIST.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-slate-100 bg-slate-50 flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">{item.category}</span>
                        <h5 className="font-bold text-slate-800">{item.name}</h5>
                        <p className="text-xs text-slate-500">{item.spec}</p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                          <i className="fa-solid fa-location-dot"></i>
                          {item.source}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <ChecklistSection phaseId={selectedPhase.id} items={selectedPhase.checkpoints} />
              
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white shadow-lg shadow-indigo-500/20">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-graduation-cap"></i>
                  Pro Tip
                </h4>
                <p className="text-indigo-100 text-xs leading-relaxed">
                  Always use thread locker (Blue Loctite or similar) on structural fasteners. Vibration from the road can loosen bolts over time on converted bikes.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Next Phase</h4>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Coming up after this:</p>
                  <p className="text-sm font-bold text-slate-700">
                    {PHASES[PHASES.indexOf(selectedPhase) + 1]?.title || "Full Commercial Roadmap"}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedPhase(PHASES[Math.min(PHASES.indexOf(selectedPhase) + 1, PHASES.length - 1)])}
                  className="w-full mt-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Continue Build
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Expert Floating Helper */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isExpertOpen ? 'w-full md:w-[400px] h-[500px]' : 'w-14 h-14'}`}>
        {!isExpertOpen ? (
          <button 
            onClick={() => setIsExpertOpen(true)}
            className="w-full h-full bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-indigo-700 transition-all group"
          >
            <i className="fa-solid fa-headset text-xl group-hover:scale-110 transition-transform"></i>
          </button>
        ) : (
          <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-robot text-white"></i>
                <h3 className="text-white font-bold text-sm">EcoMoto Troubleshooting</h3>
              </div>
              <button onClick={() => setIsExpertOpen(false)} className="text-indigo-100 hover:text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-slate-50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 p-3 rounded-2xl rounded-tl-none border border-slate-100 italic">
                    Expert is typing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about wiring or torque..." 
                  className="flex-1 bg-slate-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Call to Action */}
      <footer className="fixed bottom-0 left-0 md:left-80 right-0 h-16 bg-white border-t border-slate-200 z-10 flex items-center justify-between px-8 md:px-12 hidden md:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Build Sync</span>
          </div>
          <div className="text-xs text-slate-400 border-l border-slate-200 pl-6">
            Standards: <span className="text-slate-700 font-bold">MUR-EN125-v1.0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <a href="https://github.com/ecomoto-open" target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
            <i className="fa-brands fa-github text-xl"></i>
           </a>
           <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all">
             Contribute Build Log
           </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
