import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../utils/UserContext/UserContext";
import { APIstatusAnnouncBar, AfterLoginMenu, BeforeLoginMenu, MobileMenu, UserMenu } from "./Misc/NavMenus";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function Navbar() {
  const { loggedin, user, handleLogout, APIAwake } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const renderAuthButtons = () => {
    return loggedin ? (
      <UserMenu avatar={user?.avatar} handleLogout={handleLogout} />
    ) : (
      <>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="secondary">Register</Button>
        </Link>
      </>
    );
  };

  return (
    <div className="shadow-sm top-0 bg-white dark:bg-dark z-50 sm:relative md:sticky">
      {!APIAwake && <APIstatusAnnouncBar />}
      <div className="mx-auto flex shadow-sm items-center justify-between px-4 py-2 dark:bg-dark dark:text-white dark:border-b-2 dark:border-gray-400">
        <div className="flex items-center space-x-2 gap-1">
          <button
            type="button"
            onClick={openDrawer}
            className="flex appearance-none p-1 text-gray-500 md:hidden justify-center items-center gap-2 rounded-md border border-transparent font-semibold"
            data-hs-overlay="#hs-overlay-example"
          >
         <HamburgerMenuIcon/>
          </button>
          <Link to="/">
            <span className="text-md lg:text-2xl items-start">
              <span className="text-blue-600">P</span>
              <span className="font-light">ro</span>
              <span className="font-thin">gress</span>
            </span>
          </Link>
          <div className="lg:block hidden">
            {loggedin ? <AfterLoginMenu /> : <BeforeLoginMenu />}
          </div>
        </div>
        <nav className="flex items-center space-x-1 font-medium text-gray-800 gap-2">
          {renderAuthButtons()}
        </nav>
      </div>
      <MobileMenu open={open} closeDrawer={closeDrawer} loggedIn={loggedin} />
    </div>
  );
}

export default Navbar;
