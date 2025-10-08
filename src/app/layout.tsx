import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import FloatingNavbar from "@/components/NavBar";
import  Providers  from "@/components/Providers"; 
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hipo",
  description: "Your Full ecommerce app",
  icons: [{ rel: "icon", url: "/hipologo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <Providers>
          <ClerkProvider>
          <main className="min-h-screen w-full bg-[#f8fafc]">
            <FloatingNavbar /> 
            {children}
            <Footer />
          </main>
          </ClerkProvider>
          
        </Providers>
      </body>
    </html>
  );
}
