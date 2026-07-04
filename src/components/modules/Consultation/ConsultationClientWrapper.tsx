"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ConsultationClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-8 relative z-10"
    >
      {children}
    </motion.div>
  );
}
