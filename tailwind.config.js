/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "rgba(2, 0, 19)",
        primary2: "rgba(2, 0, 19, 0.8)",
        primarytab: "rgba(2, 0, 19, 0.8)",

        accent: "rgba(168, 181, 219, 1)",
        secondary: "rgba(21, 19, 33, 1)",
        blueviolet: "blueviolet",
        subMain: "rgba(242, 0, 0, 1)",
        subMain2: "rgba(242, 0, 0, 0.5)",
        dry: "rgba(11, 15, 41, 1)",
        star: "rgba(255, 176, 0, 1)",
        text: "rgba(192, 192, 192, 1)",
        textt: "rgba(192, 192, 192, 0.3)",
        border: "rgba(75, 85, 99, 1)",
        dryGray: "rgba(224, 213, 213, 1)",
        drkb: "rgba(27, 30, 50, 0.8)",
        drkb2: "rgba(27, 30, 50, 1)",
        // primary: "rgb(241, 236, 236)",
        // primary2: "rgba(255,255,255,0.6)",
        trans: "rgba(30, 26, 26, 0.6)",
        transb: "rgba(30, 26, 26, 0.8)",
        trans2: "rgb(0,0,0,0.5)",
        trans2: "rgb(0,0,0,0.6)",
        btn: "rgba(229,231,235,0.6)",

        light: {
          100: "#D6C6FF",
          200: "#A8B5DB",
          250: "#D6C6FF",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221f3d",
          200: "#0f0d23",
        },

        placeholder: "#ab8bff",
      },
      lineHeight: {
        tight: "16px",
        normal: "20px",
        relaxed: "24px",
        loose: "28px",
      },
      boxShadow: {
        web: "0 0 5px rgba(255, 255, 255, 1)", // Approx. blue-100
        custom: "0px 0px 6px 70px rgba(255, 255, 255, 1)", // Approx. blue-100
        back: "0px 0px 6px 70px rgba(0,0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
