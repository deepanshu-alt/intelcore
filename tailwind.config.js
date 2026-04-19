/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#030711",
        ink: "#0a1020",
        panel: "rgba(15, 23, 42, 0.65)",
        electric: "#67e8f9",
        aura: "#8b5cf6",
        signal: "#38bdf8",
        neon: "#7c3aed",
      },
      boxShadow: {
        glow: "0 0 30px rgba(56, 189, 248, 0.28)",
        violet: "0 0 40px rgba(139, 92, 246, 0.24)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(103, 232, 249, 0.16), transparent 30%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.16), transparent 32%), linear-gradient(180deg, #020617 0%, #050816 35%, #020617 100%)",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.08)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
