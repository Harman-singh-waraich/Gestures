"use client";
import Image from "next/image";
import React, { ReactElement } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  moveType: string; // This prop should be the type of move, like 'rock', 'paper', etc.
  extendClass?: string;
}

const MoveIcon: React.FC<Props> = ({
  moveType,
  extendClass,
  ...buttonProps
}): ReactElement => {
  return (
    <button
      type="button"
      className={`w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 btn btn-circle btn-outline  rounded-full border-2 relative ${extendClass}`}
      {...buttonProps}
    >
      <Image
        src={`/assets/${moveType.toLowerCase()}.svg`}
        alt={moveType.toLowerCase()}
        fill={true}
      />
    </button>
  );
};

export default MoveIcon;
