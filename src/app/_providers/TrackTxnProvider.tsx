"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { Hash } from "viem";
import { useWaitForTransaction } from "wagmi";
import getConfig from "./useConfig";

interface TrackContextType {
  trackTxn: (hash: Hash | undefined) => void;
}

interface TrackTxnProviderProps {
  children: ReactNode;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackTxnProvider: React.FC<TrackTxnProviderProps> = ({
  children,
}) => {
  const [hash, setHash] = useState<Hash | undefined>();
  const { toastConfig } = getConfig();

  const trackTxn = (hash: Hash | undefined) => {
    setHash(hash);

    toast.loading("Transacion Submitted!", toastConfig);
  };

  useWaitForTransaction({
    hash: hash,
    onError(err) {
      toast.dismiss();
      toast.error("Transaction Failed!", toastConfig);
    },
    onSettled: (data, error) => {
      toast.dismiss();
      toast.success("Transaction Successful!", toastConfig);

      setHash(undefined);
    },
  });

  return (
    <TrackContext.Provider value={{ trackTxn }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackTransaction = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error(
      "useTrackTransaction must be used within a TrackTxnProvider"
    );
  }
  return context;
};
