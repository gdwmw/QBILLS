import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      colors: {
        E1: "#F6CBCB",
        E2: "#ED9797",
        E3: "#E36363",
        E4: "#DA2D2D",
        E5: "#9C1C1C",
        E6: "#570F0F",
        I1: "#D9E8FC",
        I2: "#A1C6F7",
        I3: "#69A4F2",
        I4: "#2F80ED",
        I5: "#105BBC",
        I6: "#0A3671",
        N1: "#FFFFFF",
        "N1.1": "#F9F9F9",
        N2: "#E6E6E6",
        "N2.2": "#F4F4F4",
        N3: "#999999",
        N4: "#808080",
        N5: "#666666",
        N6: "#4C4C4C",
        N7: "#191919",
        P1: "#FAF6F4",
        P2: "#EBDAD0",
        P3: "#CDA189",
        P4: "#BE8465",
        P5: "#A86948",
        P6: "#865439",
        S1: "#BFEDD2",
        S2: "#90E0B1",
        S3: "#60D28F",
        S4: "#33B469",
        S5: "#247F4A",
        S6: "#124025",
        W1: "#FFF3C2",
        W2: "#FFE785",
        W3: "#FFDA47",
        W4: "#FFCC00",
        W5: "#B89300",
        W6: "#665200",
      },
    },
  },
};
export default config;
