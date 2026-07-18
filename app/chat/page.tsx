"use client";

import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

export default function ChatPage() {
  // -----------------------------
  // Form State
  // -----------------------------
  const [step, setStep] = useState(0);

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
  // What If Simulator
  // -----------------------------
  const [incomeBoost, setIncomeBoost] = useState(0);
  const [expenseCut, setExpenseCut] = useState(0);

  // -----------------------------
  // PDF
  // -----------------------------
  const reportRef = useRef<HTMLDivElement>(null);
  const [scamText, setScamText] = useState("");

const [scamResult, setScamResult] = useState("");

const [loadingScam, setLoadingScam] = useState(false);

  // -----------------------------
  // Calculations
  // -----------------------------
  const monthlySavings =
    Number(income || 0) - Number(expense || 0);

  const savingsRate =
    income
      ? Math.round(
          (monthlySavings / Number(income)) * 100
        )
      : 0;

  const healthScore = Math.min(
    100,
    Math.max(
      40,
      60 + savingsRate / 2
    )
  );
  const badge =
  healthScore >= 90
    ? "🏆 Future Millionaire"
    : healthScore >= 80
    ? "🥇 Wealth Builder"
    : healthScore >= 70
    ? "🥈 Smart Saver"
    : healthScore >= 60
    ? "🥉 Budget Learner"
    : "🌱 Beginner Saver";

  // -----------------------------
  // What If Calculations
  // -----------------------------
  const simulatedIncome =
    Number(income || 0) + incomeBoost;

  const simulatedExpense =
    Math.max(
      0,
      Number(expense || 0) - expenseCut
    );

  const simulatedSavings =
    simulatedIncome - simulatedExpense;

  const simulatedSavingsRate =
    simulatedIncome
      ? Math.round(
          (simulatedSavings / simulatedIncome) * 100
        )
      : 0;

  const simulatedHealthScore = Math.min(
    100,
    Math.max(
      40,
      60 + simulatedSavingsRate / 2
    )
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
        "Sorry! AI couldn't generate advice."
      );
    }

    setLoadingAI(false);
  }

  // -----------------------------
  // Continue Button
  // -----------------------------
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
  }

  // -----------------------------
  // Ask Sakhi
  // -----------------------------
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

  async function detectScam() {
  if (!scamText.trim()) return;

  setLoadingScam(true);

  const res = await fetch("/api/scam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: scamText,
    }),
  });

  const data = await res.json();

  setScamResult(data.answer);

  setLoadingScam(false);
}

  // -----------------------------
  // Download PDF
  // -----------------------------
  const downloadPDF = () => {
    if (!reportRef.current) return;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `SakhiSense_Report_${name}.pdf`,
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 2,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(reportRef.current)
      .save();
  };
      return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-10">

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

        {/* Conversation */}

        <div className="mt-8 text-lg">

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
              How much do you spend every month?
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

          {step >= 5 && (

            <div
              ref={reportRef}
              className="mt-8 space-y-6"
            >
                              {/* Report Title */}

              <div className="text-center">

                <h2 className="text-5xl font-extrabold text-purple-700">
                  🌸 Your Financial Twin
                </h2>

                <p className="mt-3 text-gray-600">
                  Personalized AI Financial Report for <b>{name}</b>
                </p>

              </div>

              {/* Health Score */}

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

              <div className="rounded-2xl bg-yellow-100 p-6 text-center shadow">

  <h3 className="text-xl font-bold">
    🏅 Your Financial Badge
  </h3>

  <p className="mt-4 text-3xl font-bold">
    {badge}
  </p>

</div>

              {/* Financial Cards */}

              <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-xl bg-white p-6 shadow">

                  <h3 className="font-bold">
                    💰 Monthly Savings
                  </h3>

                  <p className="mt-3 text-3xl font-bold text-green-600">
                    ₹{monthlySavings.toLocaleString()}
                  </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                  <h3 className="font-bold">
                    📈 Savings Rate
                  </h3>

                  <p className="mt-3 text-3xl font-bold text-purple-700">
                    {savingsRate}%
                  </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                  <h3 className="font-bold">
                    🎯 Financial Goal
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
                    {Math.ceil(Number(expense) * 3).toLocaleString()} Recommended
                  </p>

                </div>

              </div>

              {/* AI Report */}

              <div className="rounded-2xl bg-purple-100 p-6">

                <h2 className="text-2xl font-bold text-purple-700">
                  🤖 Sakhi AI Report
                </h2>

                <div className="mt-6">

                  {loadingAI ? (

                    <p className="animate-pulse font-semibold text-purple-700">
                      🤖 Sakhi is preparing your personalized financial report...
                    </p>

                  ) : (

                    <>
                      <div className="whitespace-pre-wrap rounded-xl bg-white p-5 shadow">
                        {aiAdvice}
                      </div>

                      <button
                        onClick={downloadPDF}
                        className="mt-6 w-full rounded-xl bg-green-600 py-4 font-bold text-white hover:bg-green-700"
                      >
                        📄 Download Financial Report
                      </button>
                    </>

                  )}

                </div>

              </div>
                            {/* ========================= */}
              {/* What If Simulator */}
              {/* ========================= */}

              <div className="rounded-2xl border bg-white p-6 shadow-lg">

                <h2 className="text-2xl font-bold text-purple-700">
                  💡 What If Simulator
                </h2>

                <p className="mt-2 text-gray-500">
                  See how changing your income and expenses can improve your financial future.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">

                  <div>

                    <label className="font-semibold">
                      💵 Increase Monthly Income
                    </label>

                    <input
                      type="range"
                      min={0}
                      max={50000}
                      step={1000}
                      value={incomeBoost}
                      onChange={(e) =>
                        setIncomeBoost(Number(e.target.value))
                      }
                      className="mt-3 w-full accent-purple-600"
                    />

                    <p className="mt-2 text-center font-bold text-purple-700">
                      +₹{incomeBoost.toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <label className="font-semibold">
                      💸 Reduce Monthly Expenses
                    </label>

                    <input
                      type="range"
                      min={0}
                      max={30000}
                      step={500}
                      value={expenseCut}
                      onChange={(e) =>
                        setExpenseCut(Number(e.target.value))
                      }
                      className="mt-3 w-full accent-pink-600"
                    />

                    <p className="mt-2 text-center font-bold text-pink-600">
                      -₹{expenseCut.toLocaleString()}
                    </p>

                  </div>

                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">

                  <div className="rounded-xl bg-green-50 p-5">

                    <h3 className="font-bold">
                      💰 New Monthly Savings
                    </h3>

                    <p className="mt-3 text-3xl font-bold text-green-600">
                      ₹{simulatedSavings.toLocaleString()}
                    </p>

                  </div>

                  <div className="rounded-xl bg-purple-50 p-5">

                    <h3 className="font-bold">
                      ⭐ New Health Score
                    </h3>

                    <p className="mt-3 text-3xl font-bold text-purple-700">
                      {simulatedHealthScore}/100
                    </p>

                  </div>

                  <div className="rounded-xl bg-blue-50 p-5">

                    <h3 className="font-bold">
                      📈 Savings Rate
                    </h3>

                    <p className="mt-3 text-3xl font-bold text-blue-600">
                      {simulatedSavingsRate}%
                    </p>

                  </div>

                  <div className="rounded-xl bg-pink-50 p-5">

                    <h3 className="font-bold">
                      🚀 Improvement
                    </h3>

                    <p className="mt-3 text-3xl font-bold text-pink-600">
                      +{simulatedHealthScore - healthScore}
                    </p>

                  </div>

                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">

                  <h3 className="text-xl font-bold">
                    🌸 Sakhi's Prediction
                  </h3>

                  <p className="mt-3">
                    If you increase your income by{" "}
                    <b>₹{incomeBoost.toLocaleString()}</b> and reduce your expenses by{" "}
                    <b>₹{expenseCut.toLocaleString()}</b>, your Financial Health Score
                    can improve from <b>{healthScore}</b> to{" "}
                    <b>{simulatedHealthScore}</b>.
                  </p>

                </div>

              </div>

              {/* ========================= */}
              {/* Ask Sakhi */}
              {/* ========================= */}

              <div className="rounded-2xl border bg-white p-6 shadow-lg">

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
              <div className="rounded-2xl border bg-white p-6 shadow-lg mt-8">

  <h2 className="text-2xl font-bold text-red-600">
    🚨 AI Scam Detector
  </h2>

  <p className="mt-2 text-gray-500">
    Paste any suspicious SMS, WhatsApp message, email or website text.
  </p>

  <textarea
    rows={6}
    value={scamText}
    onChange={(e)=>setScamText(e.target.value)}
    className="mt-5 w-full rounded-xl border p-4"
    placeholder="Paste suspicious message here..."
  />

  <button
    onClick={detectScam}
    className="mt-5 w-full rounded-xl bg-red-600 py-4 font-bold text-white hover:bg-red-700"
  >
    Analyze Scam
  </button>

  {(loadingScam || scamResult) && (

    <div className="mt-6 rounded-xl bg-red-50 p-5">

      <h3 className="font-bold text-red-600">
        🛡 Sakhi Security Report
      </h3>

      <p className="mt-3 whitespace-pre-wrap">
        {loadingScam
          ? "Analyzing..."
          : scamResult}
      </p>

    </div>

  )}

</div>
                          </div>
          )}

        </div>

        {/* Input Section */}

        {step < 5 && (

          <div className="mt-8">

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
                  ? "Enter your age..."
                  : step === 2
                  ? "Enter monthly income..."
                  : step === 3
                  ? "Enter monthly expenses..."
                  : "Enter your financial goal..."
              }
              className="w-full rounded-xl border p-4"
            />

            <button
              onClick={handleContinue}
              className="mt-6 w-full rounded-xl bg-purple-600 py-4 font-bold text-white transition hover:bg-purple-700"
            >
              Continue →
            </button>

          </div>

        )}

        {/* Footer */}

        <div className="mt-10 text-center">

          <p className="text-sm text-gray-500">
            Generated by 🌸 SakhiSense AI
          </p>

        </div>

      </div>

    </main>
  );
}