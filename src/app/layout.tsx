import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={inter.className}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </div>
  );
}
