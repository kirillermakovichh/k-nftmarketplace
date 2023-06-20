import { useRouter } from "next/router";
import Link from "next/link";

function NavBar({}) {
  return (
    <nav className="flex justify-center items-center">
      <NavBarItem title={"HOME"} url={"/"} />
      <NavBarItem title={"MY NFT"} url={"/owned"} />
      <NavBarItem title={"CREATE"} url={"/create"} />
    </nav>
  );
}
function NavBarItem({ title, url }) {
  const router = useRouter();
  return (
    <li className="marker:none">
      <Link
        href={url}
        className={`rounded-lg px-3 py-1 mx-1 text-sm font-semibold xxs:px-2 xxs:mx-0 xxs:text-xs ${
          router.pathname === url
            ? "bg-[#e85a4f] text-black"
            : "hover:bg-[#e98074]"
        } `}
      >
        {title}
      </Link>
    </li>
  );
}

export default NavBar;
