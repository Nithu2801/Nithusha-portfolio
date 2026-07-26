"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border border-outline-variant/30 soft-shadow p-8 space-y-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
          <p className="text-on-surface-variant text-sm mt-1">Sign in to manage your portfolio content.</p>
        </div>
        {error && (
          <div className="bg-error/10 text-error text-sm rounded-lg px-4 py-2">{error}</div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-outline-variant/50 px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-outline-variant/50 px-4 py-2 focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-vibrant-gradient text-white font-bold rounded-full py-3 hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
