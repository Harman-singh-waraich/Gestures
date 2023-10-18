import Image from "next/image";
import React from "react";
import CreateGame from "./CreateGame";

function HomePage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-start ">
      <div className=" flex flex-wrap items-center justify-center gap-4 text-3xl md:text-7xl text-text-900 font-medium text-center m-4">
        <span className="flex ">
          R<Image src="assets/rock.svg" alt="rock" width={40} height={40} />
          ck
        </span>
        <span className="flex ">
          P<Image src="assets/paper.svg" alt="paper" width={40} height={40} />
          per
        </span>
        <span className="flex ">
          Sc
          <Image
            src="assets/scissor.svg"
            alt="scissor"
            width={40}
            height={40}
          />
          ssor
        </span>
        <span className="flex ">
          Li
          <Image src="assets/lizard.svg" alt="lizard" width={40} height={40} />
          ard
        </span>
        <span className="flex ">
          Sp
          <Image src="assets/spock.svg" alt="spock" width={40} height={40} />
          ck
        </span>
      </div>
      <div className=" w-full h-auto flex flex-col items-center justify-center border border-text-900 bg-[#c0e5da] rounded-lg p-4 m-8">
        <CreateGame />
      </div>

      <div>{/* how to */}</div>
    </main>
  );
}

export default HomePage;
