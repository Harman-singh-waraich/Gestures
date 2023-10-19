import { WagmiProvider } from "@/app/_providers/WagmiProvider";
import "../globals.css";
import type { Metadata } from "next";
import { Gluten } from "next/font/google";
import { TrackTxnProvider } from "@/app/_providers/TrackTxnProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../_components/Shared/Navbar";
import Footer from "../_components/Shared/Footer";
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
            <Navbar />
            <div className="flex h-auto  min-h-screen w-full">{children}</div>
            <Footer />
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
