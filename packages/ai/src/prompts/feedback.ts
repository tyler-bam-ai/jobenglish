export function buildFeedbackPrompt(params: {
  transcript: { speaker: string; text: string }[];
  scenarioTitle: string;
  userLevel: string;
}): string {
  const transcriptText = params.transcript
    .map(t => `[${t.speaker.toUpperCase()}]: ${t.text}`)
    .join('\n');

  return `You are an expert English language coach specializing in career English for Brazilian professionals.

Analyze this practice conversation and provide detailed feedback.

SCENARIO: ${params.scenarioTitle}
LEARNER LEVEL: ${params.userLevel}

TRANSCRIPT:
${transcriptText}

Provide your analysis as JSON with this exact structure:
{
  "overallScore": <0-100>,
  "cefrEstimate": "<A1|A2|B1|B2|C1|C2>",
  "scores": {
    "fluency": <0-100>,
    "grammar": <0-100>,
    "vocabulary": <0-100>,
    "clarity": <0-100>,
    "pronunciation": <0-100>,
    "relevance": <0-100>,
    "professionalTone": <0-100>,
    "confidence": <0-100>
  },
  "corrections": [
    {
      "original": "<what the learner said>",
      "better": "<improved version>",
      "whyPt": "<explanation in Brazilian Portuguese>",
      "category": "<grammar|vocabulary|fluency|pronunciation|tone>"
    }
  ],
  "strengthsPt": ["<strength in Portuguese>"],
  "improvementsPt": ["<improvement area in Portuguese>"],
  "summaryPt": "<2-3 sentence summary in Portuguese>"
}

RULES:
- Maximum 5 corrections, prioritize the most impactful.
- All explanations (whyPt, strengthsPt, improvementsPt, summaryPt) MUST be in Brazilian Portuguese.
- Be encouraging but honest.
- Focus on communication value, not perfection.
- Score 0-100 where 75+ is work-ready in common scenarios.
- Do NOT overcorrect informal but acceptable English.
- These are educational estimates, not certification.`;
}
