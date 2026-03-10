
import React, { useState } from 'react';
import { ProjectState } from '../types';
import { Copy, Download, RotateCcw, Layout, FileText, ChevronRight } from 'lucide-react';

interface FinalViewProps {
  state: ProjectState;
  onRestart: () => void;
  onBackToOutline: () => void;
}

const FinalView: React.FC<FinalViewProps> = ({ state, onRestart, onBackToOutline }) => {
  const [copied, setCopied] = useState(false);

  const generateFullMarkdown = () => {
    let md = `# ${state.config.title}\n\n`;
    md += `**Target Audience:** ${state.config.targetAudience}\n`;
    md += `**Discipline:** ${state.config.discipline}\n`;
    md += `**Tone:** ${state.config.tone}\n\n`;
    md += `---\n\n`;

    state.journeys.forEach((j, jIdx) => {
      md += `# Journey ${jIdx + 1}: ${j.title}\n\n`;
      md += `> ${j.description}\n\n`;
      
      j.modules.forEach((m, mIdx) => {
        md += `## Module ${jIdx + 1}.${mIdx + 1}: ${m.title}\n\n`;
        md += `*${m.description}*\n\n`;
        
        m.sections.forEach((s) => {
          md += `### ${s.title}\n\n`;
          md += `${s.content}\n\n`;
        });
      });
      md += `---\n\n`;
    });

    return md;
  };

  const fullDocument = generateFullMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullDocument], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.config.title.replace(/\s+/g, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">Curriculum Finalized</h1>
            <p className="text-slate-600">Your 500+ page discovery-based curriculum is ready.</p>
          </div>
          <div className="flex flex-wrap gap-3">
             <button 
              onClick={onBackToOutline}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors"
            >
              <Layout className="w-4 h-4" />
              Back to Architecture
            </button>
             <button 
              onClick={onRestart}
              className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-600 font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Project
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download .md
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-md transition-all min-w-[160px] justify-center"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
              {!copied && <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-700">
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-black/20">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/80" />
               <div className="w-3 h-3 rounded-full bg-amber-500/80" />
               <div className="w-3 h-3 rounded-full bg-green-500/80" />
             </div>
             <span className="ml-2 text-xs text-slate-400 font-mono">curriculum_assembly.md</span>
          </div>
          <textarea 
            className="flex-1 w-full bg-transparent text-slate-300 font-mono text-sm p-6 outline-none resize-none leading-relaxed"
            value={fullDocument}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default FinalView;
