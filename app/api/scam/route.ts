import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const prompt = `
You are Sakhi AI.

Analyze this message for financial scams.

Return exactly this format:

🚨 Scam Probability: XX%

Risk Level:
LOW / MEDIUM / HIGH

Reasons:
• ...
• ...
• ...

Recommendation:
...

Message:

${message}
`;

  const response = await client.responses.create({
    model: "openrouter/free",
    input: prompt,
  });

  return Response.json({
    answer: response.output_text,
  });
}