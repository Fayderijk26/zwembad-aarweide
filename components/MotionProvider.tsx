"use client";

import { MotionConfig } from "framer-motion";

/** Respecteert prefers-reduced-motion voor alle Framer Motion-animaties. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
