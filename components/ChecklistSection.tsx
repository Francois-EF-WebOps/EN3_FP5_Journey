
import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';

interface Props {
  phaseId: string;
  items: ChecklistItem[];
}

const ChecklistSection: React.FC<Props> = ({ phaseId, items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(`checklist-${phaseId}`);
    if (saved) setCheckedItems(JSON.parse(saved));
  }, [phaseId]);

  const toggleItem = (id: string) => {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    localStorage.setItem(`checklist-${phaseId}`, JSON.stringify(next));
  };

  const progress = Math.round((Object.values(checkedItems).filter(v => v).length / items.length) * 100) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <i className="fa-solid fa-list-check text-indigo-600"></i>
          Phase Checkpoints
        </h3>
        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
          {progress}% Complete
        </span>
      </div>
      
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
        <div 
          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div 
            key={item.id} 
            onClick={() => toggleItem(item.id)}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${checkedItems[item.id] ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
          >
            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all ${checkedItems[item.id] ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
              {checkedItems[item.id] && <i className="fa-solid fa-check text-[10px] text-white"></i>}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${checkedItems[item.id] ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>
                {item.text}
              </p>
              {item.isMandatory && !checkedItems[item.id] && (
                <span className="text-[10px] font-bold text-rose-500 uppercase mt-1 block">Critical Path</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistSection;
