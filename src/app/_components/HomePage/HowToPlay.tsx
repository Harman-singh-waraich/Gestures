import Image from "next/image";
import React from "react";
const Rock = () => (
  <span className="flex">
    R<Image src={"assets/rock.svg"} alt="rock" width={20} height={20} />
    ck
  </span>
);
const HowToPlay = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center pt-40 bg-[#E4D7B4]/50 order-1 md:-order-1">
      <div className="text-3xl md:text-6xl text-secondary font-medium my-3 text-center">
        Game Rules
      </div>
      <ul className="list-disc leading-[2]">
        <li>Rock crushes Scissors</li>
        <li>Scissors cuts Paper</li>
        <li>Paper covers Rock</li>
        <li>Rock crushes Lizard</li>
        <li>Lizard poisons Spock</li>
        <li>Spock smashes Scissors</li>
        <li>Scissors decapitates Lizard</li>
        <li>Lizard eats Paper</li>
        <li>Paper disproves Spock</li>
        <li>Spock vaporizes Rock</li>
      </ul>
    </div>
  );
};

export default HowToPlay;
