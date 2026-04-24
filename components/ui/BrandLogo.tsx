"use client";

import React from "react";

interface GlassesIconProps {
  className?: string;
}

export function GlassesIcon({ className = "w-10 h-10" }: GlassesIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left lens — round cat-eye */}
      <ellipse cx="20" cy="33" rx="12" ry="11" stroke="currentColor" strokeWidth="2.8" fill="none"/>
      {/* Right lens — round cat-eye */}
      <ellipse cx="44" cy="33" rx="12" ry="11" stroke="currentColor" strokeWidth="2.8" fill="none"/>
      {/* Bridge */}
      <path d="M32 30 Q32 26 36 28" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M32 30 Q32 26 28 28" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* Left temple — gold accent */}
      <path d="M8 29 L2 25" stroke="#C8A46B" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Right temple — gold accent */}
      <path d="M56 29 L62 25" stroke="#C8A46B" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Cat-eye flicks */}
      <path d="M9 26 Q6 22 4 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M55 26 Q58 22 60 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function BrandLogo({ showText = true, size = "md" }: { showText?: boolean, size?: "sm" | "md" | "lg" }) {
  const iconSize = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-12 h-12" : "w-9 h-9";
  const titleSize = size === "sm" ? "text-[15px]" : size === "lg" ? "text-[20px]" : "text-[17px]";
  const subtitleSize = size === "sm" ? "text-[8px]" : size === "lg" ? "text-[10px]" : "text-[9px]";

  return (
    <div className="flex items-center gap-2.5">
      <GlassesIcon className={iconSize} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`${titleSize} font-bold tracking-tight text-[var(--text-primary)]`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            FlyNerd
          </span>
          <span
            className={`${subtitleSize} font-medium tracking-[0.22em] uppercase text-[var(--text-secondary)]`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            TECH
          </span>
        </div>
      )}
    </div>
  );
}
