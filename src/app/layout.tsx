import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio - Creative Photography Template",
  description: "Professional Photography Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/core-img/favicon.ico" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body>
        {children}
        
        <Script src="/js/jquery/jquery-2.2.4.min.js" strategy="beforeInteractive" />
        <Script src="/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/js/plugins.js" strategy="lazyOnload" />
        {/* <Script src="/js/active.js" strategy="lazyOnload" />
        <Script src="/js/Img-round-movment.js" strategy="lazyOnload" /> */}
      </body>
    </html>
  );
}
