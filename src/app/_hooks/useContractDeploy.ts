import { useState } from "react";
import { parseEther } from "viem";
import { gameAbi, gameBytCode } from "@/app/_constants";
import { useAccount, useWaitForTransaction, useWalletClient } from "wagmi";
import { Move } from "@/app/_types";
import { hashMove } from "../_utils/secureHash";

export type DeployState = {
  hash: `0x${string}` | undefined;
  status: "idle" | "error" | "loading" | "success" | "submitted"; // success here means deployment txn has been submitted
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  contractAddress: `0x${string}` | null;
  error: null | string;
};

interface GameConstructorArgs {
  move: Move;
  partyAddress: string;
  stakeAmount: string;
}

export function useGameDeploy(params: GameConstructorArgs) {
  const { move, partyAddress, stakeAmount } = params;

  const [deployState, setDeployState] = useState<DeployState>({
    hash: undefined,
    status: "idle",
    isLoading: false,
    isError: false,
    isSuccess: false,
    contractAddress: null,
    error: null,
  });

  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const deployContract = async () => {
    try {
      setDeployState({
        ...deployState,
        status: "loading",
        isLoading: true,
      });
      const { hashedMove, encryptedSalt } = await hashMove(move);
      console.log(hashedMove, encryptedSalt);

      //its encrypted so safe to store
      localStorage.setItem("encryptedSalt", encryptedSalt);
      const deployHash = await walletClient?.deployContract({
        abi: gameAbi,
        account: address,
        bytecode: gameBytCode,
        args: [hashedMove, partyAddress as `0x${string}`],
        value: parseEther(stakeAmount),
      });

      setDeployState({
        ...deployState,
        hash: deployHash,
        status: "submitted",
        isLoading: true,
        error: null,
      });
    } catch (error: any) {
      console.log(error);

      setDeployState({
        ...deployState,
        status: "error",
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: error.message,
      });
    }
  };

  useWaitForTransaction({
    hash: deployState.hash,
    onSettled: (data, error) => {
      console.log(data);

      setDeployState({
        ...deployState,
        hash: undefined,
        isSuccess: true,
        status: "success",
        isLoading: false,
        contractAddress: data?.contractAddress!,
        error: null,
      });
    },
  });

  return {
    deployState,
    deployContract,
  };
}
