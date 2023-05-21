import { useState } from "react";
import Link from "next/link";

import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import Logo from "@/components/app/Logo";
import useDarkMode from "@/hooks/useDarkMode";
import { dNavbar } from "@/constants/global";
const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { darkModeEnabled, toggleMode } = useDarkMode();
  console.log(darkModeEnabled);
  return (
    <header>
      <div
        className={`z-20 bg-green-200/50 dark:bg-neutral-950/40 fixed w-full h-full left-0 text-center flex flex-col justify-center gap-4 text-lg md:opacity-0 backdrop-blur-md ${
          isOpenMobileMenu ? "block" : "hidden"
        }`}
      >
        {dNavbar.map((item) => {
          return (
            <div key={`sm-nav-${item.text}`}>
              {item.text && (
                <Link href={item.url}>
                  <div className="m-link">{item.text}</div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <nav className="z-30 flex items-center w-full bg-green-100 dark:bg-neutral-950 shadow-md fixed left-0 top-0">
        <div className="px-2 py-3">
          <Logo color={darkModeEnabled ? "white" : "black"} />
        </div>
        <div className="md:flex items-center gap-3 ml-4 hidden">
          {dNavbar.map((item) => {
            return (
              <div key={`lg-nav-${item.text}`}>
                {item.text && (
                  <Link href={item.url}>
                    <div className="m-link">{item.text}</div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="p-2 cursor-pointer hover:bg-green-400/10 dark:hover:bg-neutral-900 rounded-lg mr-1 md:mr-2 m-color-transition ml-auto"
          onClick={toggleMode}
        >
          {darkModeEnabled ? (
            <SunIcon className="w-5" />
          ) : (
            <MoonIcon className="w-5" />
          )}
        </div>
        <div
          className="p-2 cursor-pointer hover:bg-green-400/10 dark:hover:bg-neutral-900 rounded-lg mr-2 m-color-transition md:hidden"
          onClick={() => {
            setIsOpenMobileMenu(!isOpenMobileMenu);
          }}
        >
          <Bars3Icon className="w-5 " />
        </div>
      </nav>
    </header>
  );
};

export default Header;
