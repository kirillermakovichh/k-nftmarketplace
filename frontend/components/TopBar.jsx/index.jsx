import ConnectButton from "../ConnectButton";
import NavBar from "./NavBar";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="relative flex w-full justify-between items-center px-4 py-2 shadow xs:px-0 xs:pr-[8px]">
        <Link
          href="/"
          className="text-lg w-[90px] font-bold sm:w-[80px] xs:hidden "
        >
          KEMarket
        </Link>
        <NavBar />
        <ConnectButton />
      </div>
    </div>
  );
};

export default TopBar;
