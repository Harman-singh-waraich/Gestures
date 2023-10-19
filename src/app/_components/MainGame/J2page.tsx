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

type Props = { gameData: GameData };

const J2page = ({ gameData }: Props) => {
  const { c2, gameAddress, stake } = gameData;
  const [selectedMove, setMove] = useState<Move>(Move.Null);
  const { trackTxn } = useTrackTransaction();

  const { write, isLoading } = useContractWrite({
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
  });
  const isDisabled = useMemo(
    () =>
      selectedMove === Move.Null ||
      isLoading ||
      hasJ2TimedOut(gameData) ||
      hasJ1TimedOut(gameData),
    [isLoading, selectedMove]
  );
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
      <div className="flex flex-col gap-3 items-center">
        {c2 == Move.Null ? (
          <form
            className="flex flex-col gap-3 items-center"
            onSubmit={handleSubmit}
          >
            <span className="text-neutral">Play your move</span>
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
              disabled={isDisabled}
            >
              Play
            </button>
          </form>
        ) : (
          <>
            <span>{`You played ${Move[c2]}`}</span>
            <span className="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 btn btn-circle btn-outline bg-primary-content rounded-full border-2 relative ">
              <Image
                src={`/assets/${Move[c2].toLowerCase()}.svg`}
                alt={Move[c2].toLowerCase()}
                fill={true}
              />
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center">
        {c2 == Move.Null ? (
          <div>Opponent has played his move. Play yours now</div>
        ) : (
          <>
            <div className=" text-neutral">Waiting for opponent's move</div>
            <span className="loading loading-dots loading-md"></span>
          </>
        )}
      </div>
    </div>
  );
};

export default J2page;
