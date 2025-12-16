import React, { useEffect, useRef, useState } from 'react';
import { PaperConfig, Section, SectionStatus } from '../types';
import { generateSectionContent } from '../services/geminiService';
import { CheckCircle2, Loader2, AlertCircle, FileText, Code, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface GenerationPhaseProps {
  config: PaperConfig;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  onFinished: () => void;
}

const GenerationPhase: React.FC<GenerationPhaseProps> = ({ config, sections, setSections, onFinished }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const processingRef = useRef(false);
  const [selectedViewId, setSelectedViewId] = useState<string | null>(null); // To manually view a section

  // Auto-select the first section initially
  useEffect(() => {
    if (sections.length > 0 && !selectedViewId) {
      setSelectedViewId(sections[0].id);
    }
  }, [sections, selectedViewId]);

  // The Queue Processor
  useEffect(() => {
    const processQueue = async () => {
      if (processingRef.current) return;

      const nextSectionIndex = sections.findIndex(s => s.status === SectionStatus.PENDING);
      if (nextSectionIndex === -1) {
        // All done?
        if (sections.every(s => s.status === SectionStatus.COMPLETED)) {
            // Wait a moment for user to see completion then offer finish
            // We just let the user click "Finalize" manually
        }
        return;
      }

      const nextSection = sections[nextSectionIndex];
      processingRef.current = true;
      setActiveSectionId(nextSection.id);
      
      // Update status to GENERATING
      setSections(prev => prev.map(s => s.id === nextSection.id ? { ...s, status: SectionStatus.GENERATING } : s));

      try {
        // Pass the *current* state of sections (including completed ones) to the service
        const content = await generateSectionContent(nextSection, sections, config);
        
        setSections(prev => prev.map(s => s.id === nextSection.id ? { 
          ...s, 
          content, 
          status: SectionStatus.COMPLETED 
        } : s));

      } catch (e) {
        setSections(prev => prev.map(s => s.id === nextSection.id ? { ...s, status: SectionStatus.ERROR } : s));
      } finally {
        processingRef.current = false;
        setActiveSectionId(null);
        // Trigger next iteration automatically via dependency change
      }
    };

    processQueue();
  }, [sections, config, setSections]);

  const activeSection = sections.find(s => s.id === selectedViewId) || sections[0];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      
      {/* Left Sidebar: Progress */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-serif font-bold text-slate-800">Drafting Progress</h3>
          <p className="text-xs text-slate-500 mt-1">Generating sections sequentially...</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedViewId(section.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors text-sm
                ${selectedViewId === section.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-slate-50 border border-transparent'}
              `}
            >
              <div className="mt-0.5">
                {section.status === SectionStatus.PENDING && <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                {section.status === SectionStatus.GENERATING && <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />}
                {section.status === SectionStatus.COMPLETED && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {section.status === SectionStatus.ERROR && <AlertCircle className="w-4 h-4 text-red-500" />}
              </div>
              <div>
                <span className={`block font-medium ${selectedViewId === section.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {section.title}
                </span>
                <span className="text-xs text-slate-400 capitalize">{section.status.toLowerCase()}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
           {sections.every(s => s.status === SectionStatus.COMPLETED) ? (
             <button 
               onClick={onFinished}
               className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-lg shadow-emerald-500/20 transition-all flex justify-center items-center gap-2"
             >
               Finalize Paper <ChevronRight className="w-4 h-4" />
             </button>
           ) : (
             <div className="w-full py-3 bg-slate-100 text-slate-400 rounded-lg font-medium text-center text-sm cursor-wait">
               Writing in progress...
             </div>
           )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
          <h2 className="font-serif font-bold text-xl text-slate-800 truncate max-w-lg">
            {activeSection?.title}
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
             {activeSection?.status === SectionStatus.GENERATING ? 'AI WRITING...' : 'READ ONLY'}
          </div>
        </div>

        {/* Content View */}
        <div className="flex-1 overflow-hidden flex">
          
          {/* LaTeX Code View */}
          <div className="flex-1 bg-[#1e1e1e] overflow-y-auto p-6 font-mono text-sm leading-relaxed text-slate-300">
             {activeSection?.content ? (
               <pre className="whitespace-pre-wrap">{activeSection.content}</pre>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                 {activeSection?.status === SectionStatus.PENDING ? (
                   <>
                     <div className="w-16 h-1 w-full bg-slate-700 rounded-full mb-4 max-w-[200px]" />
                     <p>Waiting for context...</p>
                   </>
                 ) : (
                   <div className="flex flex-col items-center gap-3">
                     <Loader2 className="w-8 h-8 animate-spin" />
                     <p>Generating content...</p>
                   </div>
                 )}
               </div>
             )}
          </div>

          {/* Preview View (Approximate) */}
          <div className="flex-1 bg-white overflow-y-auto p-8 border-l border-slate-200">
             <div className="prose prose-slate max-w-none prose-headings:font-serif prose-p:font-light prose-p:leading-7">
               {!activeSection?.content ? (
                  <div className="text-slate-300 italic text-center mt-20">Preview will appear here</div>
               ) : (
                 <ReactMarkdown 
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                 >
                   {activeSection.content}
                 </ReactMarkdown>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPhase;