import "./globals.css";

import { ConfigStyleProvider } from "@/components/config-style-provider";
import { Toaster } from "@/components/ui/sonner";
import { fontPrimary, fontSecondary } from "@/utils/fonts";
import meta from "@/utils/meta";

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
        <ConfigStyleProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ConfigStyleProvider>
      </body>
    </html>
  );
};
