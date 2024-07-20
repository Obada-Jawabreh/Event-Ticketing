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
        "ter-dark": "#423760",
        "custom-red": "#FF204E",
        "custom-red-hover": "#d4054c",
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
      backgroundImage: {
        "gradient-four-colors":
          "linear-gradient(220deg, rgba(49,39,63,1) -1%, rgba(78,67,118,0.6083683473389356) 93%)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
