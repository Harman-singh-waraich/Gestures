"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "./wagmiClient.js";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
