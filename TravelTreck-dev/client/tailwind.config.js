module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        black: { 900: "var(--black_900)", "900_2d": "var(--black_900_2d)" },
        blue_gray: { 100: "var(--blue_gray_100)", 400: "var(--blue_gray_400)" },
        cyan: { "100_7f": "var(--cyan_100_7f)" },
        gray: {
          50: "var(--gray_50)",
          500: "var(--gray_500)",
          "100_7f": "var(--gray_100_7f)",
          "100_7f_01": "var(--gray_100_7f_01)",
        },
        indigo: { 50: "var(--indigo_50)", 300: "var(--indigo_300)" },
        light_blue: { 900: "var(--light_blue_900)" },
        white: {
          0: "var(--white_0)",
          1: "var(--white_1)",
          2: "var(--white_2)",
          3: "var(--white_3)",
          a700: "var(--white_a700)",
        },
      },
      boxShadow: { xs: "0 4px 42px 0 #0000002d" },
      fontFamily: {
        abel: "Abel",
        cabin: "Cabin",
        hanaleifill: "Hanalei Fill",
        inter: "Inter",
      },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #f06f1f7f,#bcf2fb7f,#f0f1f7f7f)",
      },
    },
  },
  plugins: [],
};
