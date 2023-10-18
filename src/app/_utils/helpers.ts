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
  const { c2, lastAction, TIMEOUT } = gameData;

  if (c2 !== Move.Null && Date.now() / 1000 > lastAction! + TIMEOUT!) {
    return true;
  }
  return false;
};
