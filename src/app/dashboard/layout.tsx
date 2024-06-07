import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidenav from "@/components/dashboard_components/Sidenav";
import Nav from "@/components/dashboard_components/Nav";
import Snackbar from "@/components/snackbar_popup/Snackbar";

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

      <Snackbar>
        <div className="w-full h-screen overflow-y-scroll">
          <Nav />
          <Sidenav />
          <div
            style={{
              backgroundImage: 'url("/rect.svg")',
              backgroundSize: "fill",
              backgroundRepeat: "repeat",
              minHeight: "100vh",
              width: "100%",
              backgroundAttachment: "fixed",
            }}
            className="ml-[17.78%] !w-[82.22%] h-full overflow-y-scroll"
          >
            {children}
          </div>
        </div>
        </Snackbar>
      </body>
    </html>
  );
}
