import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";
import Snackbar from "@/components/snackbar_popup/Snackbar";
import Providers from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift-Aboki",
  description: "Master your financial world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Nav />
          <Snackbar>
            <div className="">{children}</div>
          </Snackbar>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
