import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { Move } from "@/app/_types";
import { hasJ1TimedOut, hasJ2TimedOut } from "@/app/_utils/helpers";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useContractWrite } from "wagmi";
import MoveIcon from "../Shared/MoveIcon";
import MoveSelector from "../Shared/MoveSelector";

type Props = { gameData: GameData };

const J2page = ({ gameData }: Props) => {
  const { c1, c2, gameAddress, stake } = gameData;
  const [selectedMove, setMove] = useState<Move>(Move.Null);
  const { trackTxn } = useTrackTransaction();

  const { write, isLoading } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "play",
    value: stake,
    onSuccess(data) {
      trackTxn(data?.hash);
    },
    onError(err) {
      console.log(err);
    },
  });

  //is play button disabled
  const isDisabled = useMemo(
    () =>
      selectedMove === Move.Null ||
      isLoading ||
      hasJ2TimedOut(gameData) ||
      hasJ1TimedOut(gameData),
    [isLoading, selectedMove]
  );

  //handlers
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
    <div className="w-full flex flex-col gap-4 md:flex-row items-center justify-start md:justify-between">
      <div className="flex flex-col gap-3 items-center border-b border-black md:border-none py-2">
        {c2 === Move.Null ? (
          // select move form
          <form
            className="flex flex-col gap-3 items-center"
            onSubmit={handleSubmit}
          >
            <span className="text-neutral">Play your move</span>
            {/* selector */}
            <MoveSelector onChange={handleChange} selectedMove={selectedMove} />
            <button
              type="submit"
              className="btn btn-accent "
              disabled={isDisabled}
            >
              Play
            </button>
          </form>
        ) : (
          <>
            <span>{`You played ${Move[c2]}`}</span>
            <MoveIcon
              moveType={Move[c2]}
              extendClass=" bg-primary-content hover:bg-primary-content"
            />
          </>
        )}
      </div>
      {/* opponent side */}
      <div className="flex flex-col gap-3 items-center py-2">
        {c2 == Move.Null ? (
          //waiting for j2 to play
          <div className="text-neutral text-center">
            Opponent has played his move. Play yours now
          </div>
        ) : c1 === Move.Null ? (
          //waiting for j1 to reveal
          <>
            <div className=" text-neutral text-center">
              Waiting for opponent to reveal.
            </div>
            <span className="loading loading-dots loading-md"></span>
          </>
        ) : (
          //game end
          <div className="flex flex-col-reverse md:flex-col items-center gap-1">
            {" "}
            <span className="text-neutral">Opponent played {Move[c1]}</span>
            <MoveIcon
              moveType={Move[c1]}
              extendClass=" bg-primary-content hover:bg-primary-content"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default J2page;
