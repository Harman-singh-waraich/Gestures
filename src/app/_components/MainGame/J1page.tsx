import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { Move } from "@/app/_types";
import React, { useCallback } from "react";
import { useContractWrite } from "wagmi";
import TimeoutButton from "./TimoutButton";
import { getJ1PlayedMove } from "@/app/_utils/secureHash";

type Props = { gameData: GameData };

const J1page = ({ gameData }: Props) => {
  const { j1, j2, c2, gameAddress, c1Hash } = gameData;
  const { trackTxn } = useTrackTransaction();
  const { write, isLoading, isError, isSuccess } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "solve",
    onSuccess(data) {
      console.log(data?.hash);

      trackTxn(data?.hash);
    },
    onSettled() {},
  });

  const handleSubmit = useCallback(async () => {
    console.log("ran");
    const encryptedSalt = localStorage.getItem("encryptedSalt");
    const decrpytedValues = await getJ1PlayedMove(c1Hash, encryptedSalt!);
    write?.({
      args: [decrpytedValues?.move!, decrpytedValues?.salt! as bigint],
    });
  }, [c2]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-start md:justify-between">
      <div className="flex flex-col gap-3">
        {j1}
        <button className="btn" onClick={handleSubmit}>
          Reveal
        </button>
        <TimeoutButton gameData={gameData} />
      </div>
      <div className="flex flex-col gap-3">
        {j2}
        {c2 == Move.Null ? (
          <div>Waiting for opponent's move</div>
        ) : (
          <div>
            {" "}
            Opponent played {Move[c2]} You have to reveal your move now.
          </div>
        )}
      </div>
    </div>
  );
};

export default J1page;
