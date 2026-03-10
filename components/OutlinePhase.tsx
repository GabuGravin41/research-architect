import React, { useState } from 'react';
import { ProjectState, Journey, Module, Status } from '../types';
import { ArrowRight, ChevronDown, ChevronRight, Plus, RefreshCw, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { generateModules } from '../services/geminiService';

interface OutlinePhaseProps {
  state: ProjectState;
  setState: React.Dispatch<React.SetStateAction<ProjectState>>;
  onNext: () => void;
  onBack: () => void;
}

const OutlinePhase: React.FC<OutlinePhaseProps> = ({ state, setState, onNext, onBack }) => {
  const [expandedJourney, setExpandedJourney] = useState<string | null>(null);
  const [isGeneratingModules, setIsGeneratingModules] = useState<string | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const handleUpdateJourney = (id: string, field: keyof Journey, value: any) => {
    setState(prev => ({
      ...prev,
      journeys: prev.journeys.map(j => j.id === id ? { ...j, [field]: value } : j)
    }));
  };

  const handleGenerateModules = async (journey: Journey) => {
    if (isGeneratingModules || isGeneratingAll) return;
    setIsGeneratingModules(journey.id);
    try {
      const rawModules = await generateModules(journey, state.config);
      const formattedModules: Module[] = rawModules.map(m => ({
        id: crypto.randomUUID(),
        title: m.title,
        description: m.description,
        sections: [],
        status: Status.PENDING
      }));
      
      setState(prev => ({
        ...prev,
        journeys: prev.journeys.map(j => j.id === journey.id ? { ...j, modules: formattedModules, status: Status.PENDING } : j)
      }));
      setExpandedJourney(journey.id);
    } catch (error) {
      console.error(error);
      alert("Failed to generate modules for this journey.");
    } finally {
      setIsGeneratingModules(null);
    }
  };

  const handleGenerateAllModules = async () => {
    if (isGeneratingAll || isGeneratingModules) return;
    setIsGeneratingAll(true);
    
    try {
      const journeysToProcess = state.journeys.filter(j => j.modules.length === 0);
      
      for (const journey of journeysToProcess) {
        const rawModules = await generateModules(journey, state.config);
        const formattedModules: Module[] = rawModules.map(m => ({
          id: crypto.randomUUID(),
          title: m.title,
          description: m.description,
          sections: [],
          status: Status.PENDING
        }));
        
        setState(prev => ({
          ...prev,
          journeys: prev.journeys.map(j => j.id === journey.id ? { ...j, modules: formattedModules, status: Status.PENDING } : j)
        }));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate all modules. Some journeys may have been skipped.");
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const allJourneysHaveModules = state.journeys.every(j => j.modules.length > 0);

  return (
    <div className="max-w-5xl mx-auto p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Curriculum Architecture</h2>
          <p className="text-slate-600 mt-1">
            Review the 7 Journeys. Generate modules for each to build the 500-page structure.
          </p>
        </div>
        <div className="text-sm text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded">
          {state.journeys.length} Journeys
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-6">
        {state.journeys.map((journey, index) => (
          <div key={journey.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-emerald-200">
            <div 
              className="p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50"
              onClick={() => setExpandedJourney(expandedJourney === journey.id ? null : journey.id)}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">{journey.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{journey.description}</p>
              </div>
              <div className="flex items-center gap-3">
                {journey.modules.length === 0 ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleGenerateModules(journey); }}
                    disabled={!!isGeneratingModules || isGeneratingAll}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all disabled:opacity-50"
                  >
                    {(isGeneratingModules === journey.id || (isGeneratingAll && journey.modules.length === 0)) ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Wand2 className="w-3 h-3" />
                    )}
                    Generate Modules
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {journey.modules.length} Modules
                  </span>
                )}
                {expandedJourney === journey.id ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </div>
            </div>

            {expandedJourney === journey.id && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50">
                <div className="space-y-3">
                  <div className="mb-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Journey Vision</label>
                    <textarea
                      value={journey.description}
                      onChange={(e) => handleUpdateJourney(journey.id, 'description', e.target.value)}
                      className="w-full text-sm text-slate-600 bg-white rounded-lg p-3 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24"
                    />
                  </div>
                  
                  {journey.modules.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Modules</label>
                      {journey.modules.map((module, mIdx) => (
                        <div key={module.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-center gap-3 group">
                          <span className="text-[10px] font-bold text-slate-400">{index + 1}.{mIdx + 1}</span>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-700">{module.title}</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{module.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={() => {
            const newJourney: Journey = {
              id: crypto.randomUUID(),
              title: "New Journey",
              description: "Describe the conceptual leap...",
              modules: [],
              status: Status.PENDING
            };
            setState(prev => ({ ...prev, journeys: [...prev.journeys, newJourney] }));
          }}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-emerald-500 hover:text-emerald-600 font-medium flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Manual Journey
        </button>
      </div>

      <div className="pt-6 border-t border-slate-200 flex justify-between items-center bg-slate-50">
        <button 
          onClick={onBack}
          className="px-6 py-2 text-slate-600 hover:text-slate-900 font-medium"
        >
          Back to Vision
        </button>
        <button 
          onClick={allJourneysHaveModules ? onNext : handleGenerateAllModules}
          disabled={isGeneratingAll || !!isGeneratingModules}
          className={`px-8 py-3 rounded-xl text-white shadow-lg font-medium flex items-center gap-2 transition-all ${allJourneysHaveModules ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10'} disabled:opacity-50`}
        >
          {isGeneratingAll ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating All...
            </>
          ) : (
            <>
              {allJourneysHaveModules ? 'Proceed to Generation' : 'Generate All Modules First'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OutlinePhase;
