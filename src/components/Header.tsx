import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="w-full h-20 bg-white shadow-md dark:bg-dark-bg">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <Link href="/">
          <h1 className="text-lg font-bold cursor-pointer">
            Where in the world?
          </h1>
        </Link>
        <button
          className="flex"
          onClick={() => setTheme(isDark ? "light" : "dark")}>
          {theme == "dark" ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
