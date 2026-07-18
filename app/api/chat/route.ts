import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const { income, expense, goal, age, name } = await req.json();

    const prompt = `
You are Sakhi, a friendly AI financial literacy mentor for first-time earners.

User Details:
- Name: ${name}
- Age: ${age}
- Monthly Income: ₹${income}
- Monthly Expense: ₹${expense}
- Financial Goal: ${goal}

Give:
1. Financial Health Summary
2. Savings Advice
3. Investment Suggestion (beginner-friendly)
4. One motivational sentence

Keep the response under 200 words.
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