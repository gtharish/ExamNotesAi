import "dotenv/config";
import { generateGeminiResponse } from "./services/googleGemini.js";

const test = async () => {
    try {

        const prompt = `
You are a STRICT JSON generator for an exam preparation system.

VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes
- No comments, no trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Convert the given Topic into exam-focused notes.

INPUT:
Topic: web dev
Class Level: Not specified
Exam Type: General
Revision Mode: OFF
Include Diagram: NO
Include Charts: NO

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be Markdown formatted
- Use headings and bullet points
- Avoid unnecessary paragraphs

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
  - Notes must be VERY SHORT
  - Only bullet points
  - One-line answers only
  - Definitions, formulas, keywords
  - No paragraphs
  - No explanations
  - Content must feel like:
    - last-day revision
    - 5-minute exam cheat sheet
  - revisionPoints MUST summarize ALL important facts

- If REVISION MODE is OFF:
  - Notes must be DETAILED but exam-focused
  - Each Topic should include:
    - definition
    - short explanation
    - examples (if applicable)
  - Paragraph length: max 2-4 lines
  - No storytelling
  - No extra theory

IMPORTANCE RULES:
- Divide sub-Topics into THREE categories:
  - Very Important Topics
  - Important Topics
  - Frequently Asked Topics
- All three categories MUST be present
- Base importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
  - diagram.data MUST be a SINGLE STRING
  - Valid Mermaid syntax only
  - Must start with: graph TD
  - Wrap EVERY node label in square brackets [ ]
  - Do NOT use special characters inside labels
- If INCLUDE DIAGRAM is NO:
  - diagram.data MUST be ""

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on Topic type:
    - THEORY Topic → bar or pie (importance / weightage)
    - PROCESS Topic → bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie

OUTPUT FORMAT:

Return ONLY a JSON object with exactly this structure:

{
  "title": "string",
  "description": "string",
  "topics": [
    {
      "name": "string",
      "importance": "Very Important Topics | Important Topics | Frequently Asked Topics",
      "content": "string",
      "examples": ["string"]
    }
  ],
  "revisionPoints": [
    "string"
  ],
  "diagram": {
    "data": "string"
  },
  "charts": [
    {
      "type": "bar | line | pie",
      "labels": ["string"],
      "data": [0]
    }
  ]
}

IMPORTANT:
- Return ONLY the JSON object.
- Do not wrap the JSON in markdown code fences.
- Do not add any text before or after the JSON.
- Follow the exact property names shown above.
- Do not add extra properties.
`;

        console.log("===== SENDING PROMPT TO GEMINI =====");

        const result = await generateGeminiResponse(prompt);

        console.log("\n===== GEMINI RESPONSE =====");
        console.log(result);

        console.log("\n===== JSON STRINGIFIED =====");
        console.log(JSON.stringify(result, null, 2));

        console.log("\n===== CHECKING STRUCTURE =====");

        console.log("Title:", result.title);
        console.log("Description:", result.description);
        console.log("Topics:", result.topics);
        console.log("Revision Points:", result.revisionPoints);
        console.log("Diagram:", result.diagram);
        console.log("Charts:", result.charts);

    } catch (error) {

        console.error("\n===== TEST ERROR =====");
        console.error(error);

    }
};

test();