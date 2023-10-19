import Link from "next/link";
import Web3Button from "./Web3Button";

const Navbar = () => {
  return (
    <div className="navbar bg-[#DD8851] px-2 md:px-16 fixed top-0 left-0">
      <div className="navbar-start">
        <Link
          href={"/"}
          className="btn btn-ghost normal-case text-xl md:text-2xl"
        >
          Gestures
        </Link>
      </div>

      <div className="navbar-end">
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
