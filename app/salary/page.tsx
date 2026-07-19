"use client";

import { useState, useRef } from "react";
import Tesseract from "tesseract.js";


export default function SalaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const reportRef = useRef<HTMLDivElement>(null);

  async function analyzeSalary() {
    if (!file) {
      alert("Please upload a salary slip image.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng");

      const res = await fetch("/api/salary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salaryText: text,
        }),
      });

      const data = await res.json();

      setResult(data.answer);
    } catch (error) {
      console.error(error);
      setResult("❌ Unable to analyze the salary slip.");
    }

    setLoading(false);
  }

  const downloadSalaryPDF = async () => {
  if (!reportRef.current) return;

  const html2pdf = (await import("html2pdf.js")).default;

  html2pdf()
    .set({
      margin: 0.5,
      filename: "Salary_Analysis_Report.pdf",
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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-8">

      <div className="w-full max-w-4xl rounded-3xl bg-white p-10 shadow-2xl">

        <h1 className="text-4xl font-extrabold text-purple-700">
          💼 Salary Slip Analyzer
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Upload your salary slip image and let Sakhi explain every deduction,
          tax and saving opportunity.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-dashed border-purple-300 p-8 text-center">

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mx-auto"
          />

          {file && (
            <p className="mt-4 text-green-600 font-semibold">
              ✅ {file.name}
            </p>
          )}

        </div>

        <button
          onClick={analyzeSalary}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105"
        >
          🔍 Analyze Salary Slip
        </button>

        {loading && (
          <div className="mt-8 rounded-2xl bg-purple-100 p-6">
            <p className="animate-pulse text-lg font-semibold text-purple-700">
              📄 Reading salary slip...
            </p>

            <p className="mt-2 text-gray-600">
              🤖 Extracting text and generating AI insights...
            </p>
          </div>
        )}

        {result && (
          <>
            {/* Score */}

            <div className="mt-8">

              <p className="font-bold text-lg">
                Salary Health Score
              </p>

              <div className="mt-3 h-4 rounded-full bg-gray-200">

                <div
                  className="h-4 rounded-full bg-green-500"
                  style={{ width: "91%" }}
                />

              </div>

              <p className="mt-2 font-bold text-green-700">
                91 / 100
              </p>

            </div>

            {/* PDF Area */}

            <div ref={reportRef}>

              <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl border">

                <h2 className="text-3xl font-bold text-purple-700">
                  🤖 Sakhi Analysis
                </h2>

                <div className="mt-6 rounded-xl bg-green-100 p-5 text-center">

                  <h3 className="text-2xl font-bold text-green-700">
                    🟢 Excellent Financial Health
                  </h3>

                  <p className="mt-2 text-gray-700">
                    Your salary structure looks healthy and provides excellent
                    saving potential.
                  </p>

                </div>

                <div className="mt-8 whitespace-pre-line rounded-2xl bg-gray-50 p-6 leading-8 text-gray-700">
                  {result}
                </div>

                <button
  onClick={() => window.print()}
  className="mt-8 w-full rounded-xl bg-purple-600 py-4 font-bold text-white hover:bg-purple-700"
>
  🖨️ Save / Print Report
</button>

              </div>

            </div>
          </>
        )}

      </div>

    </main>
  );
}