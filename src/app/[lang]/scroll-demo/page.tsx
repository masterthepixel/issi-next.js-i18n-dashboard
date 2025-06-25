"use client";

import { useState, useEffect } from "react";
import ScrollTextMarquee from "@/components/ui/scroll-text-marquee";

export default function ScrollDemoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-6">Scrolling Text Demo</h1>
          <p className="text-lg mb-8">This page demonstrates the ScrollTextMarquee component used for the government clients section.</p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Basic Example</h2>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900">
              <ScrollTextMarquee baseVelocity={3} delay={0}>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">Item One</span>
                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200">Item Two</span>
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">Item Three</span>
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">Item Four</span>
              </ScrollTextMarquee>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Opposite Direction</h2>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900">
              <ScrollTextMarquee baseVelocity={-3} delay={0}>
                <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">Item One</span>
                <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200">Item Two</span>
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">Item Three</span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">Item Four</span>
              </ScrollTextMarquee>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Delayed Start</h2>
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900">
              <ScrollTextMarquee baseVelocity={2} delay={1000}>
                <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200">Item One</span>
                <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200">Item Two</span>
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200">Item Three</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200">Item Four</span>
              </ScrollTextMarquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
