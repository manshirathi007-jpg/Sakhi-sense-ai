"use client";

import { useState } from "react";

export default function ChatPage() {
  const [step, setStep] = useState(0);

const [name, setName] = useState("");

const [age, setAge] = useState("");

const [income, setIncome] = useState("");

const [expense, setExpense] = useState("");

const [goal, setGoal] = useState("");
const monthlySavings =
  Number(income || 0) - Number(expense || 0);

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
        <p className="text-lg">

{step===0 && <>👋 Hi! I'm Sakhi.<br/><br/>What's your name?</>}

{step===1 && <>Nice to meet you <b>{name}</b> 🌸<br/><br/>How old are you?</>}

{step===2 && <>Awesome!<br/><br/>What's your monthly income?</>}

{step===3 && <>Great!<br/><br/>How much do you spend every month?</>}

{step===4 && <>Last question 🎯<br/><br/>What's your biggest financial goal?</>}

{step >= 5 && (

<div className="space-y-6">

<h2 className="text-3xl font-bold text-purple-700">
🌸 Welcome {name}
</h2>

<div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center text-white">

<p className="text-lg">
Financial Health Score
</p>

<h1 className="mt-3 text-6xl font-extrabold">
{healthScore}
</h1>

<p className="mt-2">
Excellent Start 🚀
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
🤖 Sakhi AI Recommendations
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
</p>

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
  onClick={() => setStep(step + 1)}
  className="mt-6 w-full rounded-xl bg-purple-600 py-4 font-bold text-white hover:bg-purple-700"
>
  Continue →
</button>

      </div>
    </main>
  );
}