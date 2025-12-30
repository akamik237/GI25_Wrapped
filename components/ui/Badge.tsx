"use client";

import React from "react";

interface BadgeProps {
  label: string;
  value: string | number;
  colorScheme?: "green" | "blue" | "red" | "orange" | "gray";
}

const colorClasses: Record<NonNullable<BadgeProps["colorScheme"]>, string> = {
  green: "bg-[#44cc11]",
  blue: "bg-[#007EC6]",
  red: "bg-[#E05D44]",
  orange: "bg-[#FE7D37]",
  gray: "bg-[#9F9F9F]",
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  value,
  colorScheme = "green",
}) => {
  return (
    <span
      className="
        inline-flex items-center
        overflow-hidden
        rounded
        border border-black/15
        text-[11px] font-semibold
        leading-none
      "
    >
      {/* Label */}
      <span
        className="bg-[#555555] text-white px-2.5 py-1"
        style={{ letterSpacing: "0.4px" }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        className={`${colorClasses[colorScheme]} text-white px-2.5 py-1`}
        style={{ letterSpacing: "0.4px" }}
      >
        {value}
      </span>
    </span>
  );
};

export const BadgeGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {children}
    </div>
  );
};
