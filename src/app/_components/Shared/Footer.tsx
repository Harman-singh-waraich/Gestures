import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer items-center p-2 bg-gray-100 text-neutral fixed bottom-0 left-0">
      <aside className="items-center grid-flow-col">
        <p>Made with ♡ by @turbancoder</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link
          href={`https://github.com/Harman-singh-waraich/`}
          target="_blank"
          className="w-6 md:w-7 h-6 md:h-7 cursor-pointer   relative hover:scale-105"
        >
          <Image
            src={`/assets/github.svg`}
            alt="github"
            fill={true}
            className="px-1 md:px-0"
          />
        </Link>
        <Link
          href={`https://twitter.com/notifications`}
          target="_blank"
          className="w-7 md:w-8 h-7 md:h-8 cursor-pointer   relative hover:scale-105"
        >
          <Image
            src={`/assets/twitter.svg`}
            alt="twitter"
            fill={true}
            className="px-1 md:px-0"
          />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
