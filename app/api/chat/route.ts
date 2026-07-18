import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { income, expense, goal, age, name } = await req.json();
 const monthlySavings = Number(income) - Number(expense);

  const savingsRate =
  Number(income) > 0
    ? Math.round((monthlySavings / Number(income)) * 100)
    : 0;
    const healthScore = Math.min(
  100,
  Math.max(40, 60 + savingsRate / 2)
);
  const prompt = `
You are Sakhi, an empathetic AI Financial Coach for first-time earners in India.

Your job is to analyze the user's finances and generate a concise, encouraging Financial Twin Report.

USER DETAILS

Name: ${name}
Age: ${age}
Monthly Income: ₹${income}
Monthly Expenses: ₹${expense}
Monthly Savings: ₹${monthlySavings}
Financial Health Score: ${healthScore}/100
Savings Rate: ${savingsRate}%
Financial Goal: ${goal}

INSTRUCTIONS

- Return plain text only.
- Never use Markdown.
- Never use **, __, #, *, backticks, tables, bullet symbols, or code blocks.
- Use emojis naturally.
- Leave one blank line between every section.
- Keep the response under 220 words.
- Be warm, motivating, and realistic.
- Do not exaggerate or make impossible promises.
- Give advice based on the user's income, savings, and goal.
- Mention actual numbers from the user whenever helpful.
- Do not repeat the user's inputs unnecessarily.
- Write as if you're talking directly to the user.

Generate the report using EXACTLY this structure:

🌸 Personal Greeting

Write a warm 1–2 sentence greeting using the user's name.

⭐ Financial Health Score

The user's score is ${healthScore}/100.

Do NOT calculate a new score.

Simply explain in one short sentence why this score is appropriate.

💰 Monthly Savings

Mention the monthly savings amount and whether it is good, average, or needs improvement.

📊 Savings Rate

Mention the savings rate percentage and briefly explain what it means.

🎯 Goal Analysis

Explain whether the user's financial goal is realistic.
Suggest the next logical milestone before reaching that goal.

💡 Top 3 Personalized Action Steps

Write exactly three short, practical recommendations.

⚠️ Biggest Financial Risk

Mention one important financial mistake the user should avoid.

❤️ Motivation

End with one warm and encouraging sentence.

Return ONLY the report.

Do not add any extra text before or after it.
`;

    const response = await openai.responses.create({
      model: "openrouter/free",
      input: prompt,
    });
    


    return NextResponse.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
}