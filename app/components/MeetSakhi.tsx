import Link from "next/link";

export default function MeetSakhi() {
  return (
    <section className="mx-auto mt-28 max-w-5xl rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 p-12 text-center text-white shadow-2xl">

      <h2 className="text-5xl font-bold">
        🌸 Meet Sakhi
      </h2>

      <p className="mt-4 text-xl text-white/90">
        Your AI Financial Twin
      </p>

      <p className="mt-2 text-white/80">
        Answer 3 quick questions to generate your personalized financial analysis.
      </p>

      <div className="mt-10 space-y-6">

        {/* Income */}
        <div>
          <label className="mb-2 block font-semibold text-white">
            💰 Monthly Income
          </label>

          <input
            type="number"
            placeholder="e.g. ₹50,000"
            disabled
            className="w-full rounded-xl bg-white/20 p-4 text-white placeholder-white/70 outline-none backdrop-blur"
          />
        </div>

        {/* Rent */}
        <div>
          <label className="mb-2 block font-semibold text-white">
            🏠 Do you pay rent?
          </label>

          <div className="flex justify-center gap-4">

            <button
              disabled
              className="rounded-xl bg-white/20 px-6 py-3 text-white"
            >
              Yes
            </button>

            <button
              disabled
              className="rounded-xl bg-white/20 px-6 py-3 text-white"
            >
              No
            </button>

          </div>
        </div>

        {/* Goal */}
        <div>
          <label className="mb-2 block font-semibold text-white">
            🎯 Biggest Financial Goal
          </label>

          <select
            disabled
            className="w-full rounded-xl bg-white/20 p-4 text-white outline-none backdrop-blur"
          >
            <option className="text-black">Buy a Car</option>
            <option className="text-black">Buy a House</option>
            <option className="text-black">Save Money</option>
            <option className="text-black">Higher Studies</option>
            <option className="text-black">Start a Business</option>
          </select>
        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">

        <Link
          href="/chat"
          className="rounded-full bg-white px-10 py-4 text-lg font-bold text-purple-700 transition hover:scale-105"
        >
          🚀 Generate My AI Report
        </Link>


      </div>

      <p className="mt-6 text-sm text-white/80">
        ✨ Takes less than 2 minutes • 100% Free • AI Powered
      </p>

    </section>
  );
}