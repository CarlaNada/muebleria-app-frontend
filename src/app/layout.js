
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "../context/AuthContext";
import AuthControls from "../components/AuthControls";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mueblería Arboleda",
  description: "Tienda online de muebles",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <header className="w-full border-b border-stone-200 bg-white px-6 py-3">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <Link href="/" className="font-semibold text-stone-800">
                Mueblería Arboleda
              </Link>

              <AuthControls />
            </div>
          </header>

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

