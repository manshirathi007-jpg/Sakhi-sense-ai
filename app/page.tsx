
"use client";
import MeetSakhi from "./components/MeetSakhi";
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 md:px-16">
        <h1 className="text-3xl font-bold text-purple-700">
          🌸 SakhiSense AI
        </h1>

        <button className="rounded-full bg-purple-600 px-6 py-2 text-white transition hover:bg-purple-700">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto mt-16 flex max-w-6xl flex-col items-center px-6 text-center">
        <h1 className="text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
          Your AI Financial Twin
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-600">
          SakhiSense AI helps first-time earners make smarter financial
          decisions through personalized budgeting, salary analysis, scam
          detection and AI-powered financial guidance.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/chat">
  <button className="rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-purple-700">
    Get Started
  </button>
</Link>

          <button
  onClick={() =>
    document
      .getElementById("demo")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  className="rounded-full border border-purple-600 px-8 py-4 hover:bg-purple-50 transition"
>
  Watch Demo
</button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-4xl font-bold text-purple-700">10K+</h2>
            <p className="mt-2 text-gray-600">Future Users</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-700">₹12Cr+</h2>
            <p className="mt-2 text-gray-600">Financial Goals Planned</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-purple-700">95%</h2>
            <p className="mt-2 text-gray-600">AI Recommendation Accuracy</p>
          </div>
        </div>
      </section>

      {/* Features */}
      
        <section id="demo" className="py-24">
  <h2 className="text-5xl font-bold">
    Powerful AI Features
  </h2>

        <p className="mt-4 text-center text-lg text-gray-600">
          Everything a first-time earner needs to become financially confident.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="text-5xl">💰</div>

            <h3 className="mt-5 text-2xl font-bold">
              AI Financial Twin
            </h3>

            <p className="mt-4 text-gray-600">
              Get personalized financial insights based on your salary,
              expenses, goals and savings habits.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="text-5xl">📄</div>

            <h3 className="mt-5 text-2xl font-bold">
              Salary Slip Analyzer
            </h3>

            <p className="mt-4 text-gray-600">
              Upload your salary slip and instantly understand deductions,
              taxes and your actual take-home income.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="text-5xl">🛡️</div>

            <h3 className="mt-5 text-2xl font-bold">
              Scam Shield
            </h3>

            <p className="mt-4 text-gray-600">
              Detect fake investment schemes, phishing messages and suspicious
              financial links using AI.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="text-5xl">🎯</div>

            <h3 className="mt-5 text-2xl font-bold">
              Goal Planner
            </h3>

            <p className="mt-4 text-gray-600">
              Set your dream goals and receive an AI-powered roadmap to achieve
              them faster.
            </p>
          </div>
        </div>
      </section>
      <MeetSakhi />
    </main>

  );
}
