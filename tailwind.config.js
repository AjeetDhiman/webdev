/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans'", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#00AAA1",
        secondary: "#666666",
        tertiary: "#C4C4C4",
        success: "#78C578",
        warning: "#F0B37E",
        danger: "#E06F6C",
        theme: "#212529",
        dark: "#222222",
        "light-grey": "#555555",
        blue: "#6AB0DE",
      },
    },
  },

  plugins: [
    function ({ addBase, addUtilities, theme }) {
      addBase({
        body: {
          color: theme("colors.light-grey"),
          height: "100%",
          fontFamily: theme("fontFamily.sans"),
        },
        h1: {
          fontSize: "1.688rem",
          lineHeight: 1.4,
          fontWeight: "600",
          color: theme("colors.dark"),
        },
        h2: {
          fontSize: "1.5rem",
          lineHeight: 1.4,
          fontWeight: "600",
          color: theme("colors.dark"),
        },
        h3: {
          fontSize: "1.313rem",
          lineHeight: 1.4,
          fontWeight: "600",
          color: theme("colors.dark"),
        },
        h4: {
          fontSize: "1.188rem",
          lineHeight: 1.5,
          fontWeight: "600",
          color: theme("colors.dark"),
        },
        h5: {
          fontSize: "1.063rem",
          lineHeight: 1.5,
          fontWeight: "500",
          color: theme("colors.dark"),
        },
        h6: {
          fontSize: "0.938rem",
          lineHeight: 1.5,
          fontWeight: "500",
          color: theme("colors.dark"),
        },
        p: {
          fontSize: "0.938rem",
          lineHeight: 1.5,
          fontWeight: "400",
        },
      });
      addUtilities({
        ".anchor-effect": {
          position: "relative",
          "&::after": {
            content: "''",
            position: "absolute",
            top: "0",
            left: "0",
            width: "0",
            height: "100%",
            zIndex: "-1",
            backgroundColor: theme("colors.primary"),
            transition: "width 0.3s ease, left 0.3s ease",
          },
          "&.active::after": {
            width: "50%",
          },
          "&:hover::after": {
            width: "50%",
            left: "0",
          },
        },

        ".active-class": {
          position: "relative",
          "&::after": {
            width: "50% !important",
          },
          "&:hover": {
            color: "#333 !important",
          },
        },
      });
    },
  ],
};
