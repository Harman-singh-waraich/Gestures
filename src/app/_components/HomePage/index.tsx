import Image from "next/image";
import React from "react";
import CreateGame from "./CreateGame";
import HowToPlay from "./HowToPlay";

function HomePage() {
  return (
    <main className="grid h-fit w-full grid-cols-1    md:grid-cols-2 items-center justify-start ">
      <HowToPlay />
      <CreateGame />
    </main>
  );
}

export default HomePage;
