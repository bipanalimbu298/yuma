"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

export default function SizeGuideDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="text-sm text-black/60 underline underline-offset-4 hover:text-black"
        >
          Size guide
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4 mb-4">
            <Dialog.Title className="text-xl font-bold">
              Size Guide
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="p-2 rounded-full hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-6 text-sm text-black/70">
            <section>
              <h3 className="font-semibold text-black mb-2">Women</h3>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left">
                  <thead className="bg-[#F0F0F0]">
                    <tr>
                      <th className="p-3">Size</th>
                      <th className="p-3">Bust (in)</th>
                      <th className="p-3">Waist (in)</th>
                      <th className="p-3">Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["XS", "31-33", "24-26", "33-35"],
                      ["S", "33-35", "26-28", "35-37"],
                      ["M", "35-37", "28-30", "37-39"],
                      ["L", "37-40", "30-33", "39-42"],
                      ["XL", "40-43", "33-36", "42-45"],
                    ].map(([s, b, w, h]) => (
                      <tr key={s} className="border-t border-black/10">
                        <td className="p-3 font-medium text-black">{s}</td>
                        <td className="p-3">{b}</td>
                        <td className="p-3">{w}</td>
                        <td className="p-3">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h3 className="font-semibold text-black mb-2">Kids</h3>
              <div className="overflow-x-auto rounded-xl border border-black/10">
                <table className="w-full text-left">
                  <thead className="bg-[#F0F0F0]">
                    <tr>
                      <th className="p-3">Age</th>
                      <th className="p-3">Height (cm)</th>
                      <th className="p-3">Chest (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1-2Y", "80-92", "49-53"],
                      ["3-4Y", "93-104", "53-56"],
                      ["5-6Y", "105-116", "56-60"],
                      ["7-8Y", "117-128", "60-64"],
                      ["9-10Y", "129-140", "64-68"],
                    ].map(([a, h, c]) => (
                      <tr key={a} className="border-t border-black/10">
                        <td className="p-3 font-medium text-black">{a}</td>
                        <td className="p-3">{h}</td>
                        <td className="p-3">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

