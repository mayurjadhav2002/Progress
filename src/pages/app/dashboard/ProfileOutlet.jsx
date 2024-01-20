import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../../../components/dashboard/user/sidbar";
import { Separator } from "../../../components/ui/separator";
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/profile/user",
  },
  {
    title: "Account",
    href: "/dashboard/profile/user/account",
  },
  {
    title: "Appearance",
    href: "/dashboard/profile/user/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/profile/user/notifications",
  },

];

function ProfileOutlet() {
  return (
    <div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 px-5">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl"><Outlet /></div>
        </div>
      </div>
      
    </div>
  );
}

export default ProfileOutlet;
