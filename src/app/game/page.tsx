"use client";
import { gameAbi } from "@/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useContractReads } from "wagmi";

const Game = () => {
  const params = useSearchParams();
  const gameContract = useMemo(
    () => ({
      abi: gameAbi,
      address: params.get("contractAddress")! as `0x${string}`,
    }),
    [params.get("contractAddress")]
  );
  useEffect(() => {}, []);
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
  console.log(data, gameContract);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {isLoading ? <div>asdgasgasdg</div> : <div>Loaded</div>}
    </div>
  );
};

export default Game;
