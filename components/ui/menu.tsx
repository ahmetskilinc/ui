"use client";

import type { HTMLAttributes } from "react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MenuIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const lineVariants: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  animate: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

const MenuIcon = ({
  className,
  size = 28,
  isOpen,
  ...props
}: MenuIconProps & { isOpen: boolean }) => {
  return (
    <div className={cn(className)} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          variants={lineVariants}
          animate={isOpen ? "animate" : "normal"}
          custom={1}
        />
        <motion.line
          x1="4"
          y1="12"
          x2="20"
          y2="12"
          variants={lineVariants}
          animate={isOpen ? "animate" : "normal"}
          custom={2}
        />
        <motion.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={lineVariants}
          animate={isOpen ? "animate" : "normal"}
          custom={3}
        />
      </svg>
    </div>
  );
};

export { MenuIcon };
