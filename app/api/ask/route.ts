import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {
      name,
      age,
      income,
      expense,
      goal,
      question,
    } = await req.json();

    const monthlySavings =
      Number(income) - Number(expense);

    const savingsRate =
      Number(income) > 0
        ? Math.round(
            (monthlySavings / Number(income)) * 100
          )
        : 0;

    const healthScore = Math.min(
      100,
      Math.max(40, 60 + savingsRate / 2)
    );

    const prompt = `
You are Sakhi, an AI Financial Coach.

User Profile

Name: ${name}
Age: ${age}
Income: ₹${income}
Expense: ₹${expense}
Savings: ₹${monthlySavings}
Savings Rate: ${savingsRate}%
Health Score: ${healthScore}/100
Goal: ${goal}

The user asked:

"${question}"

Answer in under 120 words.

Be supportive.

Be realistic.

Give personalized advice based on the user's profile.

Do not use markdown.

Do not use bullet points unless necessary.

Speak naturally like a caring financial mentor.
`;

    const response = await openai.responses.create({
      model: "openrouter/free",
      input: prompt,
    });

    return Response.json({
      answer: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        answer: "Sorry, I couldn't answer that right now.",
      },
      { status: 500 }
    );
  }
}