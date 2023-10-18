import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { Move } from "@/app/_types";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useContractWrite } from "wagmi";
import TimeoutButton from "./TimoutButton";

type Props = { gameData: GameData };

const J2page = ({ gameData }: Props) => {
  const { j1, j2, c2, gameAddress, stake } = gameData;
  const [selectedMove, setMove] = useState<Move>(Move.Null);
  const { trackTxn } = useTrackTransaction();

  const { write, isLoading, isError, isSuccess } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "play",
    value: stake,
    onSuccess(data) {
      console.log(data?.hash);

      trackTxn(data?.hash);
    },
    onError(err) {
      console.log(err);
    },
    onSettled() {},
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    setMove(Number(value));
  };

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (selectedMove === Move.Null) return;

      write?.({
        args: [selectedMove],
      });
    },
    [selectedMove]
  );

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-start md:justify-between">
      <div className="flex flex-col gap-3">
        {j2}
        <TimeoutButton gameData={gameData} />
        {c2 == Move.Null ? (
          <form
            className="flex flex-col gap-3 items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap gap-3 items-center">
              {Object.keys(Move)
                .filter((key: any) => isNaN(Number(Move[key])))

                .map((key: any) => Move[key].toLowerCase())
                .map(
                  (move, index) =>
                    index !== 0 && (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="move"
                          value={index}
                          checked={index === selectedMove}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div
                          className={` w-12 h-12 btn btn-circle btn-outline  hover:bg-primary-content rounded-full border-1 relative ${
                            index === selectedMove ? "bg-primary-content" : ""
                          }`}
                        >
                          <Image
                            src={`/assets/${move}.svg`}
                            alt={move}
                            fill={true}
                          />
                        </div>
                      </label>
                    )
                )}
            </div>
            <button
              type="submit"
              className="btn btn-accent "
              disabled={selectedMove === Move.Null}
            >
              Play
            </button>
          </form>
        ) : (
          <div>Waiting for opponent to reveal his move.</div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {j1}
        {c2 == Move.Null ? (
          <div>Opponent has played his move. Play yours now</div>
        ) : (
          <div>Waiting for opponent to reveal his move</div>
        )}
      </div>
    </div>
  );
};

export default J2page;
