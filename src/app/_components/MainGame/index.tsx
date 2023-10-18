"use client";
import { useContract } from "@/app/_hooks/useContract";
import { useIsMounted } from "@/app/_hooks/useIsMounted";
import React from "react";
import CopyLinkButton from "../Shared/CopyLinkButton";
import { useAccount } from "wagmi";
import GameInfo from "./GameInfo";
import J1page from "./J1page";
import J2page from "./J2page";

interface Props {
  address: string;
}

const MainGame = ({ address: gameAddress }: Props) => {
  const { gameData, isLoading } = useContract(gameAddress! as `0x${string}`);
  const { address: account, isDisconnected } = useAccount();

  const isMounted = useIsMounted();
  if (!isMounted) return <></>;

  if (isLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (isDisconnected) {
    return <w3m-button />;
  }

  return (
    <div className="w-full h-full flex flex-col ">
      <GameInfo gameData={gameData} />
      {account === gameData.j1 ? (
        <J1page gameData={gameData} />
      ) : account === gameData.j2 ? (
        <J2page gameData={gameData} />
      ) : (
        <div>Your not a part of the game</div>
      )}
    </div>
  );
};

export default MainGame;
