"use client";
import { isValidEthereumAddress } from "@/utils/helpers";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  selectedMove: string;
  ethereumAddress: string;
}

function CreateGame() {
  const [formData, setFormData] = useState<FormData>({
    selectedMove: "",
    ethereumAddress: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      formData.selectedMove === "" ||
      !isValidEthereumAddress(formData.ethereumAddress)
    )
      return;
    console.log("Move:", formData.selectedMove);
    console.log("Ethereum Address:", formData.ethereumAddress);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <form onSubmit={handleSubmit}>
        <div className="text-xl md:text-2xl text-gray-700 font-medium my-3">
          Create a Game
        </div>
        <div className="text-gray-600 my-1">Pick a move</div>
        <div className="flex flex-wrap gap-3">
          {["rock", "paper", "scissor", "lizard", "spock"].map(
            (move, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="selectedMove"
                  value={move}
                  checked={formData.selectedMove === move}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`w-20 h-20 btn btn-circle btn-outline rounded-full border-2 relative ${
                    formData.selectedMove === move ? "btn-active" : ""
                  }`}
                >
                  <Image src={`assets/${move}.svg`} alt={move} fill={true} />
                </div>
              </label>
            )
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-gray-600">
              Enter other party's ethereum address
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter here"
            name="ethereumAddress"
            value={formData.ethereumAddress}
            onChange={handleChange}
            className={`input input-bordered input-primary bg-transparent text-gray-600 w-full max-w-xs`}
          />
        </div>

        <div className="w-full flex items-center justify-center my-1">
          <button type="submit" className="btn btn-accent ">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGame;
