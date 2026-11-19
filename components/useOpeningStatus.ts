"use client";

import { useEffect, useState } from "react";
import { getOpeningStatus, type OpeningStatus } from "@/lib/opening";

/** Status wordt pas in de browser berekend (Amsterdamse tijd), en elke minuut ververst. */
export function useOpeningStatus(): OpeningStatus | null {
  const [status, setStatus] = useState<OpeningStatus | null>(null);
  useEffect(() => {
    const tick = () => {
      try {
        setStatus(getOpeningStatus());
      } catch {
        setStatus(null);
      }
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
