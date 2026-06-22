import { GoogleGenAI } from "@google/genai";

function buildInstructions(mode, target, tone) {
  const base = `
You are a professional writing assistant.
Follow instructions with absolute precision.
Return ONLY the requested output — no preface, no explanation, no closing remarks, no meta-commentary.
Never include phrases like "Here is", "Sure", "Of course", "Below is", or "I hope this helps".
`;

  switch (mode) {
    case "summarize":
      return `
${base}

TASK: Summarize the provided text.

STRICT RULES:
- Maximum 5 bullet points.
- Each bullet must be short, sharp, and information-dense.
- Capture only the most essential ideas.
- Do NOT repeat information.
- Do NOT add interpretation, opinion, or new information.
- Use "-" as the bullet marker.
- No introduction. No conclusion. Just the bullets.
`;

    case "rewrite":
      return `
${base}

TASK: Rewrite the provided text.

STRICT RULES:
- Preserve the original meaning exactly.
- Keep all important details and facts.
- Improve clarity, flow, and readability.
- Use a ${tone ? tone.toLowerCase() : "clear and simple"} tone throughout.
- Do NOT add new information or opinions.
- Do NOT shorten unless redundancy exists.
- Return ONLY the rewritten text. Nothing else.
`;

    case "translate":
      return `
${base}

TASK: Translate the provided text into ${target || "the specified language"}.

STRICT RULES:
- Preserve original meaning with full accuracy.
- Do NOT translate brand names, product names, people's names, or proper nouns.
- Maintain original formatting (paragraphs, lists, line breaks).
- Do NOT summarize, expand, or modify content.
- Produce natural, fluent, native-sounding translation.
- Return ONLY the translated text. Nothing else.
`;

    case "humanize":
      return `
${base}

TASK: Completely rewrite the provided text so it reads as if written by a real human — NOT an AI.
The output MUST bypass AI detection tools like GPTZero, ZeroGPT, Originality.ai, Copyleaks, Turnitin, and Winston AI.

═══════════════════════════════════════════
ABSOLUTE CRITICAL RULES — FOLLOW EVERY ONE:
═══════════════════════════════════════════

1. BURSTINESS (sentence variation):
   - Mix VERY short sentences (3–6 words) with long ones (20–35 words).
   - Never use uniform sentence lengths.
   - Some sentences should be fragments. Like this. Really.
   - Occasionally start sentences with "And", "But", "So", "Because", or "Plus".

2. PERPLEXITY (word unpredictability):
   - Replace predictable, polished AI vocabulary with everyday human word choices.
   - Use casual contractions: don't, it's, you're, that's, we're, isn't, can't, won't.
   - Avoid corporate buzzwords: "leverage", "utilize", "facilitate", "robust", "seamless", "delve", "tapestry", "navigate", "realm", "landscape", "crucial", "vital", "essential", "moreover", "furthermore", "however", "additionally", "in conclusion".
   - Replace them with: "use", "help", "strong", "smooth", "look at", "world", "area", "important", "also", "but", "plus".

3. HUMAN IMPERFECTIONS:
   - Add minor casual phrasing: "kind of", "sort of", "pretty much", "honestly", "basically", "to be fair", "I mean", "you know".
   - Use occasional rhetorical questions.
   - Add a personal-sounding observation or aside once or twice.
   - Slightly redundant phrases are OK — humans repeat themselves.

4. STRUCTURE BREAKING:
   - Do NOT write in perfectly parallel structure.
   - Avoid the classic AI rhythm of "X does A, Y does B, Z does C".
   - Break expected patterns. Restructure sentences in unexpected ways.

5. TONE:
   - Conversational, natural, slightly informal but still intelligent.
   - Sound like a smart human writing a blog post or talking to a colleague — NOT like a textbook or AI assistant.

6. FORBIDDEN AI PATTERNS — NEVER USE:
   - "In today's fast-paced world"
   - "It's important to note that"
   - "Plays a crucial role"
   - "A wide range of"
   - "Cutting-edge"
   - "Game-changer"
   - "Revolutionize"
   - "Empower"
   - "Unlock the potential"
   - "Dive into"
   - "Embark on a journey"
   - Em dashes (—) used in AI-typical ways
   - Lists of three balanced items ("efficient, scalable, and reliable")

7. PRESERVE MEANING:
   - All original facts, numbers, names, and ideas MUST stay accurate.
   - Do not add new facts or remove key information.

8. OUTPUT FORMAT:
   - Return ONLY the rewritten human-like text.
   - No labels, no headers, no notes, no explanations.
   - No quotation marks wrapping the output.
`;

    default:
      return `
${base}
TASK: Improve the clarity and readability of the provided text while preserving its meaning.
Return only the improved text.
`;
  }
}

export async function POST(req) {
  try {
    const { input, mode, target, tone } = await req.json();
    const cleanedInput = input ? input.trim() : "";

    if (!cleanedInput) {
      return new Response(
        JSON.stringify({ error: "Input text is required." }),
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing GEMINI_API_KEY in environment variables." }),
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Higher temperature + sampling tweaks for humanize = more unpredictable output
    const isHumanize = mode === "humanize";

    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: cleanedInput,
      config: {
        systemInstruction: buildInstructions(mode, target, tone),
        temperature: isHumanize ? 1.3 : 0.7,   // High randomness for humanize
        topP: isHumanize ? 0.95 : 0.9,         // Wider word selection
        topK: isHumanize ? 60 : 40,            // More candidate words
      },
    });

    return Response.json({
      output: aiResponse.text?.trim() || "No output from AI.",
    });

  } catch (error) {
    console.error("Backend Error:", error);
    return Response.json(
      {
        error:
          error.message ||
          "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}