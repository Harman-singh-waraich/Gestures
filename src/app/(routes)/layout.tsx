import { WagmiProvider } from "@/app/_providers/WagmiProvider";
import "../globals.css";
import type { Metadata } from "next";
import { Gluten } from "next/font/google";
import { TrackTxnProvider } from "@/app/_providers/TrackTxnProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "../_components/Shared/Navbar";
import Footer from "../_components/Shared/Footer";
import Head from "next/head";
import siteMetadata from "../_utils/siteMetaData";
const gluten = Gluten({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl!),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.headerTitle,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
  keywords: "rock paper scissor lizard spock game web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="images/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
          sizes="480x480"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
      </Head>
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
