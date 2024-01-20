import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { ModeToggle } from "../themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const NavLink = ({ href, className, children }) => (
  <Link
    to={href}
    className={` font-medium transition-colors hover:text-primary ${
      className || ""
    }`}
  >
    {children}
  </Link>
);

export const AfterLoginMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Menubar className="border-0  border-transparent">
            <MenubarMenu>
              <MenubarTrigger>Boards</MenubarTrigger>
              <MenubarContent>
                <Link
                  to="/dashboard/user/project/new"
                  className="cursor-pointer"
                >
                  <MenubarItem>
                    New <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                </Link>

                <Link to="/dashboard/user/project">
                  <MenubarItem>All Boards</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link>
                  <MenubarItem>Shared with you</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link>
                  <MenubarItem className="text-red-500">
                    Deleted Boards
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Menubar className="border-0  border-transparent">
            <MenubarMenu>
              <MenubarTrigger>Documentation</MenubarTrigger>
              <MenubarContent>
                <Link
                  to="/dashboard/user/project/new"
                  className="cursor-pointer"
                >
                  <MenubarItem>
                    Write New <MenubarShortcut>Ctrl + N + D</MenubarShortcut>
                  </MenubarItem>
                </Link>

                <Link to="/dashboard/user/documentation/">
                  <MenubarItem>All Documentations</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link>
                  <MenubarItem>Shared with you</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link>
                  <MenubarItem className="text-red-500">
                    Deleted Docs
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const BeforeLoginMenu = () => {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 ">
      <NavLink href="/examples/dashboard">Overview</NavLink>
      <NavLink href="/examples/dashboard" className="text-muted-foreground">
        Customers
      </NavLink>
      <NavLink href="/examples/dashboard" className="text-muted-foreground">
        Products
      </NavLink>
      <NavLink href="/examples/dashboard" className="text-muted-foreground">
        Settings
      </NavLink>
    </nav>
  );
};

export const UserMenu = (props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={props.avatar} alt="@shadcn" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link to="/dashboard/profile/user">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/dashboard/profile/user/account">Account</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-600">
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const APIstatusAnnouncBar = () => {
  return (
    <>
      <div className="bg-indigo-600 my-0 text-white">
        <p className="text-center text-sm font-medium py-3">
          Checking Status of API...
          <Link to="#" className="inline-block underline ml-4">
            Demo API deployed on Render
          </Link>
        </p>
      </div>
    </>
  );
};
