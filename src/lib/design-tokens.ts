export const designTokens = {
  colors: {
    canvas: "#060913",
    panel: "#0b1020",
    panelAlt: "#10182b",
    border: "rgba(148, 163, 184, 0.22)",
    textPrimary: "#f8fafc",
    textSecondary: "#b6c2dd",
    accent: "#6ea8ff",
    accentStrong: "#4f7cff",
    success: "#34d399",
    glow: "rgba(79, 124, 255, 0.28)",
  },
  radius: {
    sm: "10px",
    md: "14px",
    lg: "20px",
    xl: "28px",
  },
  spacing: {
    sectionY: "5rem",
    panelPadding: "1.5rem",
  },
  shadow: {
    card: "0 20px 60px rgba(6, 9, 19, 0.45)",
    glow: "0 0 0 1px rgba(110, 168, 255, 0.24), 0 10px 40px rgba(79, 124, 255, 0.25)",
  },
  motion: {
    durationFast: "180ms",
    durationBase: "260ms",
    easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  },
} as const;

export type Segment = "franchise" | "memberhub" | "enterprise";
