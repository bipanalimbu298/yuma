"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Sign In | Yuma Clothing",
  description:
    "Sign in to your Yuma account to manage orders, wishlist, and personalized looks.",
};

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  function validate() {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return false;
    }
    if (!password || password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return false;
    }
    return true;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
        return;
      }
      setMessage({ type: "success", text: "Signed in successfully. Redirecting…" });
      router.push(redirectTo);
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setMessage(null);
    setOauthLoading(true);
    try {
      const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}${redirectTo}`
              : undefined,
        },
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
        setOauthLoading(false);
      }
    } catch {
      setMessage({ type: "error", text: "Unable to start Google sign-in." });
      setOauthLoading(false);
    }
  }

  return (
    <AuthShell subtitle="Welcome back. Your curated looks are waiting.">
      <form onSubmit={onSubmit} className="px-8 pb-6 space-y-4">
        {message && (
          <div
            className={`rounded-2xl px-3 py-2 text-xs ${
              message.type === "error"
                ? "border border-rose-100 bg-rose-50/90 text-rose-700"
                : "border border-emerald-100 bg-emerald-50/80 text-emerald-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-emerald-800 hover:text-emerald-900 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 px-3 py-2.5 pr-10 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center rounded-full px-2 text-xs text-stone-500 hover:text-stone-800"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-900 px-4 py-2.5 text-sm font-medium text-amber-50 shadow-[0_16px_40px_rgba(6,57,38,0.5)] transition hover:bg-emerald-950 hover:shadow-[0_20px_55px_rgba(6,57,38,0.6)] disabled:cursor-not-allowed disabled:bg-emerald-800/80 disabled:shadow-none"
        >
          {loading ? "Signing you in…" : "Sign in"}
        </button>

        <div className="flex items-center gap-3 pt-2">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-stone-400">
            or
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={oauthLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:border-stone-300 hover:bg-stone-50 disabled:cursor-not-allowed"
        >
          {oauthLoading ? "Redirecting…" : "Continue with Google"}
        </button>
      </form>

      <div className="px-8 pb-7 text-center text-xs text-stone-500">
        <span>New to Yuma? </span>
        <Link
          href="/signup"
          className="font-medium text-emerald-900 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </AuthShell>
  );
}

