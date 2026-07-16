export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">s

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold text-purple-700">
          🌸 SakhiSense AI
        </h1>

        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h2 className="text-6xl font-extrabold text-gray-900 leading-tight">
          Your AI Financial Twin
        </h2>

        <p className="text-xl text-gray-600 mt-6 max-w-2xl">
          Helping first-time earners build confidence with money through
          personalized AI guidance, budgeting and smart financial planning.
        </p>

        <div className="mt-10 flex gap-5">

          <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition">
            Get Started
          </button>

          <button className="border border-purple-600 text-purple-700 px-8 py-4 rounded-full text-lg hover:bg-purple-100 transition">
            Watch Demo
          </button>

        </div>

      </section>

    </main>
  );
}
