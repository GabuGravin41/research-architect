import { GoogleGenAI, Type } from "@google/genai";
import { PaperConfig, Section } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to clean markdown blocks if the model adds them despite instructions
const cleanLatex = (text: string) => {
  return text.replace(/```latex/g, '').replace(/```/g, '').trim();
};

export const generateOutline = async (config: PaperConfig): Promise<Array<{ title: string; description: string }>> => {
  const model = "gemini-3-pro-preview"; 

  const prompt = `
    You are an expert academic editor. I have a sketch for a research paper/document. 
    Please break this sketch down into a logical sequence of sections.
    
    **Constraint:**
    The user wants a document of type: "${config.targetLength}".
    - If it is a "Dissertation" or "Extended Report", generate a comprehensive list of sections (likely 10-20 sections including sub-chapters).
    - If it is a "Short Letter", keep it concise (4-5 sections).
    
    The Title of the paper is: ${config.title}
    Tone: ${config.tone}
    Template Style: ${config.template}
    
    Here is the raw sketch:
    ${config.rawSketch}

    Return a JSON array of sections. Each section must have a 'title' and a 'description'. 
    The 'description' should contain the specific points from the sketch that belong in that section. 
    If a part of the sketch is general, assign it to the most relevant section (e.g., Introduction or Methodology).
    
    Ensure the flow is logical.
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
              description: { type: Type.STRING, description: "Detailed instructions for what goes in this section based on the sketch" }
            },
            required: ["title", "description"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No text returned from Gemini");
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
};

export const generateSectionContent = async (
  section: Section,
  allSections: Section[],
  config: PaperConfig
): Promise<string> => {
  const model = "gemini-3-pro-preview"; 

  // Context gathering: 
  const completedSections = allSections.filter(s => s.status === 'COMPLETED');
  const previousSection = completedSections.length > 0 ? completedSections[completedSections.length - 1] : null;
  
  // Truncate previous section content to save tokens but keep immediate context
  // We keep the last 3000 chars (approx 1-2 pages of text) to ensure flow
  const previousContentSnippet = previousSection 
    ? (previousSection.content.length > 3000 
        ? "...(truncated)..." + previousSection.content.slice(-3000) 
        : previousSection.content)
    : "This is the first section.";

  // We send the full structure map so it knows where it fits in the 50-page document
  const structureMap = allSections.map(s => `- ${s.title}`).join('\n');

  const prompt = `
    You are a professional mathematician and researcher writing a specific section of a paper.
    
    **Paper Metadata:**
    Title: ${config.title}
    Tone: ${config.tone}
    Style: ${config.template}
    Target Scope: ${config.targetLength}
    
    **Document Structure (Your Roadmap):**
    ${structureMap}
    
    **Current Task:**
    Write the LaTeX content for the section titled: "${section.title}".
    
    **Instructions for this section (from sketch):**
    ${section.description}
    
    **Context (End of Previous Section):**
    ${previousContentSnippet}
    
    **CRITICAL WRITING RULES:**
    1. **Mathematician Style:** When presenting math, do NOT bury equations in verbose paragraphs. Use "equation after equation" style.
       - Use \`\\begin{align}\` or \`\\begin{align*}\` for derivations.
       - Show steps clearly in a vertical flow.
       - Avoid "sketchy" lines. Be rigorous.
    2. **Fleshing Out:** Your job is to polish and expand the user's sketch into full academic prose.
       - If the user provided a formula in plain text, convert it to proper LaTeX.
       - If the user's sketch is brief, expand on the *implications* and *context* of that point, but DO NOT invent new experimental data or results unless told to "fill in gaps".
    3. **LaTeX Format:**
       - Output ONLY the raw LaTeX content for this section. Do NOT wrap it in \\begin{document}.
       - Use standard LaTeX commands (\\section, \\cite, \\ref).
    4. **Flow:** Ensure the opening sentence connects smoothly to the previous section context provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: {
            thinkingBudget: 4096 // Higher budget for complex derivation structure
        }
      }
    });

    return cleanLatex(response.text || "");
  } catch (error) {
    console.error(`Error generating section ${section.title}:`, error);
    throw error;
  }
};