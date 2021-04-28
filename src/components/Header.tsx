import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Header = ({ isDark = false }: { isDark: boolean }) => {
  return (
    <header className="w-full h-20 bg-white shadow-md ">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <Link href="/">
          <h1 className="text-lg font-bold cursor-pointer">
            Where in the world?
          </h1>
        </Link>
        <button className="flex">
          {isDark ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
          <span className="font-semibold">Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
