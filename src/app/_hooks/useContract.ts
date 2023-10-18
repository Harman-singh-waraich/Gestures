import { gameAbi } from "@/app/_constants";
import { useMemo } from "react";
import { useContractReads } from "wagmi";

export const useContract = (address: string) => {
  const gameContract = {
    abi: gameAbi,
    address: address as `0x${string}`,
  };
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...gameContract,
        functionName: "j1",
      },
      {
        ...gameContract,
        functionName: "j2",
      },

      {
        ...gameContract,
        functionName: "TIMEOUT",
      },

      {
        ...gameContract,
        functionName: "lastAction",
      },

      {
        ...gameContract,
        functionName: "c2",
      },
    ],
    allowFailure: false,
    watch: true,
  });

  const prettyData = useMemo(() => {
    return {
      j1: data?.[0],
      j2: data?.[1],
      TIMEOUT: data?.[2],
      lastAction: data?.[3],
      c2: data?.[4],
    };
  }, [data]);

  return {
    ...prettyData,
    isLoading,
  };
};
