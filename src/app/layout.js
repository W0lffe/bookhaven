import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "./components/AppLayout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookHaven",
  description: "Your own digital library",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col items-center">
        <AppLayout>
           {children}
        </AppLayout>
      </body>
    </html>
  );
}
