import React from "react";
import CopyLinkButton from "../Shared/CopyLinkButton";
import { GameData } from "@/app/_hooks/useContract";
import { formatEther } from "viem";

type Props = {
  gameData: GameData;
};

const GameInfo = ({ gameData }: Props) => {
  const { gameAddress, j1, j2, stake } = gameData;
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-secondary text-base md:text-3xl text-center">
        Game :- {gameAddress}
      </div>
      <div className="flex flex-col  justify-center items-center  gap-2">
        <div className=" text-accent text-center text-sm md:text-base">
          Player 1 :- {j1}
        </div>
        <div className=" text-accent text-center text-sm md:text-base">
          Player 2 :- {j2}
        </div>
      </div>
      <div className="text-secondary text-base md:text-xl">
        Stake :- {formatEther(stake!)} ETH
      </div>
      <div className="flex flex-col items-center">
        <span className="text-gray-400 pb-1 text-sm">
          Share this link with the other party.
        </span>
        <CopyLinkButton
          link={`${process.env.NEXT_PUBLIC_BASE_URL}/game/${gameAddress}`}
        />
      </div>
    </div>
  );
};

export default GameInfo;
