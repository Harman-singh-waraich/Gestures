import React from "react";
import Image from "next/image";
import { Move } from "@/app/_types";

interface MoveSelectorProps {
  selectedMove: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  extendClass?: string;
}

const MoveSelector: React.FC<MoveSelectorProps> = ({
  selectedMove,
  onChange,
  extendClass,
}) => {
  return (
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
                  checked={index === selectedMove}
                  onChange={onChange}
                  className="hidden"
                />
                <div
                  className={`w-12 h-12 btn btn-circle btn-outline hover:bg-primary-content rounded-full border-1 relative  ${
                    index === selectedMove ? `bg-primary-content` : ""
                  } ${extendClass}`}
                >
                  <Image src={`/assets/${move}.svg`} alt={move} fill={true} />
                </div>
              </label>
            )
        )}
    </div>
  );
};

export default MoveSelector;
