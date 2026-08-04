const BRAND_COLORS = {
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  primaryLight: "#60A5FA",
  primarySoft: "#EFF6FF",
  primaryForeground: "#FFFFFF",

  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0284C7",

  radius: 12,
};

export const LIGHT_COLORS = {
  /* brand colors (shared between Light & Dark) */
  ...BRAND_COLORS,

  // Light Theme
  background: "#FCFCFD",
  foreground: "#111827",

  card: "#FFFFFF",
  cardForeground: "#111827",

  popover: "#FFFFFF",
  popoverForeground: "#111827",

  secondary: "#F3F4F6",
  secondaryForeground: "#111827",

  muted: "#F8FAFC",
  mutedForeground: "#6B7280",

  accent: "#EFF6FF",
  accentForeground: "#2563EB",

  destructive: "#DC2626",
  destructiveForeground: "#FFFFFF",

  border: "#E5E7EB",
  input: "#FFFFFF",
  ring: "#60A5FA",
};

export const DARK_COLORS = {
  /* Brand colors (shared between Light & Dark) */
  ...BRAND_COLORS,

  // Dark Theme
  background: "#0F172A",
  foreground: "#F8FAFC",

  card: "#111827",
  cardForeground: "#F8FAFC",

  popover: "#111827",
  popoverForeground: "#F8FAFC",

  secondary: "#1F2937",
  secondaryForeground: "#F8FAFC",

  muted: "#172033",
  mutedForeground: "#94A3B8",

  accent: "#EFF6FF",
  accentForeground: "#2563EB",

  destructive: "#DC2626",
  destructiveForeground: "#FFFFFF",

  border: "#273449",
  input: "#1F2937",
  ring: "#60A5FA",
};

export const COLORS = LIGHT_COLORS;
