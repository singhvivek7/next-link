import { Metadata } from "next";

type Page = "homepage" | "about" | "contact" | "privacy" | "terms";

const meta: Record<Page, Metadata> = {
  homepage: {
    title: "Home - Next URL",
    description: "Modern URL Shortener - Next URL",
  },
  about: {
    title: "About - Next URL",
    description: "About Next URL",
  },
  contact: {
    title: "Contact - Next URL",
    description: "Contact Next URL",
  },
  privacy: {
    title: "Privacy - Next URL",
    description: "Privacy Policy of Next URL",
  },
  terms: {
    title: "Terms - Next URL",
    description: "Terms and Conditions of Next URL",
  },
};

export default meta;
