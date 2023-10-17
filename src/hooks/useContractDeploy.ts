import { useState } from "react";
import { getContractAddress, keccak256, toHex } from "viem";
import { gameAbi, gameBytCode } from "@/constants";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Move } from "@/types";
import { useTrackTransaction } from "@/config/TrackTxnProvider";
var bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");

export type DeployState = {
  hash: string | undefined;
  status: "idle" | "error" | "loading" | "success"; // success here means deployment txn has been submitted
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  contractAddress: string | undefined;
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
    contractAddress: undefined,
    error: null,
  });

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { trackTxn } = useTrackTransaction();
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
      trackTxn(deployHash);

      const nonce = await publicClient.getTransactionCount({
        address: address!,
      });

      //deduce contract address
      const deployedContract = getContractAddress({
        from: address!,
        nonce: BigInt(nonce),
      });
      console.log(deployedContract);

      setDeployState({
        hash: deployHash,
        status: "success",
        isLoading: false,
        isError: false,
        isSuccess: true,
        contractAddress: deployedContract,
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

  return {
    deployState,
    deployContract,
  };
  return {};
}
