import React from 'react';
import { Section } from '../types';
import { ArrowRight, GripVertical, Trash2, Plus, RefreshCw } from 'lucide-react';

interface OutlinePhaseProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  onNext: () => void;
  onBack: () => void;
}

const OutlinePhase: React.FC<OutlinePhaseProps> = ({ sections, setSections, onNext, onBack }) => {

  const handleUpdateSection = (id: string, field: 'title' | 'description', value: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      title: "New Section",
      description: "Describe what goes here...",
      content: "",
      status: 'PENDING' // actually import enum, but string works due to TS enum
    } as Section;
    setSections(prev => [...prev, newSection]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Review Structure</h2>
          <p className="text-slate-600 mt-1">
            The agent has analyzed your sketch. Adjust the flow before we start fleshing it out.
          </p>
        </div>
        <div className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded">
          {sections.length} Sections
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-6">
        {sections.map((section, index) => (
          <div key={section.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-4 group hover:border-indigo-300 transition-colors">
            <div className="flex flex-col items-center pt-2 text-slate-400 cursor-grab active:cursor-grabbing">
              <span className="text-xs font-bold mb-1">{index + 1}</span>
              <GripVertical className="w-5 h-5" />
            </div>
            
            <div className="flex-1 space-y-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                className="w-full font-bold text-lg text-slate-800 bg-transparent border-none focus:ring-0 p-0 placeholder-slate-300"
                placeholder="Section Title"
              />
              <textarea
                value={section.description}
                onChange={(e) => handleUpdateSection(section.id, 'description', e.target.value)}
                className="w-full text-sm text-slate-600 bg-slate-50 rounded p-2 border border-transparent focus:bg-white focus:border-indigo-300 outline-none resize-none h-20"
                placeholder="Instructions for this section..."
              />
            </div>

            <div className="flex flex-col justify-start">
               <button 
                onClick={() => handleDeleteSection(section.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                title="Remove Section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={handleAddSection}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-indigo-500 hover:text-indigo-600 font-medium flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Section
        </button>
      </div>

      <div className="pt-6 border-t border-slate-200 flex justify-between items-center bg-slate-50">
        <button 
          onClick={onBack}
          className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium"
        >
          Back to Sketch
        </button>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg shadow-indigo-500/20 font-medium flex items-center gap-2"
        >
          Start Writing
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OutlinePhase;