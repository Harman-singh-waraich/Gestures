import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { Move } from "@/app/_types";
import React, { useCallback, useMemo, useState } from "react";
import { useContractWrite } from "wagmi";
import TimeoutButton from "./TimoutButton";
import { getJ1PlayedMove } from "@/app/_utils/secureHash";
import Image from "next/image";

type Props = { gameData: GameData };

const J1page = ({ gameData }: Props) => {
  const { j1, j2, c1, c2, gameAddress, c1Hash } = gameData;
  const { trackTxn } = useTrackTransaction();

  const { write, isLoading } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "solve",
    onSuccess(data) {
      console.log(data?.hash);

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
      <div className="flex flex-col gap-3 items-center border-b border-black md:border-none py-2">
        {isRevealed ? `You played ${Move[c1]}` : "You have played your move"}
        <button
          className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 btn btn-circle btn-outline bg-primary-content rounded-full border-2 relative "
          disabled={isDisabled || isRevealed}
          onClick={handleSubmit}
        >
          <Image
            src={`/assets/${
              isRevealed ? Move[c1].toLowerCase() : "question"
            }.svg`}
            alt={"move"}
            fill={true}
          />
        </button>
        {!isDisabled && c1 === Move.Null && "Reveal your move now"}
      </div>
      <div className="flex flex-col gap-3 items-center py-2">
        {c2 == Move.Null ? (
          <>
            <div className=" text-neutral">Waiting for opponent's move</div>
            <span className="loading loading-dots loading-md"></span>
          </>
        ) : (
          <div className="flex flex-col-reverse md:flex-col items-center gap-1">
            {" "}
            <span className="text-neutral">Opponent played {Move[c2]}</span>
            <span className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 btn btn-circle btn-outline bg-primary-content rounded-full border-2 relative ">
              <Image
                src={`/assets/${Move[c2].toLowerCase()}.svg`}
                alt={Move[c2].toLowerCase()}
                fill={true}
              />
            </span>
            {isRevealed && c1 === Move.Null && (
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
