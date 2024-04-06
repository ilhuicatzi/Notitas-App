import ButtonDarkMode from "./ButtonDarkMode";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { privateRoutes, publicRoutes } from "./Navigation";
import { useAuth } from "../../hooks/useAuth";
import { FaUserAstronaut } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, signout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDropMenu = () => {
    setDropMenu(!dropMenu);
  };

  const signOut = () => {
    signout();
    setDropMenu(false);
  };


  return (
    <nav className="grid sm:grid-cols-5 grid-cols-2 px-6 py-2">

      <div className="hidden sm:flex"></div>

      <div className="sm:col-span-3 flex justify-center items-center ">
        <ul className="hidden md:flex items-center justify-center gap-2 text-sm">
          {isAuthenticated ? (
            <>
              {privateRoutes.map((link, index) => (
                <Link to={link.path} key={index} className="mx-3">
                  <li
                    className={`flex items-center gap-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-2
                    ${
                      location.pathname === link.path
                        ? "text-yellow-600 dark:text-yellow-500"
                        : ""
                    }
                    `}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.title}</span>
                  </li>
                </Link>
              ))}
            </>
          ) : (
            publicRoutes.map((link, index) => (
              <Link to={link.path} key={index}>
                <li
                  className={` rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1
                  ${
                    location.pathname === link.path
                      ? "text-yellow-500 dark:text-yellow-600"
                      : ""
                  }`}
                >
                  {link.title}
                </li>
              </Link>
            ))
          )}
        </ul>

        <div className="flex md:hidden justify-evenly w-full ">
          {isAuthenticated ? (
            privateRoutes.map((link, index) => (
              <Link to={link.path} key={index} className="mx-3">
                <li
                  className={`flex items-center gap-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-2
                    ${
                      location.pathname === link.path
                        ? "text-yellow-600 dark:text-yellow-500"
                        : ""
                    }
                    `}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="hidden sm:flex">{link.title}</span>
                </li>
              </Link>
            ))
          ) : (
            <button
              onClick={handleOpen}
              className="rounded-full p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <RxHamburgerMenu />
            </button>
          )}
        </div>

        {isOpen && (
          <ul className="md:hidden flex flex-col gap-2 text-sm absolute top-10 w-full text-center bg-zinc-100 dark:bg-zinc-950 py-4 z-40">
            {publicRoutes.map((link, index) => (
              <Link to={link.path} key={index}>
                <li
                  onClick={handleClose}
                  className={`rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 px-2 py-1
            ${
              location.pathname === link.path
                ? "text-yellow-500 dark:text-yellow-600"
                : ""
            }`}
                >
                  {link.title}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end items-center gap-3">
        {isAuthenticated && (
          <button
            onClick={handleDropMenu}
            className={`rounded-full p-2 text-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center ${
              dropMenu ? "bg-yellow-500 dark:bg-yellow-700" : ""
            }
            ${
              location.pathname === "/dashboard/profile"
                ? "text-yellow-600 dark:text-yellow-500"
                : ""
            }
            `}
          >
            <FaUserAstronaut />
          </button>
        )}
        <ButtonDarkMode />
      </div>

      {isAuthenticated && dropMenu && (
        <ul className="flex flex-col gap-2 text-sm absolute top-10 right-20 text-start rounded-lg bg-zinc-200 dark:bg-zinc-900 py-4 z-40 w-36">
          <li
            onClick={() => {
              navigate("/dashboard/profile");
              setDropMenu(false);
            }}
            className="rounded-lg  flex  items-center gap-2 cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-800 px-2 py-1"
          >
            {" "}
            <FaUser /> Perfil
          </li>
          <li className=" rounded-lg  flex  items-center gap-2 cursor-not-allowed hover:bg-zinc-300 dark:hover:bg-zinc-800 px-2 py-1">
            <LuSettings />
            Settings
          </li>
          <li
            onClick={signOut}
            className="rounded-lg flex  items-center gap-2 cursor-pointer hover:bg-red-300 dark:hover:bg-red-800 px-2 py-1"
          >
            <FiLogOut />
            Sign Out
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
