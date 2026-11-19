"use client";

import { motion } from "framer-motion";

const tags = { div: motion.div, ul: motion.ul, p: motion.p };

/**
 * Laat een blok zacht omhoog komen als het in beeld scrolt.
 * Begint nooit volledig onzichtbaar, zodat de inhoud leesbaar blijft als JavaScript traag is.
 */
export function Reveal({
  as = "div",
  className,
  delay = 0,
  children,
}: {
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0.4, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}
