"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Web3Button = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            className="max-h-10"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-primary  min-h-[30px] max-h-10 p-2"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="btn btn-error min-h-[30px] max-h-10 p-1"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <button
                  className="btn min-h-[30px] max-h-10 p-2"
                  onClick={openAccountModal}
                  type="button"
                >
                  <span className="text-secondary">{account.displayName}</span>
                  <div className="w-0 h-full border border-slate-400"></div>
                  <span>{chain.name}</span>
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default Web3Button;
