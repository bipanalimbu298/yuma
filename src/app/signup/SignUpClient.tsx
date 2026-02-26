"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/AuthShell";

export default function SignUpClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
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
    if (password !== confirm) {
      setMessage({ type: "error", text: "Passwords do not match." });
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
      const { error } = await supabaseBrowser.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/signin`
              : undefined,
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
        return;
      }

      setMessage({
        type: "success",
        text: "Account created. Check your email to confirm, then sign in.",
      });

      setTimeout(() => router.push("/signin"), 1500);
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell subtitle="Create your Yuma account and curate your forever wardrobe.">
      <form onSubmit={onSubmit} className="px-8 pb-7 space-y-4">
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
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 px-3 py-2.5 pr-10 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              placeholder="At least 6 characters"
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

        <div className="space-y-1.5">
          <label className="block text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            Confirm password
          </label>
          <input
            type={showPass ? "text" : "password"}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl border border-stone-200 bg-stone-50/80 px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            placeholder="Repeat password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-900 px-4 py-2.5 text-sm font-medium text-amber-50 shadow-[0_16px_40px_rgba(6,57,38,0.5)] transition hover:bg-emerald-950 hover:shadow-[0_20px_55px_rgba(6,57,38,0.6)] disabled:cursor-not-allowed disabled:bg-emerald-800/80 disabled:shadow-none"
        >
          {loading ? "Creating your account…" : "Create account"}
        </button>

        <p className="pt-2 text-center text-xs text-stone-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-emerald-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

