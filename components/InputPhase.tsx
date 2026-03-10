
import React from 'react';
import { CurriculumConfig } from '../types';
import { BookOpen, BrainCircuit, ChevronRight, Sparkles, Target, Zap } from 'lucide-react';

interface InputPhaseProps {
  config: CurriculumConfig;
  onChange: (key: keyof CurriculumConfig, value: string) => void;
  onNext: () => void;
  isGenerating: boolean;
  hasExistingContent?: boolean;
  onContinue?: () => void;
}

const InputPhase: React.FC<InputPhaseProps> = ({ 
  config, onChange, onNext, isGenerating, hasExistingContent, onContinue 
}) => {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-fade-in pb-20">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-emerald-100">
          <Sparkles className="w-3 h-3" />
          Discovery Engine v5.0
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 tracking-tight">Curriculum Architect</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
          Generate a 500+ page discovery-based mathematics curriculum for elite students.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Curriculum Title
            </label>
            <input
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
              placeholder="e.g., The Journey to Abstract Algebra..."
              value={config.title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              Target Audience
            </label>
            <input
              type="text"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
              placeholder="e.g., Top 0.1% Olympiad Students..."
              value={config.targetAudience}
              onChange={(e) => onChange('targetAudience', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Discipline</label>
            <select
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              value={config.discipline}
              onChange={(e) => onChange('discipline', e.target.value)}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Theoretical Physics">Theoretical Physics</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
            <select
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              value={config.tone}
              onChange={(e) => onChange('tone', e.target.value)}
            >
              <option value="Inspirational & Rigorous">Inspirational & Rigorous</option>
              <option value="Formal Academic">Formal Academic</option>
              <option value="Conversational/Socratic">Conversational/Socratic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rhetorical Mode</label>
            <select
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              value={config.rhetoricalMode}
              onChange={(e) => onChange('rhetoricalMode', e.target.value)}
            >
              <option value="Discovery-Based (Problems First)">Discovery-Based (Problems First)</option>
              <option value="Definition-Theorem-Proof">Definition-Theorem-Proof</option>
              <option value="Historical/Narrative">Historical/Narrative</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Zap className="w-4 h-4 text-emerald-500" />
            Core Vision & Philosophy
          </label>
          <p className="text-xs text-slate-500 mb-2">Describe the conceptual journey, the major milestones, and the pedagogical style.</p>
          <textarea
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none font-sans text-sm leading-relaxed"
            placeholder="e.g., We start with the geometry of symmetries and slowly build up to the concept of a Group without ever naming it until the final mission of Journey 2..."
            value={config.rawVision}
            onChange={(e) => onChange('rawVision', e.target.value)}
          />
        </div>

        <div className="pt-6 flex justify-between items-center border-t border-slate-100">
          {hasExistingContent && onContinue ? (
            <button
              onClick={onContinue}
              className="flex items-center gap-2 px-6 py-2.5 text-slate-500 hover:text-emerald-600 font-medium transition-colors"
            >
              Resume Current Project
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : <div />}
          
          <button
            onClick={onNext}
            disabled={!config.title || !config.rawVision || isGenerating}
            className={`
              flex items-center gap-3 px-10 py-4 rounded-xl text-white font-semibold transition-all
              ${(!config.title || !config.rawVision || isGenerating) 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/30 active:scale-95'}
            `}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Architecting Journeys...
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5" />
                Generate High-Level Outline
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPhase;
