"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function AuthShell({
  children,
  subtitle,
}: {
  children: ReactNode;
  subtitle: string;
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(51,79,64,0.15),_transparent_55%),_linear-gradient(to_bottom,_#f6efe6,_#f2e3d1)]">
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white/85 shadow-[0_24px_70px_rgba(24,30,21,0.18)] backdrop-blur-xl border border-emerald-50/80">
          <div className="px-8 pt-7 pb-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-emerald-900 text-amber-50 px-5 py-1.5 text-xs tracking-[0.25em] uppercase"
            >
              Yuma
            </Link>
            <p className="mt-3 text-sm text-stone-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

