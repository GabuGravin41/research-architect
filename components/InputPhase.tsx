import React from 'react';
import { PaperConfig, PaperLength } from '../types';
import { BookOpen, FileText, Layout, PenTool, Scale } from 'lucide-react';

interface InputPhaseProps {
  config: PaperConfig;
  onChange: (key: keyof PaperConfig, value: any) => void;
  onNext: () => void;
  isGenerating: boolean;
}

const InputPhase: React.FC<InputPhaseProps> = ({ config, onChange, onNext, isGenerating }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in pb-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Research Architect</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Turn your rough notes and sketches into a polished, structured research paper using intelligent agents.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Paper Title (Working)</label>
          <input
            type="text"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="e.g., A Novel Approach to Distributed consensus..."
            value={config.title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </div>

        {/* Sketch Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            Research Sketch & Notes
          </label>
          <p className="text-xs text-slate-500 mb-2">
            Paste your raw notes, bullet points, hypothesis, or rough abstract here. The more detail, the better.
            The model will flesh these out but will rely on your core ideas.
          </p>
          <textarea
            className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition font-mono text-sm leading-relaxed"
            placeholder="- Introduction: Discuss the problem of X...
- Method: We used Y algorithm...
- Results: 50% improvement in Z...
- Conclusion: Future work includes..."
            value={config.rawSketch}
            onChange={(e) => onChange('rawSketch', e.target.value)}
          />
        </div>

        {/* Configurations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Tone & Voice
            </label>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={config.tone}
              onChange={(e) => onChange('tone', e.target.value)}
            >
              <option value="Formal Academic">Formal Academic (Journal)</option>
              <option value="Technical Report">Technical Report (Industry)</option>
              <option value="Casual/Blog">Casual / Technical Blog</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Target Length
            </label>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={config.targetLength}
              onChange={(e) => onChange('targetLength', e.target.value)}
            >
              <option value="Short Letter (2-4 pages)">Short Letter (2-4 pages)</option>
              <option value="Standard Article (8-12 pages)">Standard Article (8-12 pages)</option>
              <option value="Extended Report (20-30 pages)">Extended Report (20-30 pages)</option>
              <option value="Dissertation/Book (40+ pages)">Dissertation/Book (40+ pages)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Output Template
            </label>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={config.template}
              onChange={(e) => onChange('template', e.target.value)}
            >
              <option value="Standard Article">Standard Article</option>
              <option value="IEEE">IEEE Conference</option>
              <option value="ACM">ACM Standard</option>
              <option value="Minimalist">Minimalist (Pre-print)</option>
            </select>
          </div>
        </div>

        {/* Action */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onNext}
            disabled={!config.title || !config.rawSketch || isGenerating}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium transition-all
              ${(!config.title || !config.rawSketch || isGenerating) 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30'}
            `}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Sketch...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate Plan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPhase;