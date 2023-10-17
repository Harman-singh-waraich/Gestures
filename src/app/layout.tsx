import { WagmiProvider } from "@/config/WagmiProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Gluten } from "next/font/google";
import { TrackTxnProvider } from "@/config/TrackTxnProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <TrackTxnProvider>
            <div className="flex h-screen p-6 md:p-16 lg:px-40">{children}</div>
          </TrackTxnProvider>
        </WagmiProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
