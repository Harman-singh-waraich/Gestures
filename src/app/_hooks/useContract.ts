import { gameAbi } from "@/app/_constants";
import { useMemo } from "react";
import { useContractReads } from "wagmi";
import { Move } from "../_types";
export interface GameData {
  gameAddress: `0x${string}` | undefined;
  j1: `0x${string}` | undefined;
  j2: `0x${string}` | undefined;
  c2: Move;
  TIMEOUT: number | undefined;
  lastAction: number | undefined;
  stake: bigint | undefined;
  c1Hash: string;
}
export const useContract = (address: `0x${string}`) => {
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

      {
        ...gameContract,
        functionName: "stake",
      },
      {
        ...gameContract,
        functionName: "c1Hash",
      },
    ],
    allowFailure: false,
    watch: true,
  });

  const prettyData = useMemo(() => {
    return {
      gameAddress: address,
      j1: data?.[0],
      j2: data?.[1],
      TIMEOUT: Number(data?.[2]),
      lastAction: Number(data?.[3]),
      c2: data?.[4],
      stake: data?.[5],
      c1Hash: data?.[6],
    };
  }, [data]);

  return {
    gameData: prettyData as GameData,
    isLoading,
  };
};
