import React, { useState } from 'react';
import { AppStep, PaperConfig, Section } from './types';
import InputPhase from './components/InputPhase';
import OutlinePhase from './components/OutlinePhase';
import GenerationPhase from './components/GenerationPhase';
import FinalView from './components/FinalView';
import { generateOutline } from './services/geminiService';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [config, setConfig] = useState<PaperConfig>({
    title: '',
    tone: 'Formal Academic',
    template: 'Standard Article',
    targetLength: 'Standard Article (8-12 pages)',
    rawSketch: ''
  });
  const [sections, setSections] = useState<Section[]>([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);

  const handleConfigChange = (key: keyof PaperConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateOutline = async () => {
    setIsGeneratingOutline(true);
    try {
      const rawSections = await generateOutline(config);
      const formattedSections: Section[] = rawSections.map(s => ({
        id: crypto.randomUUID(),
        title: s.title,
        description: s.description,
        content: '',
        status: 'PENDING'
      } as Section)); // Casting for status string literal
      
      setSections(formattedSections);
      setStep(AppStep.OUTLINE);
    } catch (error) {
      alert("Failed to generate outline. Please try again or check your API key.");
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const startGeneration = () => {
    setStep(AppStep.GENERATING);
  };

  const handleRestart = () => {
    setStep(AppStep.INPUT);
    setConfig({
      title: '',
      tone: 'Formal Academic',
      template: 'Standard Article',
      targetLength: 'Standard Article (8-12 pages)',
      rawSketch: ''
    });
    setSections([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent" />
      </div>
      
      <div className="relative z-10">
        {step === AppStep.INPUT && (
          <InputPhase 
            config={config} 
            onChange={handleConfigChange} 
            onNext={handleCreateOutline} 
            isGenerating={isGeneratingOutline}
          />
        )}

        {step === AppStep.OUTLINE && (
          <OutlinePhase 
            sections={sections} 
            setSections={setSections} 
            onNext={startGeneration}
            onBack={() => setStep(AppStep.INPUT)}
          />
        )}

        {step === AppStep.GENERATING && (
          <GenerationPhase 
            config={config} 
            sections={sections} 
            setSections={setSections}
            onFinished={() => setStep(AppStep.FINISHED)}
          />
        )}

        {step === AppStep.FINISHED && (
          <FinalView 
            config={config} 
            sections={sections} 
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;