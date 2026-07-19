import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { salaryText } = await req.json();

    const prompt = `
You are Sakhi AI, an expert financial advisor for young professionals.

Analyze the salary slip text below.

Salary Slip:
${salaryText}

Return a beautiful report.

Rules:

- Don't use markdown tables.
- Don't use ** or ##.
- Don't use --- lines.
- Use emojis.
- Keep the report clean and readable.
- Use short sections.
- Add spacing between sections.

Format exactly like this:

🤖 Sakhi Salary Analysis

👤 Employee

Name:
Company:
Role:

💰 Salary Breakdown

Gross Salary:
Net Salary:
Basic Salary:
HRA:
PF:
Income Tax:

📊 Financial Health

Overall Financial Score: XX/100

Deduction Ratio:
Take-home Percentage:
Tax Efficiency:

One sentence explaining overall financial health.

💡 Personalized Suggestions

• suggestion 1

• suggestion 2

• suggestion 3

🚀 Wealth Prediction

If the employee invests 10% of monthly net salary every month with an expected annual return of 12%,

show approximate wealth after

5 years

10 years

15 years

🎯 Quick Checklist

✅ ...

✅ ...

✅ ...

End with a motivational message from Sakhi.
`;


    const response = await openai.responses.create({
      model: "openrouter/free",
      input: prompt,
    });

    return Response.json({
      answer: response.output_text,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      answer: "Unable to analyze salary slip.",
    });
  }
}