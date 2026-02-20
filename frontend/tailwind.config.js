/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        status: {
          "not-sent": "#6B7280",
          sent: "#3B82F6",
          accepted: "#10B981",
          messaged: "#8B5CF6",
          referred: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
