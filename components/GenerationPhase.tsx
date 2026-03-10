import React, { useEffect, useRef, useState } from 'react';
import { ProjectState, Status, Section, Module, Journey } from '../types';
import { generateSectionContent, generateSections } from '../services/geminiService';
import { CheckCircle2, Loader2, AlertCircle, ChevronRight, BookOpen, Layers, Zap, Sparkles, RefreshCw, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface GenerationPhaseProps {
  state: ProjectState;
  setState: React.Dispatch<React.SetStateAction<ProjectState>>;
  onFinished: () => void;
}

const GenerationPhase: React.FC<GenerationPhaseProps> = ({ state, setState, onFinished }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const processingRef = useRef(false);
  const stopRef = useRef(false);
  const stateRef = useRef(state);
  const [selectedViewId, setSelectedViewId] = useState<string | null>(null);
  const [queueTrigger, setQueueTrigger] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [debugLog, setDebugLog] = useState<string>("Initializing pipeline...");
  const [currentThought, setCurrentThought] = useState<string>("");

  // Cleanup on mount: Reset any stuck 'GENERATING' states to 'PENDING'
  useEffect(() => {
    setState(prev => ({
      ...prev,
      journeys: prev.journeys.map(j => ({
        ...j,
        status: j.status === Status.GENERATING ? Status.PENDING : j.status,
        modules: j.modules.map(m => ({
          ...m,
          status: m.status === Status.GENERATING ? Status.PENDING : m.status,
          sections: m.sections.map(s => ({
            ...s,
            status: s.status === Status.GENERATING ? Status.PENDING : s.status
          }))
        }))
      }))
    }));

    return () => {
      stopRef.current = true;
    };
  }, []);

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Auto-select first section
  useEffect(() => {
    if (!selectedViewId) {
      for (const j of state.journeys) {
        for (const m of j.modules) {
          if (m.sections.length > 0) {
            setSelectedViewId(m.sections[0].id);
            return;
          }
        }
      }
    }
  }, [state.journeys, selectedViewId]);

  // Auto-select active section
  useEffect(() => {
    if (activeId) {
      setSelectedViewId(activeId);
    }
  }, [activeId]);

  // The Hierarchical Queue Processor
  useEffect(() => {
    const processQueue = async () => {
      if (processingRef.current || isPaused || stopRef.current) {
        setDebugLog(isPaused ? "Pipeline paused." : "Waiting for trigger...");
        return;
      }
      processingRef.current = true;
      setDebugLog("Scanning queue for next task...");

      try {
        while (!stopRef.current) {
          if (isPaused) {
            setDebugLog("Pipeline paused.");
            break;
          }

          const currentState = stateRef.current;
          
          // 1. Find the next task
          let targetJourney: Journey | null = null;
          let targetModule: Module | null = null;
          let targetSection: Section | null = null;

          for (const j of currentState.journeys) {
            if (j.status === Status.COMPLETED) continue;
            
            // Check if journey is actually done (all modules completed or error)
            const allModulesDone = j.modules.length > 0 && j.modules.every(m => m.status === Status.COMPLETED || m.status === Status.ERROR);
            if (allModulesDone) {
              setState(prev => ({
                ...prev,
                journeys: prev.journeys.map(pj => pj.id === j.id ? { ...pj, status: Status.COMPLETED } : pj)
              }));
              continue;
            }

            targetJourney = j;
            
            for (const m of j.modules) {
              if (m.status === Status.COMPLETED) continue;
              targetModule = m;

              // If module has no sections, we need to generate the outline first
              if (m.sections.length === 0 && m.status === Status.PENDING) {
                setDebugLog(`Planning sections for: ${m.title}`);
                setCurrentThought("");
                // Update status to GENERATING
                setState(prev => ({
                  ...prev,
                  journeys: prev.journeys.map(pj => pj.id === j.id ? {
                    ...pj,
                    modules: pj.modules.map(pm => pm.id === m.id ? { ...pm, status: Status.GENERATING } : pm)
                  } : pj)
                }));

                try {
                  const rawSections = await generateSections(m, j, currentState.config, (t) => setCurrentThought(t));
                  
                  if (rawSections.length === 0) {
                    setState(prev => ({
                      ...prev,
                      journeys: prev.journeys.map(pj => pj.id === j.id ? {
                        ...pj,
                        modules: pj.modules.map(pm => pm.id === m.id ? { ...pm, status: Status.COMPLETED } : pm)
                      } : pj)
                    }));
                    continue; 
                  }

                  const formattedSections: Section[] = rawSections.map(s => ({
                    id: crypto.randomUUID(),
                    title: s.title,
                    description: s.description,
                    content: '',
                    status: Status.PENDING
                  }));
                  
                  setState(prev => ({
                    ...prev,
                    journeys: prev.journeys.map(pj => pj.id === j.id ? {
                      ...pj,
                      modules: pj.modules.map(pm => pm.id === m.id ? { ...pm, sections: formattedSections, status: Status.PENDING } : pm)
                    } : pj)
                  }));
                  
                  targetSection = null;
                  break; 
                } catch (e) {
                  console.error("Failed to generate sections", e);
                  setState(prev => ({
                    ...prev,
                    journeys: prev.journeys.map(pj => pj.id === j.id ? {
                      ...pj,
                      modules: pj.modules.map(pm => pm.id === m.id ? { ...pm, status: Status.ERROR } : pm)
                    } : pj)
                  }));
                  continue;
                }
              }

              for (const s of m.sections) {
                if (s.status !== Status.PENDING) continue;
                targetSection = s;
                break;
              }
              if (targetSection) break;
            }
            if (targetSection) break;
          }

          if (!targetSection) {
            const allDone = currentState.journeys.every(j => 
              j.status === Status.COMPLETED || 
              (j.modules.length > 0 && j.modules.every(m => m.status === Status.COMPLETED || m.status === Status.ERROR))
            );
            if (allDone) {
              setDebugLog("All tasks completed.");
              break;
            }
            
            setDebugLog("Waiting for next available task...");
            await new Promise(r => setTimeout(r, 2000));
            continue;
          }

          // 2. Process the section
          setDebugLog(`Writing section: ${targetSection.title}`);
          setActiveId(targetSection.id);
          setCurrentThought("");
          
          setState(prev => ({
            ...prev,
            journeys: prev.journeys.map(pj => pj.id === targetJourney!.id ? {
              ...pj,
              modules: pj.modules.map(pm => pm.id === targetModule!.id ? {
                ...pm,
                sections: pm.sections.map(ps => ps.id === targetSection!.id ? { ...ps, status: Status.GENERATING } : ps)
              } : pm)
            } : pj)
          }));

          try {
            const sectionIdx = targetModule.sections.findIndex(s => s.id === targetSection!.id);
            const previousSection = sectionIdx > 0 ? targetModule.sections[sectionIdx - 1] : null;
            const moduleSummary = targetJourney.modules
              .filter(m => m.status === Status.COMPLETED)
              .map(m => m.description)
              .join("\n");

            const content = await generateSectionContent(
              targetSection,
              targetModule,
              targetJourney,
              currentState.config,
              previousSection?.content,
              moduleSummary,
              (chunk) => {
                setState(prev => ({
                  ...prev,
                  journeys: prev.journeys.map(pj => pj.id === targetJourney!.id ? {
                    ...pj,
                    modules: pj.modules.map(pm => pm.id === targetModule!.id ? {
                      ...pm,
                      sections: pm.sections.map(ps => ps.id === targetSection!.id ? { ...ps, content: chunk } : ps)
                    } : pm)
                  } : pj)
                }));
              },
              (t) => setCurrentThought(t)
            );
            
            setState(prev => {
              const newJourneys = prev.journeys.map(pj => {
                if (pj.id !== targetJourney!.id) return pj;
                const newModules = pj.modules.map(pm => {
                  if (pm.id !== targetModule!.id) return pm;
                  const newSections = pm.sections.map(ps => ps.id === targetSection!.id ? { ...ps, content, status: Status.COMPLETED } : ps);
                  const allSectionsDone = newSections.every(s => s.status === Status.COMPLETED);
                  return { ...pm, sections: newSections, status: allSectionsDone ? Status.COMPLETED : pm.status };
                });
                const allModulesDone = newModules.every(m => m.status === Status.COMPLETED);
                return { ...pj, modules: newModules, status: allModulesDone ? Status.COMPLETED : pj.status };
              });
              return { ...prev, journeys: newJourneys, lastUpdated: Date.now() };
            });

          } catch (e) {
            console.error("Section generation failed", e);
            setState(prev => ({
              ...prev,
              journeys: prev.journeys.map(pj => pj.id === targetJourney!.id ? {
                ...pj,
                modules: pj.modules.map(pm => pm.id === targetModule!.id ? {
                  ...pm,
                  sections: pm.sections.map(ps => ps.id === targetSection!.id ? { ...ps, status: Status.ERROR } : ps)
                } : pm)
              } : pj)
            }));
          } finally {
            setActiveId(null);
          }
        }
      } finally {
        processingRef.current = false;
      }
    };

    const timer = setTimeout(() => {
      processQueue();
    }, 500);
    return () => clearTimeout(timer);
  }, [queueTrigger, isPaused]);

  // Flattened view for the sidebar
  const allSections: { section: Section; module: Module; journey: Journey }[] = [];
  state.journeys.forEach(j => {
    j.modules.forEach(m => {
      m.sections.forEach(s => {
        allSections.push({ section: s, module: m, journey: j });
      });
    });
  });

  const activeSection = allSections.find(item => item.section.id === selectedViewId)?.section || allSections[0]?.section;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      
      {/* Left Sidebar: Hierarchical Progress */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-4 border-b border-slate-100 bg-emerald-50/30">
          <h3 className="font-serif font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            Generation Pipeline
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Discovery-Based Math Curriculum</p>
          
          {/* Pipeline Activity Indicator */}
          <div className="mt-3 bg-white/50 border border-emerald-100 rounded-md p-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-medium text-emerald-700 truncate">
                {debugLog}
              </span>
              {!processingRef.current && (
                <div className="ml-auto flex gap-1">
                  {state.journeys.some(j => j.modules.some(m => m.status === Status.ERROR || m.sections.some(s => s.status === Status.ERROR))) && (
                    <button 
                      onClick={() => {
                        setState(prev => ({
                          ...prev,
                          journeys: prev.journeys.map(pj => ({
                            ...pj,
                            modules: pj.modules.map(pm => ({
                              ...pm,
                              status: pm.status === Status.ERROR ? Status.PENDING : pm.status,
                              sections: pm.sections.map(ps => ps.status === Status.ERROR ? { ...ps, status: Status.PENDING } : ps)
                            }))
                          }))
                        }));
                        setQueueTrigger(prev => prev + 1);
                      }}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Clear All Errors"
                    >
                      <AlertCircle className="w-3 h-3" />
                    </button>
                  )}
                  <button 
                    onClick={() => setQueueTrigger(prev => prev + 1)}
                    className="p-1 hover:bg-emerald-100 rounded text-emerald-600"
                    title="Resume Queue"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {currentThought && (
              <div className="mt-2 p-2 bg-white/50 rounded border border-emerald-100/50 max-h-32 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-1.5 mb-1">
                  <Brain size={10} className="text-emerald-500" />
                  <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">AI Reasoning</span>
                </div>
                <p className="text-[10px] text-emerald-800/70 leading-relaxed italic font-serif">
                  {currentThought}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {state.journeys.map((journey, jIdx) => (
            <div key={journey.id} className="space-y-1">
              <div className="flex items-center gap-2 px-2 py-1">
                <BookOpen className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Journey {jIdx + 1}</span>
              </div>
              {journey.modules.map((module, mIdx) => (
                <div key={module.id} className="space-y-0.5 ml-2">
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Layers className="w-3 h-3 text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Module {jIdx + 1}.{mIdx + 1}</span>
                    {module.status === Status.GENERATING && <Loader2 className="w-3 h-3 text-emerald-600 animate-spin ml-auto" />}
                    {module.status === Status.ERROR && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setState(prev => ({
                            ...prev,
                            journeys: prev.journeys.map(pj => pj.id === journey.id ? {
                              ...pj,
                              modules: pj.modules.map(pm => pm.id === module.id ? { ...pm, status: Status.PENDING } : pm)
                            } : pj)
                          }));
                          setQueueTrigger(prev => prev + 1);
                        }}
                        className="ml-auto p-1 hover:bg-red-50 rounded text-red-500"
                        title="Retry Module Outline"
                      >
                        <AlertCircle className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  {module.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedViewId(section.id)}
                      className={`w-full flex items-start gap-3 p-2 rounded-lg text-left transition-colors text-xs ml-2
                        ${selectedViewId === section.id ? 'bg-emerald-50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'}
                      `}
                    >
                      <div className="mt-0.5 shrink-0">
                        {section.status === Status.PENDING && <div className="w-3 h-3 rounded-full border border-slate-200" />}
                        {section.status === Status.GENERATING && <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />}
                        {section.status === Status.COMPLETED && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        {section.status === Status.ERROR && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setState(prev => ({
                                ...prev,
                                journeys: prev.journeys.map(pj => ({
                                  ...pj,
                                  modules: pj.modules.map(pm => ({
                                    ...pm,
                                    sections: pm.sections.map(ps => ps.id === section.id ? { ...ps, status: Status.PENDING } : ps)
                                  }))
                                }))
                              }));
                              setQueueTrigger(prev => prev + 1);
                            }}
                            className="hover:bg-red-50 p-0.5 rounded"
                          >
                            <AlertCircle className="w-3 h-3 text-red-500" />
                          </button>
                        )}
                      </div>
                      <div className="truncate">
                        <span className={`block font-medium truncate ${selectedViewId === section.id ? 'text-emerald-900' : 'text-slate-700'}`}>
                          {section.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
           {state.journeys.every(j => j.status === Status.COMPLETED) ? (
             <button 
               onClick={onFinished}
               className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-lg shadow-emerald-500/20 transition-all flex justify-center items-center gap-2"
             >
               Finalize Curriculum <ChevronRight className="w-4 h-4" />
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
          <div className="flex flex-col min-w-0">
            <h2 className="font-serif font-bold text-xl text-slate-800 truncate max-w-lg">
              {activeSection?.title || (state.journeys.some(j => j.modules.some(m => m.status === Status.GENERATING)) ? "Architecting Module..." : "Waiting...")}
            </h2>
            {activeSection ? (
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold truncate">
                {allSections.find(s => s.section.id === activeSection.id)?.journey.title} • {allSections.find(s => s.section.id === activeSection.id)?.module.title}
              </div>
            ) : (
              state.journeys.some(j => j.modules.some(m => m.status === Status.GENERATING)) && (
                <div className="text-[10px] text-emerald-500 uppercase tracking-wider font-bold animate-pulse">
                  AI is designing the section structure...
                </div>
              )
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const newPaused = !isPaused;
                setIsPaused(newPaused);
                if (!newPaused) {
                  // Reset errors when resuming to allow the pipeline to try again
                  setState(prev => ({
                    ...prev,
                    journeys: prev.journeys.map(j => ({
                      ...j,
                      status: j.status === Status.ERROR ? Status.PENDING : j.status,
                      modules: j.modules.map(m => ({
                        ...m,
                        status: m.status === Status.ERROR ? Status.PENDING : m.status,
                        sections: m.sections.map(s => ({
                          ...s,
                          status: s.status === Status.ERROR ? Status.PENDING : s.status
                        }))
                      }))
                    }))
                  }));
                  setQueueTrigger(prev => prev + 1);
                }
              }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md shadow-sm transition-all ${
                isPaused ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              {isPaused ? <RefreshCw className="w-3 h-3" /> : <Loader2 className="w-3 h-3" />}
              {isPaused ? 'Resume Pipeline' : 'Pause Pipeline'}
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
               {activeSection?.status === Status.GENERATING ? 'AI WRITING...' : 'READ ONLY'}
            </div>
          </div>
        </div>

        {/* Content View */}
        <div className="flex-1 overflow-hidden flex">
          
          {/* Markdown Code View */}
          <div className="flex-1 bg-[#1e1e1e] overflow-y-auto p-6 font-mono text-sm leading-relaxed text-slate-300">
             {activeSection?.content ? (
               <pre className="whitespace-pre-wrap">{activeSection.content}</pre>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                 {activeSection?.status === Status.PENDING ? (
                   <>
                     <div className="w-16 h-1 w-full bg-slate-700 rounded-full mb-4 max-w-[200px]" />
                     <p>Waiting for pipeline...</p>
                   </>
                 ) : (
                   <div className="flex flex-col items-center gap-3">
                     <div className="relative">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                        <Sparkles className="w-4 h-4 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                     </div>
                     <div className="text-center">
                        <p className="text-slate-400 font-medium">AI is crafting content...</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Deep thinking in progress (up to 30s)</p>
                     </div>
                     {currentThought && (
                       <div className="mt-6 w-full max-w-2xl p-4 bg-emerald-50/20 border border-emerald-100/30 rounded-xl">
                         <div className="flex items-center gap-2 mb-3">
                           <Brain size={16} className="text-emerald-500" />
                           <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Thinking Trace</span>
                         </div>
                         <div className="text-sm text-emerald-800/60 leading-relaxed italic font-serif max-h-64 overflow-y-auto custom-scrollbar pr-2">
                           {currentThought}
                         </div>
                       </div>
                     )}
                   </div>
                 )}
               </div>
             )}
          </div>

          {/* Preview View */}
          <div className="flex-1 bg-white overflow-y-auto p-8 border-l border-slate-200">
             <div className="prose prose-slate max-w-none prose-headings:font-serif prose-p:font-light prose-p:leading-7">
               {!activeSection?.content ? (
                  <div className="text-slate-300 italic text-center mt-20">Preview will appear here</div>
               ) : (
                 <div className="markdown-body">
                    <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {activeSection.content}
                    </ReactMarkdown>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPhase;
