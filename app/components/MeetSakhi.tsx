export default function MeetSakhi() {
  return (
    <section className="mx-auto mt-28 max-w-5xl rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 p-12 text-center text-white shadow-2xl">

      <h2 className="text-5xl font-bold">
        🌸 Meet Sakhi
      </h2>

      <p className="mt-6 text-xl leading-8">
        I'm your AI Financial Twin.
        <br />
        Let's understand your financial life in less than 2 minutes.
      </p>

      <div className="mt-10 space-y-4 text-left mx-auto max-w-md">

        <div className="rounded-xl bg-white/20 p-4">
          💰 What's your monthly income?
        </div>

        <div className="rounded-xl bg-white/20 p-4">
          🏠 Do you pay rent?
        </div>

        <div className="rounded-xl bg-white/20 p-4">
          🎯 What's your biggest financial goal?
        </div>

      </div>

      <button className="mt-10 rounded-full bg-white px-8 py-4 text-lg font-bold text-purple-700 transition hover:scale-105">
        Let's Start →
      </button>

    </section>
  );
}