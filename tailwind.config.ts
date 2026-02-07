import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#e6eeff",
          500: "#4f46e5",
          600: "#4338ca",
          700: "#3730a3"
        }
      }
    }
  },
  plugins: []
};

export default config;
