import { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function Header() {
  const [isDark, setIsDark] = useState(false);

  function handleClick() {
    setIsDark(!isDark);
    document.body.classList.toggle("dark");
  }
  return (
    <header className="py-5 bg-white dark:bg-[#2b3743] dark:shadow-[#1f2c35] dark:text-white shadow-md shadow-[#dfdfdf] ">
      <div className="container w-11/12">
        <div className="flex justify-between flex-wrap">
          <div className="font-bold text-lg">
            <h1>Where in the world ?</h1>
          </div>
          <button
            className="flex items-center gap-2"
            onClick={() => handleClick()}
          >
            {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
