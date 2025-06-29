import { fontPrimary, fontSecondary } from "@/utils/fonts";
import meta from "@/utils/meta";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = meta.homepage;

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontPrimary.className} ${fontPrimary.variable} ${fontSecondary.variable} antialiased scroll-smooth`}
      >
        {children}
        <Toaster position="bottom-right" richColors theme="light" />
      </body>
    </html>
  );
};
