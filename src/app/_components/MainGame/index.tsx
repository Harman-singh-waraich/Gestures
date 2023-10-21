"use client";
import dynamic from "next/dynamic";
import { useContract } from "@/app/_hooks/useContract";
import { useIsMounted } from "@/app/_hooks/useIsMounted";
import React from "react";
import { useAccount } from "wagmi";
import GameInfo from "./GameInfo";
const J1page = dynamic(() => import("./J1page"));
const J2page = dynamic(() => import("./J2page"));
const Web3Button = dynamic(() => import("../Shared/Web3Button"));
const TimeoutButton = dynamic(() => import("./TimoutButton"));
import Link from "next/link";
import { Move } from "@/app/_types";
import { hasJ1TimedOut, hasJ2TimedOut, whoWon } from "@/app/_utils/helpers";

interface Props {
  address: string;
}

const MainGame = ({ address: gameAddress }: Props) => {
  const { gameData, isLoading, hasGameEnded, refetchGameState } = useContract(
    gameAddress! as `0x${string}`
  );
  const { address: account, isDisconnected } = useAccount();

  const isMounted = useIsMounted();
  const showPlayAgain =
    hasGameEnded ||
    (account === gameData.j1 && hasJ1TimedOut(gameData)) ||
    (account === gameData.j2 && hasJ2TimedOut(gameData));

  if (!isMounted || isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isDisconnected) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Web3Button />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-around gap-5 p-6 pt-20 md:p-20 lg:p-32 ">
      <GameInfo gameData={gameData} />
      {gameData.c1 !== Move.Null && (
        <div className="text-xl text-primary">{whoWon(account!, gameData)}</div>
      )}
      {account === gameData.j1 ? (
        <J1page gameData={gameData} />
      ) : account === gameData.j2 ? (
        <J2page gameData={gameData} />
      ) : (
        <div>Your not a part of the game</div>
      )}
      {showPlayAgain ? (
        <Link href="/" className="btn btn-accent">
          Play Again !
        </Link>
      ) : (
        <TimeoutButton gameData={gameData} onTimeout={refetchGameState} />
      )}
    </div>
  );
};

export default MainGame;
