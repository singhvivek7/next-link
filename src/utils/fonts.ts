import { Montserrat, Source_Sans_3 } from "next/font/google";

export const fontPrimary = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const fontSecondary = Source_Sans_3({
  variable: "--font-secondary",
  subsets: ["latin"],
});
