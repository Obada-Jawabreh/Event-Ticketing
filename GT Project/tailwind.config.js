import flowbite from "flowbite-react/tailwind";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        black: "#221B2C",
        blk: "#191223",
        pin: "#FF204E",
        "prim-dark": "#221B2C",
        "second-dark": "#31273F",
        "custom-red": "#FF204E",
        "custom-red-hover": "#FF0035",
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
