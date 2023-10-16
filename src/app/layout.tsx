import { WagmiProvider } from "@/config/WagmiProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Dosis } from "next/font/google";

const dosis = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPS Game",
  description: "Play Rock-Paper-Scissor-Lizard-Spock with your friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dosis.className}>
        <WagmiProvider>
          <div className="flex h-auto px-6 md:px-16 lg:px-40">{children}</div>
        </WagmiProvider>
      </body>
    </html>
  );
}
