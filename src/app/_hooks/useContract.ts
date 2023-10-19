import { gameAbi } from "@/app/_constants";
import { useEffect, useMemo, useState } from "react";
import { useContractReads, usePublicClient } from "wagmi";
import { Move } from "../_types";
import { decodeFunctionData } from "viem";
import { hasJ1TimedOut, hasJ2TimedOut } from "../_utils/helpers";
export interface GameData {
  gameAddress: `0x${string}` | undefined;
  j1: `0x${string}` | undefined;
  j2: `0x${string}` | undefined;
  c1: Move;
  c2: Move;
  TIMEOUT: number | undefined;
  lastAction: number | undefined;
  stake: bigint | undefined;
  c1Hash: string;
}
export const useContract = (address: `0x${string}`) => {
  const publicClient = usePublicClient();
  const [hasJ1Revealed, setRevealFound] = useState(false);
  const [c1, setC1] = useState<Move>(Move.Null);

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
      c1: c1,
    };
  }, [data, c1]);

  const hasGameEnded = useMemo(
    () => prettyData.stake === BigInt(0),
    [prettyData.stake]
  );

  //since solve function does not have any event, i have to rely on the stake variable,
  //combined with quick thinking to get the c1,salt when its revealed
  //this runs as soon as stake variable changes, and targets the block in which it changed, then i search for txns in that block
  // when found  decode the inpu
  useEffect(() => {
    if (
      hasJ1TimedOut(prettyData as GameData) ||
      hasJ2TimedOut(prettyData as GameData) ||
      !hasGameEnded ||
      hasJ1Revealed
    )
      return;

    publicClient
      .getBlockNumber()
      .then((blockNumber) => {
        publicClient
          .getBlock({ blockNumber: blockNumber, includeTransactions: true })
          .then((block) => {
            const txns = block.transactions;
            for (let i = 0; txns.length; i++) {
              if (
                txns[i].from.toLowerCase() === prettyData.j1?.toLowerCase() &&
                txns[i].to?.toLowerCase() === address.toLowerCase()
              ) {
                const { functionName, args } = decodeFunctionData({
                  abi: gameAbi,
                  data: txns[i].input,
                });

                setRevealFound(true);
                setC1(args?.[0] as Move);
                console.log(functionName, args);

                break;
              }
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, [hasGameEnded]);

  return {
    gameData: prettyData as GameData,
    isLoading,
    hasGameEnded,
    hasJ1Revealed,
  };
};
