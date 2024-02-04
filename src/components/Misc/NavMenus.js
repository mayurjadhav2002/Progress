import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
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
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { v4 as uuidv4 } from "uuid";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  MdAutoDelete,
  MdDashboard,
  MdOutlineClose,
  MdOutlineFeaturedVideo,
  MdOutlineInstallDesktop,
  MdOutlineWbIncandescent,
} from "react-icons/md";
import { IoCodeWorking } from "react-icons/io5";
import { AiTwotoneHome } from "react-icons/ai";
import { BsInstagram, BsKanban, BsLinkedin } from "react-icons/bs";
import { CiBoxList, CiGlobe } from "react-icons/ci";
import { RiUserSharedLine } from "react-icons/ri";
import { SiGoogledocs, SiReadthedocs } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa6";

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

const generateRandomId = () => uuidv4();

export const AfterLoginMenu = () => {
  const randomId = generateRandomId();

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
    <nav className="ml-5 flex items-center space-x-4 lg:space-x-6">
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

export const MobileMenu = ({ open, closeDrawer, loggedIn }) => {
  const randomId = uuidv4();

  const renderDashboardItems = () => (
    <>
      <ListItem>
        <Link to="/dashboard" className="flex">
          <ListItemPrefix>
            <MdDashboard />
          </ListItemPrefix>
          Dashboard
        </Link>
      </ListItem>
      <ListItem ripple={false} disabled>
        <ListItemPrefix>
          <BsKanban />
        </ListItemPrefix>
        Boards
      </ListItem>
      {renderSubItem("/dashboard/user/project/new", "New", <MdOutlineWbIncandescent />)}
      {renderSubItem("/dashboard/user/project", "All Boards", <CiBoxList />)}
      {renderSubItem("/", "Shared with you", <RiUserSharedLine />)}
      {renderSubItem("/", "Deleted boards", <MdAutoDelete />)}

      {/* Documents */}
      <ListItem ripple={false} disabled>
        <ListItemPrefix>
          <SiGoogledocs />
        </ListItemPrefix>
        Documentation
      </ListItem>
      {renderSubItem(`/dashboard/user/documentation/new/${randomId}`, "Write New", <TfiWrite />)}
      {renderSubItem("/dashboard/user/documentation/", "All Docs", <SiReadthedocs />)}
      {renderSubItem("/", "Shared with you", <RiUserSharedLine />)}
      {renderSubItem("/", "Deleted Docs", <MdAutoDelete />)}
    </>
  );

  const renderHomeItems = () => (
    <>
      {renderSubItem("/", "Home", <AiTwotoneHome />)}
      {renderSubItem("/", "Use Cases", <IoCodeWorking />)}
      {renderSubItem("/", "Features", <MdOutlineFeaturedVideo />)}
      {renderSubItem("/", "Install Locally", <MdOutlineInstallDesktop />)}
    </>
  );

  const renderSubItem = (to, text, icon) => (
    <ListItem className={`pl-10 -mt-2 ${to === "/" && "flex"}`}>
      <Link to={to} className={"flex"}>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {text}
      </Link>
    </ListItem>
  );

  return (
    <Drawer open={open} onClose={closeDrawer} overlay={false}>
      <div className="mb-2 flex items-center justify-between p-4">
        <Typography variant="h5" color="blue-gray">
          Menu
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <MdOutlineClose className="w-8 h-8" />
        </IconButton>
      </div>
      <List>{loggedIn ? renderDashboardItems() : renderHomeItems()}</List>
      <div className="p-2 mt-10 flex items-center justify-center gap-5">
        {socialLinks.map((link) => (
          <Link key={link.to} to={link.to} target="_blank">
            {link.icon}
          </Link>
        ))}
      </div>
    </Drawer>
  );
};

const socialLinks = [
  { to: "https://github.com/mayurjadhav2002/Progress", icon: <FaGithub className="w-8 h-8" /> },
  { to: "https://instagram.com/mayurjadhav2002_/", icon: <BsInstagram className="w-8 h-8 text-pink-400" /> },
  { to: "https://www.linkedin.com/in/mayurjadhav3/", icon: <BsLinkedin className="w-8 h-8 text-blue-700" /> },
  { to: "https://mayurjadhav.me?utm_source=progress", icon: <CiGlobe className="w-8 h-8 text-gray-400" /> },
];

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
