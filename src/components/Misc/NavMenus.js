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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { v4 as uuidv4 } from "uuid";

const NavLink = ({ to, className, children }) => (
  <Link
    to={to}
    className={`font-medium transition-colors hover:text-primary ${
      className || ""
    }`}
  >
    {children}
  </Link>
);

const MenubarLink = ({ to, children, shortcut }) => (
  <Link to={to} className="cursor-pointer">
    <MenubarItem>
      {children} {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
    </MenubarItem>
  </Link>
);

const DocumentationLink = ({ to, children, shortcut }) => (
  <Link to={to} className="cursor-pointer">
    <MenubarItem>
      {children} {shortcut && <MenubarShortcut>{shortcut}</MenubarShortcut>}
    </MenubarItem>
  </Link>
);

export const AfterLoginMenu = () => {
  const randomId = uuidv4();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Menubar className="border-0 border-transparent">
            <MenubarMenu>
              <MenubarTrigger>Boards</MenubarTrigger>
              <MenubarContent>
                <MenubarLink to="/dashboard/user/project/new" shortcut="⌘N">
                  New
                </MenubarLink>

                <NavLink to="/dashboard/user/project">
                  <MenubarItem>All Boards</MenubarItem>
                </NavLink>
                <MenubarSeparator />
                <NavLink>
                  <MenubarItem>Shared with you</MenubarItem>
                </NavLink>
                <MenubarSeparator />
                <NavLink>
                  <MenubarItem className="text-red-500">
                    Deleted Boards
                  </MenubarItem>
                </NavLink>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Menubar className="border-0 border-transparent">
            <MenubarMenu>
              <MenubarTrigger>Documentation</MenubarTrigger>
              <MenubarContent>
                <DocumentationLink
                  to={`/dashboard/user/documentation/new/${randomId}`}
                  shortcut="Ctrl + N + D"
                >
                  Write New
                </DocumentationLink>

                <NavLink to="/dashboard/user/documentation/">
                  <MenubarItem>All Documentations</MenubarItem>
                </NavLink>
                <MenubarSeparator />
                <NavLink>
                  <MenubarItem>Shared with you</MenubarItem>
                </NavLink>
                <MenubarSeparator />
                <NavLink>
                  <MenubarItem className="text-red-500">
                    Deleted Docs
                  </MenubarItem>
                </NavLink>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const BeforeLoginMenu = () => {
  const links = [
    { to: "/examples/dashboard", text: "Overview" },
    {
      to: "/examples/dashboard",
      text: "Use Cases",
      className: "text-muted-foreground",
    },
    {
      to: "/examples/dashboard",
      text: "Features",
      className: "text-muted-foreground",
    },
    {
      to: "/examples/dashboard",
      text: "Setup Locally",
      className: "text-muted-foreground",
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {links.map((link, index) => (
        <NavLink key={index} to={link.to} className={link.className}>
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
};

export const UserMenu = (props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={props.avatar} alt="user" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <NavLink to="/dashboard/profile/user">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </NavLink>
          <NavLink to="/dashboard/profile/user/account">
            <DropdownMenuItem>Account</DropdownMenuItem>
          </NavLink>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600"
            onClick={props.handleLogout}
          >
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
    <div className="bg-indigo-600 my-0 text-white">
      <p className="text-center text-sm font-medium py-3">
        Checking Status of API...
        <Link to="#" className="inline-block underline ml-4">
          Demo API deployed on Render
        </Link>
      </p>
    </div>
  );
};
