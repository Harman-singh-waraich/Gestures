import { useState } from "react";
import { getContractAddress, keccak256, toHex } from "viem";
import { gameAbi, gameBytCode } from "@/app/_constants";
import {
  useAccount,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";
import { Move } from "@/app/_types";
import { useTrackTransaction } from "@/app/_providers/TrackTxnProvider";
import { getTransaction } from "viem/actions";
var bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");

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
}
const cryptr = new Cryptr("myTotallySecretKey");

export function useGameDeploy(params: GameConstructorArgs) {
  const { move, partyAddress } = params;

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

  //   const salt = toHex(bcrypt.genSaltSync(10));
  //   console.log(salt);
  //   const hashedMove = keccak256(
  //     (toHex(move) + salt) as `0x${string}`
  //   ).toString();
  //   console.log(move, hashedMove);

  //   const encryptedSalt = cryptr.encrypt(salt);

  //   localStorage.setItem("encrypted_salt", encryptedSalt);

  const deployContract = async () => {
    try {
      setDeployState({
        ...deployState,
        status: "loading",
        isLoading: true,
      });

      const deployHash = await walletClient?.deployContract({
        abi: gameAbi,
        account: address,
        bytecode: gameBytCode,
        args: [
          "0xe79edaced4f7c071162aa281d7ec9a3952be2cadaf4fda1ecad274f7efb1efcd", //TODO : remove hardcoding
          partyAddress as `0x${string}`,
        ],
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
