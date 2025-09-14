"use client";

import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect } from "react";

// Square positions
const squares = [
  { id: 0, axis: "x" }, // 1: top-left
  { id: 1, axis: "y" }, // 2: top-right
  { id: 2, axis: "y" }, // 3: bottom-right
  { id: 3, axis: "x" }, // 4: bottom-left
];

// Custom order: 1 → 2 → 4 → 3
const order = [0, 1, 3, 2];

const Loading = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        for (let idx = 0; idx < order.length; idx++) {
          const i = order[idx];
          await controls.start((index) => {
            if (index === i) {
              // Active square (stretch based on axis)
              return squares[i].axis === "x"
                ? { scaleX: 1.6, scaleY: 1, opacity: 1 }
                : { scaleY: 1.6, scaleX: 1, opacity: 1 };
            }
            // Inactive squares
            return { scaleX: 1, scaleY: 1, opacity: 0.4 };
          });
        }
      }
    };
    sequence();
  }, [controls]);

  return (
    <div className="flex items-center justify-center min-h-screen backdrop-blur-md absolute inset-0 z-50 bg-transparent">
      <div className="grid grid-cols-2 gap-2">
        {squares.map((sq, i) => (
          <motion.div
            key={sq.id}
            className="w-8 h-8 rounded-md bg-white/90"
            custom={i}
            animate={controls}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
