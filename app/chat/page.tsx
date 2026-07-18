"use client";

import { useState } from "react";

export default function ChatPage() {
  const [step, setStep] = useState(0);

const [name, setName] = useState("");

const [age, setAge] = useState("");

const [income, setIncome] = useState("");

const [expense, setExpense] = useState("");

const [goal, setGoal] = useState("");
const [question, setQuestion] = useState("");

const [askAnswer, setAskAnswer] = useState("");

const [loadingAsk, setLoadingAsk] = useState(false);

const monthlySavings = Number(income || 0) - Number(expense || 0);

const savingsRate =
  income
    ? Math.round((monthlySavings / Number(income)) * 100)
    : 0; 

const healthScore =
  Math.min(
    100,
    Math.max(
      40,
      60 + savingsRate / 2
    )
  );
  const [aiAdvice, setAiAdvice] = useState("");

const [loadingAI, setLoadingAI] = useState(false);
  function handleContinue() {
  if (step === 0 && !name.trim()) return;
  if (step === 1 && !age.trim()) return;
  if (step === 2 && !income.trim()) return;
  if (step === 3 && !expense.trim()) return;
  if (step === 4 && !goal.trim()) return;

  if (step === 4) {
  setStep(5);
  generateReport();
} else {
  setStep(step + 1);
}
  async function generateReport() {
  setLoadingAI(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        income,
        expense,
        goal,
      }),
    });

    const data = await res.json();

    setAiAdvice(data.answer);
  } catch (error) {
    setAiAdvice("Sorry! AI couldn't generate advice right now.");
  }

  setLoadingAI(false);
}
}
async function askSakhi() {
  if (!question.trim()) return;

  setLoadingAsk(true);

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      age,
      income,
      expense,
      goal,
      question,
    }),
  });

  const data = await res.json();

  setAskAnswer(data.answer);

  setLoadingAsk(false);
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-10">

        {/* AI Header */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center text-2xl">
            🌸
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Meet Sakhi
            </h1>

            <p className="text-gray-500">
              Your AI Financial Twin
            </p>
          </div>
        </div>

        {/* Chat Bubble */}
        <div className="mt-8 text-lg">

{step===0 && <>👋 Hi! I'm Sakhi.<br/><br/>What's your name?</>}

{step===1 && <>Nice to meet you <b>{name}</b> 🌸<br/><br/>How old are you?</>}

{step===2 && <>Awesome!<br/><br/>What's your monthly income?</>}

{step===3 && <>Great!<br/><br/>How much do you spend every month?</>}

{step===4 && <>Last question 🎯<br/><br/>What's your biggest financial goal?</>}

{step >= 5 && (

<div className="space-y-6">

<div className="text-center">

<h2 className="text-5xl font-extrabold text-purple-700">
🌸 Your Financial Twin
</h2>

<p className="mt-3 text-gray-600">
Personalized AI Financial Report for <b>{name}</b>
</p>

</div>

<div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center text-white">

<p className="text-xl font-semibold">
⭐ Financial Health Score
</p>

<h1 className="mt-4 text-7xl font-extrabold">
{healthScore}/100
</h1>

<div className="mt-6 h-3 rounded-full bg-white/30">

<div
className="h-3 rounded-full bg-white"
style={{ width: `${healthScore}%` }}
/>

</div>

<p className="mt-5 text-lg">
Keep improving every month 🚀
</p>

</div>

<div className="grid gap-5 md:grid-cols-2">

<div className="rounded-xl bg-white p-6 shadow">

<h3 className="font-bold">
💰 Monthly Savings
</h3>

<p className="mt-3 text-3xl font-bold text-green-600">
₹{monthlySavings}
</p>

</div>

<div className="rounded-xl bg-white p-6 shadow">

<h3 className="font-bold">
📈 Savings Rate
</h3>

<p className="mt-3 text-3xl font-bold text-purple-600">
{savingsRate}%
</p>

</div>

<div className="rounded-xl bg-white p-6 shadow">

<h3 className="font-bold">
🎯 Goal
</h3>

<p className="mt-3 text-xl">
{goal}
</p>

</div>

<div className="rounded-xl bg-white p-6 shadow">

<h3 className="font-bold">
🛡 Emergency Fund
</h3>

<p className="mt-3 text-xl">
2 Months
</p>

</div>

</div>

<div className="rounded-2xl bg-purple-100 p-6">

<h3 className="text-xl font-bold">
{loadingAI ? (
  <div className="mt-6">
    <p className="animate-pulse text-purple-700 font-semibold">
      🤖 Sakhi is thinking....
    </p>

  </div>
) : (
  <div className="mt-6 whitespace-pre-wrap rounded-xl bg-white p-5">
    {aiAdvice}
  </div>
)}
</h3>

<ul className="mt-4 space-y-2">

<li>✅ Save ₹{Math.round(monthlySavings*0.4)} every month</li>

<li>✅ Start SIP of ₹3000</li>

<li>✅ Build an Emergency Fund</li>

<li>✅ Track unnecessary expenses weekly</li>

</ul>

</div>

</div>

)}
</div>

        {/* Input */}
        <input
  value={
    step === 0
      ? name
      : step === 1
      ? age
      : step === 2
      ? income
      : step === 3
      ? expense
      : goal
  }
  onChange={(e) => {
    if (step === 0) setName(e.target.value);
    else if (step === 1) setAge(e.target.value);
    else if (step === 2) setIncome(e.target.value);
    else if (step === 3) setExpense(e.target.value);
    else setGoal(e.target.value);
  }}
  placeholder={
    step === 0
      ? "Enter your name..."
      : step === 1
      ? "Enter age..."
      : step === 2
      ? "Monthly Income..."
      : step === 3
      ? "Monthly Expense..."
      : "Your Financial Goal..."
  }
  className="mt-8 w-full rounded-xl border p-4"
/>

<button
  onClick={handleContinue}
  className="mt-6 w-full rounded-xl bg-purple-600 py-4 font-bold text-white hover:bg-purple-700"
>
  Continue →
</button>
<div className="mt-10 text-center">

<p className="text-sm text-gray-500">

Generated by 🌸 SakhiSense AI

</p>
<div className="mt-10 rounded-2xl border bg-white p-6 shadow-lg">

  <h2 className="text-2xl font-bold text-purple-700">
    💬 Ask Sakhi
  </h2>

  <p className="mt-2 text-gray-500">
    Ask anything about your finances.
  </p>

  <input
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    placeholder="Example: Can I buy an iPhone?"
    className="mt-5 w-full rounded-xl border p-4"
  />

  <button
    onClick={askSakhi}
    className="mt-4 w-full rounded-xl bg-purple-600 py-4 font-bold text-white hover:bg-purple-700"
  >
    Ask Sakhi
  </button>

  {(loadingAsk || askAnswer) && (
    <div className="mt-6 rounded-xl bg-purple-50 p-5">

      <h3 className="font-bold text-purple-700">
        🌸 Sakhi's Answer
      </h3>

      <p className="mt-3 whitespace-pre-wrap">
        {loadingAsk
          ? "🤖 Sakhi is thinking..."
          : askAnswer}
      </p>

    </div>
  )}

</div>

</div>

      </div>
    </main>
  );
}