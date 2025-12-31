import { defineConfig } from "@pandacss/dev";
import { button } from "./panda-config/recipes/button";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations (Nuxt3のディレクトリ構造に対応)
  include: [
    "./components/**/*.{js,jsx,ts,tsx,vue}",
    "./pages/**/*.{js,jsx,ts,tsx,vue}",
    "./app.vue"
  ],

  // Files to exclude
  exclude: [],

  // Theme conditions for dark mode support
  conditions: {
    light: "[data-theme=light] &",
    dark: "[data-theme=dark] &",
  },

  // Recipes for component variants
  theme: {
    extend: {
      recipes: {
        button,
      },
      tokens: {
        colors: {
          gray: {
            50: { value: "#f9fafb" },
            100: { value: "#f3f4f6" },
            200: { value: "#e5e7eb" },
            300: { value: "#d1d5db" },
            400: { value: "#9ca3af" },
            500: { value: "#6b7280" },
            600: { value: "#4b5563" },
            700: { value: "#374151" },
            800: { value: "#1f2937" },
            900: { value: "#111827" },
          },
          blue: {
            50: { value: "#eff6ff" },
            100: { value: "#dbeafe" },
            200: { value: "#bfdbfe" },
            300: { value: "#93c5fd" },
            400: { value: "#60a5fa" },
            500: { value: "#3b82f6" },
            600: { value: "#2563eb" },
            700: { value: "#1d4ed8" },
            800: { value: "#1e40af" },
            900: { value: "#1e3a8a" },
          },
          red: {
            50: { value: "#fef2f2" },
            100: { value: "#fee2e2" },
            200: { value: "#fecaca" },
            300: { value: "#fca5a5" },
            400: { value: "#f87171" },
            500: { value: "#ef4444" },
            600: { value: "#dc2626" },
            700: { value: "#b91c1c" },
            800: { value: "#991b1b" },
            900: { value: "#7f1d1d" },
          },
          yellow: {
            400: { value: "#facc15" },
          },
        },
        fontSizes: {
          xs: { value: "0.75rem" },
          sm: { value: "0.875rem" },
          base: { value: "1rem" },
          lg: { value: "1.125rem" },
          xl: { value: "1.25rem" },
        },
        radii: {
          sm: { value: "0.125rem" },
          md: { value: "0.375rem" },
          lg: { value: "0.5rem" },
        },
      },
      semanticTokens: {
        colors: {
          contents: {
            primary: {
              value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
            },
            secondary: {
              value: { base: "{colors.gray.600}", _dark: "{colors.gray.400}" },
            },
            link: {
              value: { base: "{colors.blue.600}", _dark: "{colors.blue.400}" },
            },
          },
          bg: {
            primary: {
              value: { base: "white", _dark: "{colors.gray.900}" },
            },
            secondary: {
              value: { base: "{colors.gray.50}", _dark: "{colors.gray.800}" },
            },
            tertiary: {
              value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
            },
          },
          border: {
            default: {
              value: { base: "{colors.gray.200}", _dark: "{colors.gray.700}" },
            },
            focus: {
              value: { base: "{colors.blue.500}", _dark: "{colors.blue.400}" },
            },
          },
          input: {
            bg: {
              value: { base: "white", _dark: "{colors.gray.800}" },
            },
            text: {
              value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" },
            },
            border: {
              value: { base: "{colors.gray.300}", _dark: "{colors.gray.600}" },
            },
            borderError: {
              value: { base: "{colors.red.500}", _dark: "{colors.red.400}" },
            },
            placeholder: {
              value: { base: "{colors.gray.400}", _dark: "{colors.gray.500}" },
            },
            bgDisabled: {
              value: { base: "{colors.gray.100}", _dark: "{colors.gray.700}" },
            },
            textDisabled: {
              value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
