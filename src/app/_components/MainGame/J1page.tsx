import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { Move } from "@/app/_types";
import React, { useCallback, useMemo } from "react";
import { useContractWrite } from "wagmi";
import { getJ1PlayedMove } from "@/app/_utils/secureHash";
import MoveIcon from "../Shared/MoveIcon";

type Props = { gameData: GameData };

const J1page = ({ gameData }: Props) => {
  const { c1, c2, gameAddress, c1Hash } = gameData;
  const { trackTxn } = useTrackTransaction();

  const { write, isLoading } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "solve",
    onSuccess(data) {
      trackTxn(data?.hash);
    },
  });
  const isDisabled = useMemo(() => c2 === Move.Null, [c2]);
  const isRevealed = useMemo(() => c1 !== Move.Null, [c1]);

  const handleSubmit = useCallback(async () => {
    const encryptedSalt = localStorage.getItem("encryptedSalt");
    const decrpytedValues = await getJ1PlayedMove(c1Hash, encryptedSalt!);

    write?.({
      args: [decrpytedValues?.move!, decrpytedValues?.salt! as bigint],
    });
  }, [c2]);

  return (
    <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-start md:justify-between my-4">
      {/* player 1 side */}
      <div className="flex flex-col gap-4 items-center border-b border-black md:border-none py-2">
        {isRevealed ? `You played ${Move[c1]}` : "You have played your move"}

        <MoveIcon
          moveType={isRevealed ? Move[c1].toLowerCase() : "question"}
          disabled={isDisabled || isRevealed}
          onClick={handleSubmit}
          extendClass=" bg-primary-content hover:bg-secondary-content"
        />

        {!isDisabled && c1 === Move.Null && "Reveal your move now"}
      </div>

      {/* player 2 side */}
      <div className="flex flex-col gap-4 items-center py-2">
        {c2 == Move.Null ? (
          // opponent has not played yet
          <>
            <div className=" text-neutral">Waiting for opponent's move</div>
            <span className="loading loading-dots loading-md"></span>
          </>
        ) : (
          //opponent played
          <div className="flex flex-col-reverse gap-3 md:flex-col items-center">
            {" "}
            <span className="text-neutral">Opponent played {Move[c2]}</span>
            <MoveIcon
              moveType={Move[c2]}
              extendClass=" bg-primary-content hover:bg-primary-content"
            />
            {!isRevealed && (
              <span className="text-neutral">
                You have to reveal your move now.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default J1page;
