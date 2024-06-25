"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

const Sidebar = ({ children }) => {
  const pathname = usePathname();
  const token = JSON.parse(localStorage.getItem("token"));
  const routes = useMemo(
    () => [
      {
        Icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },

      {
        Icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: token ? "/search" : "/login",
      },
    ],
    [pathname, token]
  );
  return (
    <div className="flex fixed h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2 ">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>

      <main className="h-full w-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
