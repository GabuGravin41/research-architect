
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { CurriculumConfig, Journey, Module, Section } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

/**
 * Stage 1: The Grand Architect
 * Generates the high-level Journeys for the curriculum.
 */
export const generateJourneys = async (config: CurriculumConfig): Promise<Array<{ title: string; description: string }>> => {
  const ai = getAI();
  const model = "gemini-3.1-pro-preview"; 

  const prompt = `
    You are a Master Curriculum Designer for elite mathematics (Olympiad level).
    Task: Create the high-level "Journeys" (conceptual layers) for a discovery-based curriculum titled "${config.title}".
    
    **Vision:**
    ${config.rawVision}

    **Requirements:**
    1. Generate exactly 7 Journeys.
    2. Each Journey should represent a major conceptual leap.
    3. Focus on discovery-based learning: problems first, names later.
    4. Target Audience: ${config.targetAudience}.

    Return a JSON array of objects with {title, description}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Journey generation error:", error);
    throw error;
  }
};

/**
 * Stage 2: The Journey Guide
 * Generates Modules for a specific Journey.
 */
export const generateModules = async (journey: Journey, config: CurriculumConfig): Promise<Array<{ title: string; description: string }>> => {
  const ai = getAI();
  const model = "gemini-3.1-pro-preview"; 

  const prompt = `
    You are a Curriculum Architect. 
    Task: Break down the Journey "${journey.title}" into 5-7 distinct Modules.
    
    **Journey Description:**
    ${journey.description}

    **Curriculum Context:**
    Title: ${config.title}
    Audience: ${config.targetAudience}

    **Module Requirements:**
    1. Each module should be a self-contained unit of discovery.
    2. Follow the "Discovery" philosophy: Motivation -> Exploration -> Concept Discovery -> Explanation -> Advanced Problems.
    
    Return a JSON array of objects with {title, description}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Module generation error:", error);
    throw error;
  }
};

/**
 * Stage 3: The Module Scribe
 * Generates Sections for a specific Module.
 */
export const generateSections = async (
  module: Module, 
  journey: Journey, 
  config: CurriculumConfig,
  onThought?: (thought: string) => void
): Promise<Array<{ title: string; description: string }>> => {
  const ai = getAI();
  const model = "gemini-3.1-pro-preview"; 

  const prompt = `
    You are a Mathematical Pedagogue.
    Task: Create a detailed section-by-section outline for the Module "${module.title}".
    
    **Module Context:**
    ${module.description}
    (Part of Journey: ${journey.title})

    **Required Section Types (Ensure these are covered):**
    1. Motivation/Hook
    2. Exploration Problems (The "Discovery" phase)
    3. Concept Formalization
    4. Detailed Explanation/Proof
    5. Advanced Olympiad-Level Problems
    6. Reflection/Metacognition

    Return a JSON array of objects with {title, description}.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    if (onThought && response.thought) {
      onThought(response.thought);
    }

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Section outline error:", error);
    throw error;
  }
};

/**
 * Stage 4: The Final Writer
 * Generates the actual content for a section with context compression.
 */
export const generateSectionContent = async (
  section: Section,
  module: Module,
  journey: Journey,
  config: CurriculumConfig,
  previousSectionContent?: string,
  moduleSummary?: string,
  onChunk?: (chunk: string) => void,
  onThought?: (thought: string) => void
): Promise<string> => {
  const ai = getAI();
  // Using Flash for faster streaming and better reliability in high-volume generation
  const model = "gemini-3-flash-preview"; 

  const prompt = `
    You are a World-Class Mathematics Educator writing for top 0.1% students.
    Task: Write the full content for the section: "${section.title}".

    **Context (Compressed):**
    - Book: ${config.title}
    - Journey: ${journey.title}
    - Module: ${module.title}
    - Module Goal: ${module.description}
    - Section Goal: ${section.description}

    **Continuity:**
    ${moduleSummary ? `Summary of previous modules: ${moduleSummary}` : ""}
    ${previousSectionContent ? `Immediately preceding section content: \n"""\n${previousSectionContent}\n"""` : "This is the start of the module."}

    **Style Guidelines:**
    - Tone: ${config.tone}
    - Rhetorical Mode: ${config.rhetoricalMode}
    - Use LaTeX for all math.
    - Prioritize conceptual depth.
    - For problems, provide hints or scaffolding if they are extremely difficult.
    - Output in Markdown with LaTeX.

    **Specific Instructions for this Section:**
    ${section.description}
  `;

  try {
    if (onChunk) {
      const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });

      let fullText = "";
      let fullThought = "";
      for await (const chunk of response) {
        const text = chunk.text;
        const thought = chunk.thought;

        if (thought && onThought) {
          fullThought += thought;
          onThought(fullThought);
        }

        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      }
      return fullText;
    } else {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });
      if (onThought && response.thought) {
        onThought(response.thought);
      }
      return response.text || "";
    }
  } catch (error) {
    console.error(`Content generation error:`, error);
    throw error;
  }
};
