import flowbite from "flowbite-react/tailwind";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      black: "#44000A",
    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
