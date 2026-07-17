"use client";

import { useState } from "react";

export default function ChatPage() {
  const [step, setStep] = useState(0);

const [name, setName] = useState("");

const [age, setAge] = useState("");

const [income, setIncome] = useState("");

const [expense, setExpense] = useState("");

const [goal, setGoal] = useState("");

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

{step>=5 && (
<>
🎉 Thanks {name}!<br/><br/>

Generating your AI Financial Twin...

</>
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