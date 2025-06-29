import { fontPrimary, fontSecondary } from "@/utils/fonts";
import meta from "@/utils/meta";
import "./globals.css";

export const metadata = meta.homepage;

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.className} ${fontPrimary.variable} ${fontSecondary.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
};
