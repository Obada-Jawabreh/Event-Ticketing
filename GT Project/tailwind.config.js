import flowbite from "flowbite-react/tailwind";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {

      colors: {
        'black':'#221B2C',
        'blk': '#191223',
        'pin':'#FF204E',

      }

    },
  },
  plugins: [flowbite.plugin()],
};

export default config;
