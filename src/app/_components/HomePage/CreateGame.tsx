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
    console.log(isDisconnected, formData);

    if (isDisconnected) return true;
    if (
      formData.move === Move.Null ||
      !isValidEthereumAddress(formData.partyAddress)
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
      !isValidEthereumAddress(formData.partyAddress)
    )
      return;
    console.log("Move:", formData.move);
    console.log("Ethereum Address:", formData.partyAddress);
    console.log("stake:", formData.stakeAmount);
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
        className="w-full h-screen flex flex-col items-center  gap-5 pt-40"
      >
        <div className="text-3xl md:text-6xl text-secondary font-medium my-3 text-center">
          Pick your move
        </div>

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
                      checked={formData.move === index}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={` w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 btn btn-circle btn-outline  hover:bg-primary-content rounded-full border-2 relative ${
                        formData.move === index ? "bg-secondary-content" : ""
                      }`}
                    >
                      <Image
                        src={`assets/${move}.svg`}
                        alt={move}
                        fill={true}
                      />
                    </div>
                  </label>
                )
            )}
        </div>

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
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs md:max-w-md`}
          />
        </div>
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
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs md:max-w-md`}
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
