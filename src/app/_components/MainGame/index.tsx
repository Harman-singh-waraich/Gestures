"use client";
import { useContract } from "@/app/_hooks/useContract";
import { useIsMounted } from "@/app/_hooks/useIsMounted";
import React from "react";
import CopyLinkButton from "../Shared/CopyLinkButton";
import { useAccount } from "wagmi";

interface Props {
  address: string;
}

const MainGame = ({ address: gameAddress }: Props) => {
  const { j1, j2, c2, TIMEOUT, lastAction, isLoading } = useContract(
    gameAddress!
  );
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
      <div className="text-gray-600 text-xl md:text-3xl">
        Live Game :- {gameAddress}
      </div>
      <div>
        <span className="text-gray-400 py-2">
          Share this link with the other party.
        </span>
        <CopyLinkButton link={`https://localhost:3000/game/${gameAddress}`} />
      </div>
      {account === j1 ? (
        <div>j1's page</div>
      ) : account === j2 ? (
        <div>j2's page</div>
      ) : (
        <div>Your not a part of the game</div>
      )}
    </div>
  );
};

export default MainGame;
