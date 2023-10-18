import React from "react";
import CopyLinkButton from "../Shared/CopyLinkButton";
import { GameData } from "@/app/_hooks/useContract";

type Props = {
  gameData: GameData;
};

const GameInfo = ({ gameData }: Props) => {
  const { gameAddress } = gameData;
  return (
    <div>
      <div className="text-secondary text-xl md:text-3xl">
        Live Game :- {gameAddress}
      </div>
      <div>
        <span className="text-gray-400 py-2">
          Share this link with the other party.
        </span>
        <CopyLinkButton link={`https://localhost:3000/game/${gameAddress}`} />
      </div>
    </div>
  );
};

export default GameInfo;
