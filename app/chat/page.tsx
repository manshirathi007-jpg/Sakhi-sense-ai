"use client";

import { useState } from "react";
import { downloadReport } from "@/lib/downloadReport";

export default function ChatPage() {
  // -----------------------------
  // Steps
  // -----------------------------
  const [step, setStep] = useState(0);

  // -----------------------------
  // User Data
  // -----------------------------
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [goal, setGoal] = useState("");

  // -----------------------------
  // AI Report
  // -----------------------------
  const [aiAdvice, setAiAdvice] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // -----------------------------
  // Ask Sakhi
  // -----------------------------
  const [question, setQuestion] = useState("");
  const [askAnswer, setAskAnswer] = useState("");
  const [loadingAsk, setLoadingAsk] = useState(false);

  // -----------------------------
  // Calculations
  // -----------------------------
  const monthlySavings =
    Number(income || 0) - Number(expense || 0);

  const savingsRate =
    Number(income) > 0
      ? Math.round((monthlySavings / Number(income)) * 100)
      : 0;

  const healthScore = Math.max(
    40,
    Math.min(100, 60 + savingsRate / 2)
  );

  // -----------------------------
  // Generate AI Report
  // -----------------------------
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
    } catch {
      setAiAdvice(
        "Sorry, Sakhi couldn't generate your report."
      );
    }

    setLoadingAI(false);
  }

  // -----------------------------
  // Continue Button
  // -----------------------------
  async function handleContinue() {
    if (step === 0 && !name.trim()) return;
    if (step === 1 && !age.trim()) return;
    if (step === 2 && !income.trim()) return;
    if (step === 3 && !expense.trim()) return;
    if (step === 4 && !goal.trim()) return;

    if (step === 4) {
      setStep(5);
      await generateReport();
    } else {
      setStep(step + 1);
    }
  }

  // -----------------------------
  // Ask Sakhi
  // -----------------------------
  async function askSakhi() {
    if (!question.trim()) return;

    setLoadingAsk(true);

    try {
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
    } catch {
      setAskAnswer(
        "Sorry! Sakhi couldn't answer right now."
      );
    }

    setLoadingAsk(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">
  <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl p-10">

    {/* Header */}
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-2xl">
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

    {/* ---------------- ONBOARDING ---------------- */}

    {step < 5 && (

      <div className="mt-10">

        <div className="rounded-2xl bg-purple-50 p-6 text-lg">

          {step === 0 && (
            <>
              👋 Hi! I'm Sakhi.
              <br />
              <br />
              What's your name?
            </>
          )}

          {step === 1 && (
            <>
              Nice to meet you <b>{name}</b> 🌸
              <br />
              <br />
              How old are you?
            </>
          )}

          {step === 2 && (
            <>
              Awesome!
              <br />
              <br />
              What's your monthly income?
            </>
          )}

          {step === 3 && (
            <>
              Great!
              <br />
              <br />
              What's your monthly expense?
            </>
          )}

          {step === 4 && (
            <>
              Last question 🎯
              <br />
              <br />
              What's your biggest financial goal?
            </>
          )}

        </div>

        <input
          className="mt-8 w-full rounded-xl border p-4"
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
              ? "Enter your name"
              : step === 1
              ? "Enter your age"
              : step === 2
              ? "Monthly Income"
              : step === 3
              ? "Monthly Expense"
              : "Your Financial Goal"
          }
        />

        <button
          onClick={handleContinue}
          className="mt-6 w-full rounded-xl bg-purple-600 py-4 font-bold text-white hover:bg-purple-700"
        >
          Continue →
        </button>

      </div>

    )}

    {/* ---------------- REPORT ---------------- */}

    {step >= 5 && (

      <div className="mt-10 space-y-8">

        <div className="text-center">

          <h2 className="text-5xl font-extrabold text-purple-700">
            🌸 Your Financial Twin
          </h2>

          <p className="mt-2 text-gray-500">
            Personalized AI Report for <b>{name}</b>
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-center text-white">

          <p className="text-xl">
            Financial Health Score
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

          <p className="mt-5">
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

            <p className="mt-3">
              {goal}
            </p>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h3 className="font-bold">
              🛡 Emergency Fund
            </h3>

            <p className="mt-3">
              2 Months
            </p>

          </div>

        </div>
                {/* AI Report */}

        <div className="rounded-2xl bg-purple-100 p-6">

          <h2 className="text-2xl font-bold text-purple-700">
            🤖 Sakhi AI Financial Report
          </h2>

          <div className="mt-6">

            {loadingAI ? (

              <p className="animate-pulse font-semibold text-purple-700">
                🤖 Sakhi is preparing your report...
              </p>

            ) : (

              <>
                <div className="whitespace-pre-wrap rounded-xl bg-white p-5 shadow">
                  {aiAdvice}
                </div>

                <button
  onClick={downloadReport}
  className="mt-6 w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700"
>
  📄 Download Report
</button>

              </>

            )}

          </div>

        </div>

        {/* Ask Sakhi */}

        <div className="rounded-2xl border bg-white p-6 shadow">

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

    )}
        <div className="mt-10 text-center">

      <p className="text-sm text-gray-500">
        Generated by 🌸 SakhiSense AI
      </p>

    </div>

  </div>

</main>
  );
}