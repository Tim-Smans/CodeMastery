"use client"
import { FunctionComponent, PropsWithChildren } from "react"
import '../global.css'
import SiteFooter from "@/components/siteFooter"
import { Toaster } from "@/components/ui/sonner";


const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {


  return (
    <html suppressHydrationWarning>
      <head>
        <title>CodeMastery</title>
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center m-2">
        <main className="w-full flex-1">
          {children}
          <Toaster />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout