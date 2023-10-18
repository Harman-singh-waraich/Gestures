import MainGame from "@/app/_components/MainGame";
import React from "react";

function Game({ params }: { params: { slug: string } }) {
  return <MainGame address={params.slug} />;
}

export default Game;
