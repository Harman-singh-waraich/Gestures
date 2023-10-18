import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { hasJ1TimedOut, hasJ2TimedOut } from "@/app/_utils/helpers";
import moment from "moment";
import React, { useCallback, useMemo } from "react";
import Countdown from "react-countdown";
import { useAccount, useContractWrite } from "wagmi";

type Props = { gameData: GameData };

const TimeoutButton = ({ gameData }: Props) => {
  const { lastAction, TIMEOUT, j1, j2, c2, gameAddress } = gameData;
  const { address } = useAccount();

  const timeLeft = (lastAction! + TIMEOUT!) * 1000 - Date.now();

  const TimoutText = () => {
    if (address === j1) {
      console.log(hasJ1TimedOut(gameData));

      if (hasJ1TimedOut(gameData)) return "You Timed Out!";
      if (hasJ2TimedOut(gameData)) return "Claim Win!";
    }
    if (address === j2) {
      if (hasJ2TimedOut(gameData)) return "You Timed Out!";
      if (hasJ1TimedOut(gameData)) return "Claim Win!";
    }
  };

  const { write: J1Timeout } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "j1Timeout",
  });
  const { write: J2Timeout } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "j2Timeout",
  });

  const handleSubmit = useCallback(() => {
    if (timeLeft > 0) return;
    if (address === j1 && hasJ2TimedOut(gameData)) J1Timeout?.();
    if (address === j2 && hasJ1TimedOut(gameData)) J2Timeout?.();
  }, [lastAction]);

  return (
    <button className="btn btn-primary" onClick={handleSubmit}>
      {timeLeft > 0 ? (
        <Countdown date={Date.now() + timeLeft} />
      ) : (
        `${TimoutText()}`
      )}
    </button>
  );
};

export default TimeoutButton;
