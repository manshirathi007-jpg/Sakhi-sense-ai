"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function testAI() {
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Manshi",
          age: "21",
          income: "35000",
          expense: "20000",
          goal: "Higher Studies",
        }),
      });

      const data = await res.json();

      setResult(data.answer || data.error);
    } catch (err) {
      setResult("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <button
        onClick={testAI}
        className="rounded-xl bg-purple-600 px-8 py-4 text-white"
      >
        {loading ? "Thinking..." : "Test OpenAI"}
      </button>

      <div className="mt-8 w-full max-w-2xl rounded-xl border p-6 whitespace-pre-wrap">
        {result}
      </div>
    </main>
  );
}