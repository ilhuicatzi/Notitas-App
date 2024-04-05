import ButtonDarkMode from "./ButtonDarkMode";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

function Navbar() {
const [isOpen, setIsOpen] = useState(false);

const handleOpen = () => {
  setIsOpen(!isOpen);
}

const handleClose = () => {
  setIsOpen(false);
}

  return (
    <nav className="grid grid-cols-5 px-6 py-2">
      <div></div>
      <div className="col-span-3 flex justify-center items-center">
        <ul className="hidden md:flex items-center justify-center gap-2 text-sm">
          <Link to="/">
            <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
              About
            </li>
          </Link>
          <Link to="/login">
            <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
              Login
            </li>
          </Link>
          <Link to="/register">
            <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
              Register
            </li>
          </Link>
        </ul>
        <div className="flex md:hidden">
          <button onClick={handleOpen} className="rounded-full p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <RxHamburgerMenu />
          </button>
        </div>
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-2 text-sm absolute top-10 w-full text-center bg-zinc-100 dark:bg-zinc-950 py-4 z-40">
            <Link to="/" onClick={handleClose}>
              <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
                Home
              </li>
            </Link>
            <Link to="/about" onClick={handleClose}>
              <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
                About
              </li>
            </Link>
            <Link to="/login" onClick={handleClose}>
              <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
                Login
              </li>
            </Link>
            <Link to="/register" onClick={handleClose}>
              <li className="rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1">
                Register
              </li>
            </Link>
          </ul>
        )}
      </div>
      <div className="flex justify-end items-center">
        <ButtonDarkMode />
      </div>
    </nav>
  );
}

export default Navbar;
