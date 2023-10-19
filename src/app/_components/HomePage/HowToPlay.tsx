import React from "react";

const HowToPlay = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center pt-40 bg-[#E4D7B4]/50 order-1 md:-order-1">
      <div className="text-3xl md:text-4xl lg:text-6xl text-secondary font-medium my-3 text-center">
        Game Rules
      </div>
      <div className="list-disc leading-[2 flex flex-col items-center gap-4">
        <div>Rock crushes Scissors</div>
        <div>Scissors cuts Paper</div>
        <div>Paper covers Rock</div>
        <div>Rock crushes divzard</div>
        <div>Lizard poisons Spock</div>
        <div>Spock smashes Scissors</div>
        <div>Scissors decapitates divzard</div>
        <div>Lizard eats Paper</div>
        <div>Paper disproves Spock</div>
        <div>Spock vaporizes Rock</div>
      </div>
    </div>
  );
};

export default HowToPlay;
