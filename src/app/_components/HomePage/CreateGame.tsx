"use client";
import { useGameDeploy } from "@/app/_hooks/useContractDeploy";
import { Move } from "@/app/_types";
import { isValidEthereumAddress } from "@/app/_utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
import MoveSelector from "../Shared/MoveSelector";

interface FormData {
  move: Move;
  partyAddress: string;
  stakeAmount: string;
}

function CreateGame() {
  const [formData, setFormData] = useState<FormData>({
    move: Move.Null,
    partyAddress: "",
    stakeAmount: "0",
  });

  const { deployContract, deployState } = useGameDeploy(formData);
  const router = useRouter();
  const { isDisconnected } = useAccount();

  //check for button state
  const isButtonDisabled = useMemo(() => {
    if (isDisconnected) return true;
    if (
      formData.move === Move.Null ||
      !isValidEthereumAddress(formData.partyAddress) ||
      formData.stakeAmount === "0"
    )
      return true;
    if (deployState.isLoading) return true;
  }, [isDisconnected, formData, deployState]);

  //handlers
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === "move" ? Number(value) : value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      formData.move === Move.Null ||
      !isValidEthereumAddress(formData.partyAddress) ||
      formData.stakeAmount === "0"
    )
      return;
    deployContract!();
  };

  //once contract address available , route the deployer to the live game
  useEffect(() => {
    if (deployState?.contractAddress)
      router.push(`/game/${deployState.contractAddress}`);
  }, [deployState?.contractAddress]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-screen flex flex-col items-center  gap-5 pt-40 px-4"
      >
        <div className="text-3xl md:text-4xl lg:text-6xl text-secondary font-medium my-3 text-center">
          Pick your move
        </div>

        {/* selector */}
        <MoveSelector
          onChange={handleChange}
          selectedMove={formData.move}
          extendClass="w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20"
        />
        {/* address input */}
        <div className="form-control w-full items-center">
          <label className="label">
            <span className="label-text text-gray-600">
              Enter other party's ethereum address
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter here"
            name="partyAddress"
            value={formData.partyAddress}
            onChange={handleChange}
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs md:max-w-sm lg:max-w-md`}
          />
        </div>

        {/* stake input */}
        <div className="form-control w-full items-center">
          <label className="label">
            <span className="label-text text-gray-600">Enter stake amount</span>
          </label>
          <input
            type="text"
            placeholder="Enter here"
            name="stakeAmount"
            value={formData.stakeAmount}
            onChange={handleChange}
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs md:max-w-sm lg:max-w-md`}
          />
        </div>

        <div className="w-full flex items-center justify-center my-1">
          <button
            type="submit"
            disabled={isButtonDisabled}
            className="btn btn-accent "
          >
            {deployState.isLoading ? (
              <>
                Deploying
                <span className="loading loading-dots loading-sm"></span>
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateGame;
