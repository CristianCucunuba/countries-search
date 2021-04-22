import Moon from "../icons/Moon";
import Sun from "../icons/Sun";

const Header = ({ isDark = false }: { isDark: boolean }) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 bg-white shadow-md">
      <h1 className="text-lg font-bold">Where in the world?</h1>
      <button className="flex">
        {isDark ? <Sun /> : <Moon />}
        <span className="font-semibold">Dark Mode</span>
      </button>
    </header>
  );
};

export default Header;
