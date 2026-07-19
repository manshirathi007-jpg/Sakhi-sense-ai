"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="text-center text-3xl font-bold text-purple-700">
          🌸 Login to Sakhi
        </h1>

        <input
          placeholder="Email"
          className="mt-8 w-full rounded-xl border p-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-5 w-full rounded-xl border p-4"
        />

        <Link
          href="/chat"
          className="mt-8 block rounded-xl bg-purple-600 py-4 text-center font-bold text-white hover:bg-purple-700"
        >
          Login →
        </Link>

      </div>

    </main>
  );
}