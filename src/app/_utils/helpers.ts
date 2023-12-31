import { GameData } from "../_hooks/useContract";
import { Move } from "../_types";

export const isValidEthereumAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

//if c2 is NULL that means j2 has not played yet, so we will check timeout for him
export const hasJ2TimedOut = (gameData: GameData) => {
  const { c2, lastAction, TIMEOUT } = gameData;

  if (c2 === Move.Null && Date.now() / 1000 > lastAction! + TIMEOUT!) {
    return true;
  }
  return false;
};

export const hasJ1TimedOut = (gameData: GameData) => {
  const { c2, lastAction, TIMEOUT, c1 } = gameData;

  if (
    c1 === Move.Null &&
    c2 !== Move.Null &&
    Date.now() / 1000 > lastAction! + TIMEOUT!
  ) {
    return true;
  }
  return false;
};

export const whoWon = (address: `0x${string}`, gameData: GameData) => {
  const { c1, c2, j1, j2 } = gameData;

  if (c1 === c2) return "It's a Tie !";

  //win will be true if c1 beats c2
  const calcWin = () => {
    if (c1 % 2 == c2 % 2) return c1 < c2;
    else return c1 > c2;
  };

  const win = calcWin();

  // c1 beats c2, and j1 is on page ,then show "You won" ===> win == true && j1 == address
  if (j1 === address) {
    if (win) return "You Won !";
    return "You Lost !";
  }

  //opposite for j2
  if (j2 === address) {
    if (win) return "You Lost !";
    return "You Won !";
  }
};
