"use client";
import CopyLinkButton from "@/app/_components/Shared/CopyLinkButton";
import { useGameDeploy } from "@/app/_hooks/useContractDeploy";
import { Move } from "@/app/_types";
import { isValidEthereumAddress } from "@/app/_utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  move: Move;
  partyAddress: string;
}

function CreateGame() {
  const [formData, setFormData] = useState<FormData>({
    move: Move.Null,
    partyAddress: "",
  });

  const { deployContract, deployState } = useGameDeploy(formData);
  const router = useRouter();

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
    deployContract!();
  };

  useEffect(() => {
    if (deployState?.contractAddress)
      router.push(`/game/${deployState.contractAddress}`);
  }, [deployState?.contractAddress]);

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <form onSubmit={handleSubmit}>
        <div className="text-xl md:text-2xl text-gray-700 font-medium my-3 text-center">
          Create a Game
        </div>
        <div className="text-gray-600 my-1 text-center">Pick a move</div>
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
                      className={`w-20 h-20 btn btn-circle btn-outline  hover:bg-primary-content rounded-full border-2 relative ${
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
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs`}
          />
        </div>

        <div className="w-full flex items-center justify-center my-1">
          <button
            type="submit"
            disabled={deployState.isLoading}
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

      {deployState?.contractAddress && (
        <CopyLinkButton
          link={`https://localhost:3000?contractAddress=${deployState?.contractAddress}`}
        />
      )}
    </div>
  );
}

export default CreateGame;
