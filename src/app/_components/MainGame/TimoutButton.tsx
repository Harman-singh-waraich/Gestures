import { gameAbi } from "@/app/_constants";
import { GameData } from "@/app/_hooks/useContract";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { hasJ1TimedOut, hasJ2TimedOut } from "@/app/_utils/helpers";
import React, { useCallback, useMemo } from "react";
import Countdown from "react-countdown";
import { useAccount, useContractWrite } from "wagmi";

type Props = { gameData: GameData };

const TimeoutButton = ({ gameData }: Props) => {
  const { lastAction, TIMEOUT, j1, j2, gameAddress } = gameData;
  const { address } = useAccount();
  const { trackTxn, isTxnPending } = useTrackTransaction();

  const timeLeft = (lastAction! + TIMEOUT!) * 1000 - Date.now();

  const TimoutText = () => {
    if (address === j1) {
      if (hasJ1TimedOut(gameData)) return "You Timed Out!";
      if (hasJ2TimedOut(gameData)) return "Claim Win!";
    }
    if (address === j2) {
      if (hasJ2TimedOut(gameData)) return "You Timed Out!";
      if (hasJ1TimedOut(gameData)) return "Claim Win!";
    }
  };

  const { write: J1Timeout, isLoading: j1Loading } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "j1Timeout",
    onSuccess(data) {
      trackTxn(data?.hash);
    },
  });

  const { write: J2Timeout, isLoading: j2Loading } = useContractWrite({
    address: gameAddress,
    abi: gameAbi,
    functionName: "j2Timeout",
    onSuccess(data) {
      trackTxn(data?.hash);
    },
  });

  const isDisabled = useMemo(
    () =>
      j1Loading ||
      j2Loading ||
      (address == j1 && hasJ1TimedOut(gameData)) ||
      (address === j2 && hasJ2TimedOut(gameData)) ||
      isTxnPending,
    [j1Loading, j2Loading, gameData, address, isTxnPending]
  );

  const handleSubmit = () => {
    if (timeLeft > 0) return;
    if (address === j1 && hasJ2TimedOut(gameData)) J2Timeout?.();
    if (address === j2 && hasJ1TimedOut(gameData)) J1Timeout?.();
  };

  if (timeLeft > 0) {
    return (
      <Countdown
        className="bg-secondary text-white p-2 rounded-lg"
        date={Date.now() + timeLeft}
      />
    );
  }

  return (
    <button
      className="btn btn-primary"
      disabled={isDisabled}
      onClick={handleSubmit}
    >
      {TimoutText()}
    </button>
  );
};

export default TimeoutButton;
