import Navigation from "@/components/Navigation";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Prompt } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuthProvider";
import ThemeLayout from "./context/themelayout";
import ReactQueryProvider from "./context/queryProvider";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CP Foodie😋",
  description: "Foodie app by CP students",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${prompt.variable} antialiased `}>
        <ThemeLayout>
          <ReactQueryProvider>
            <NextAuthProvider session={nextAuthSession}>
              <Navigation />
              {children}
            </NextAuthProvider>
          </ReactQueryProvider>
        </ThemeLayout>
      </body>
    </html>
  );
}
