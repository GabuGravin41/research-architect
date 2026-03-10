
import React, { useState, useEffect } from 'react';
import { AppStep, CurriculumConfig, Journey, ProjectState, Status } from './types';
import InputPhase from './components/InputPhase';
import OutlinePhase from './components/OutlinePhase';
import GenerationPhase from './components/GenerationPhase';
import FinalView from './components/FinalView';
import { generateJourneys } from './services/geminiService';

const STORAGE_KEY = 'research_architect_project';

function App() {
  const [state, setState] = useState<ProjectState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
    return {
      config: {
        title: '',
        targetAudience: 'Top Olympiad level',
        tone: 'Inspirational & Rigorous',
        discipline: 'Mathematics',
        rhetoricalMode: 'Discovery-Based (Problems First)',
        rawVision: ''
      },
      journeys: [],
      currentStep: AppStep.INPUT,
      lastUpdated: Date.now()
    };
  });

  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleConfigChange = (key: keyof CurriculumConfig, value: string) => {
    setState(prev => ({
      ...prev,
      config: { ...prev.config, [key]: value },
      lastUpdated: Date.now()
    }));
  };

  const handleCreateJourneys = async () => {
    setIsGeneratingOutline(true);
    try {
      const rawJourneys = await generateJourneys(state.config);
      const formattedJourneys: Journey[] = rawJourneys.map(j => ({
        id: crypto.randomUUID(),
        title: j.title,
        description: j.description,
        modules: [],
        status: Status.PENDING
      }));
      
      setState(prev => ({
        ...prev,
        journeys: formattedJourneys,
        currentStep: AppStep.OUTLINE,
        lastUpdated: Date.now()
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to generate curriculum journeys. Please check your connection and try again.");
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const handleRestart = () => {
    if (confirm("This will clear all generated content. Are you sure?")) {
      const newState: ProjectState = {
        config: {
          title: '',
          targetAudience: 'Top Olympiad level',
          tone: 'Inspirational & Rigorous',
          discipline: 'Mathematics',
          rhetoricalMode: 'Discovery-Based (Problems First)',
          rawVision: ''
        },
        journeys: [],
        currentStep: AppStep.INPUT,
        lastUpdated: Date.now()
      };
      setState(newState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent" />
      </div>
      
      <div className="relative z-10">
        {state.currentStep === AppStep.INPUT && (
          <InputPhase 
            config={state.config} 
            onChange={handleConfigChange} 
            onNext={handleCreateJourneys} 
            isGenerating={isGeneratingOutline}
            hasExistingContent={state.journeys.length > 0}
            onContinue={() => setState(prev => ({ ...prev, currentStep: AppStep.OUTLINE }))}
          />
        )}

        {state.currentStep === AppStep.OUTLINE && (
          <OutlinePhase 
            state={state}
            setState={setState}
            onNext={() => setState(prev => ({ ...prev, currentStep: AppStep.GENERATING }))}
            onBack={() => setState(prev => ({ ...prev, currentStep: AppStep.INPUT }))}
          />
        )}

        {state.currentStep === AppStep.GENERATING && (
          <GenerationPhase 
            state={state}
            setState={setState}
            onFinished={() => setState(prev => ({ ...prev, currentStep: AppStep.FINISHED }))}
          />
        )}

        {state.currentStep === AppStep.FINISHED && (
          <FinalView 
            state={state}
            onRestart={handleRestart}
            onBackToOutline={() => setState(prev => ({ ...prev, currentStep: AppStep.OUTLINE }))}
          />
        )}
      </div>
    </div>
  );
}

export default App;
