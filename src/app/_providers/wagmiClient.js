"use client";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

import { publicProvider } from "wagmi/providers/public";
import { goerli } from "wagmi/chains";
import getConfig from "./useConfig";

const { projectId } = getConfig();

export const { chains, publicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Gesture Game",
  projectId: projectId,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
