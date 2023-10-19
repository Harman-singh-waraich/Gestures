import MainGame from "@/app/_components/MainGame";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return {
    title: "Live Game",
    description: "Live Gesture Game",
  };
}

function Game({ params }: { params: { slug: string } }) {
  return <MainGame address={params.slug} />;
}

export default Game;
