import { WagmiProvider } from "@/config/WagmiProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Gluten } from "next/font/google";

const gluten = Gluten({ subsets: ["latin"] });

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
      <body className={gluten.className}>
        <WagmiProvider>
          <div className="flex h-screen p-6 md:p-16 lg:px-40">{children}</div>
        </WagmiProvider>
      </body>
    </html>
  );
}
