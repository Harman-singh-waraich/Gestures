"use server";
import { encodePacked, keccak256 } from "viem";
import { Move } from "../_types";
const Cryptr = require("cryptr");

export const hashMove = async (move: number) => {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const salt = await generateSalt();

  const encoded = encodePacked(["uint8", "uint256"], [move, salt]);
  const hashedMove = keccak256(encoded);

  const encryptedSalt = cryptr.encrypt(salt);

  return { hashedMove, encryptedSalt };
};

async function generateSalt() {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);

  let result = BigInt(0);
  for (let i = 0; i < randomBytes.length; i++) {
    result = (result << BigInt(8)) + BigInt(randomBytes[i]);
  }

  return result;
}

export const getJ1PlayedMove = async (
  c1hash: string,
  encryptedSalt: string
): Promise<{ move: number; salt: BigInt } | null> => {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const salt = cryptr.decrypt(encryptedSalt);

  for (const key in Move) {
    if (!isNaN(Number(Move[key]))) {
      const move = Number(Move[key]);
      const encoded = encodePacked(["uint8", "uint256"], [move, salt]);
      const hashedMove = keccak256(encoded);

      if (hashedMove === c1hash) return { move: move, salt: BigInt(salt) };
    }
  }

  return null;
};
