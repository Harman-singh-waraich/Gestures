"use client";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./wagmiClient.js";

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
