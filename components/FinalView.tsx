import React, { useState } from 'react';
import { PaperConfig, Section } from '../types';
import { Copy, Download, ArrowLeft } from 'lucide-react';

interface FinalViewProps {
  config: PaperConfig;
  sections: Section[];
  onRestart: () => void;
}

const FinalView: React.FC<FinalViewProps> = ({ config, sections, onRestart }) => {
  const [copied, setCopied] = useState(false);

  // Combine all sections into a full LaTeX document
  const fullDocument = `
\\documentclass{article}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{${config.title}}
\\date{\\today}

\\begin{document}

\\maketitle

${sections.map(s => `% --- Section: ${s.title} ---\n${s.content}`).join('\n\n')}

\\end{document}
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paper.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">Paper Completed</h1>
            <p className="text-slate-600">Your paper has been fully generated and assembled.</p>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={onRestart}
              className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium"
            >
              Start New Paper
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download .tex
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-all"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
              <Copy className="w-4 h-4" />
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
             <span className="ml-2 text-xs text-slate-400 font-mono">main.tex</span>
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