/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custm-white": "#FDFDFD",
        "custm-black": "#0F0D0C",
        "dark-blue": "#2b4552",
        "hover-blue": "#395F73",
        "light-brown": "#292524",
        "dark-brown": "#98787C",
        "light-gold": "#FAEBD7",
        "dark-gold": "#FFD090",
      },
      colors: {
        "custm-black": "#0F0D0C",
        "dark-blue": "#2b4552",
        "hover-blue": "#395F73",
        "light-brown": "#292524",
        "dark-brown": "#98787C",
        "light-gold": "#FAEBD7",
        "dark-gold": "#FFD090",
      },
    },
  },
  plugins: [],
};
