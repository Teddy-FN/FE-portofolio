/* eslint-disable react/jsx-key */
"use client";

import React, { useEffect, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FaChevronDown,
  FaHome,
  FaGlobe,
  FaTools,
  FaSchool,
  FaSlidersH,
  FaUser,
  FaBriefcase,
  FaBook,
  FaArchive,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

import MobileNav from "./MobileNav";

const menus = [
  {
    icon: <FaHome />,
    name: "Home",
    path: "/dashboard",
    children: [],
  },
  {
    icon: <FaGlobe />,
    name: "See My Portfolio",
    path: "/",
    children: [],
  },
  {
    icon: <FaUser />,
    name: "About Me",
    path: "/dashboard/about-me",
    children: [],
  },
  {
    icon: <FaBriefcase />,
    name: "Experience",
    path: "/dashboard/experience",
    children: [],
  },
  {
    icon: <FaSchool />,
    name: "Education",
    path: "/dashboard/education",
    children: [],
  },
  {
    icon: <FaBook />,
    name: "Skills",
    path: "/dashboard/skills",
    children: [],
  },
  {
    icon: <FaSlidersH />,
    name: "Service",
    path: "/dashboard/service",
    children: [],
  },
  {
    icon: <FaArchive />,
    name: "Certificate",
    path: "/dashboard/certificate",
    children: [],
  },
  {
    icon: <FaTools />,
    name: "Project",
    path: "/dashboard/work",
    children: [
      {
        name: "Project List",
        path: "/dashboard/work",
      },
      {
        name: "Status",
        path: "/dashboard/work/status",
      },
    ],
  },
];

const DashboardLayout = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = window.sessionStorage.getItem("data");

    if (data === null) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {};

  return (
    <Fragment>
      <div className="lg:hidden container mx-auto flex items-center justify-between py-8 xl:py-12 text-white xl:bg-pink-50/20">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Dashboard <span className="text-accent">.</span>
          </h1>
        </Link>
        <MobileNav menus={menus} />
      </div>

      <SidebarProvider>
        <Sidebar>
          <SidebarContent className="bg-primary">
            <SidebarGroup>
              {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col">
                  {menus.map((items, index) => {
                    if (items?.children?.length === 0) {
                      return (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton
                            asChild
                            className={`${
                              items.path === pathName
                                ? "text-accent border-b-2 border-accent"
                                : "text-white"
                            } border-none rounded-none hover:text-primary hover:border-accent hover:bg-accent hover:rounded-md`}
                          >
                            <Link
                              href={items.path}
                              key={index}
                              className="text-xl capitalize text-white hover:text-primary hover:border-accent hover:bg-accent transition-all flex items-center gap-4"
                            >
                              {items.icon}
                              {items.name}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    } else {
                      return (
                        <Collapsible defaultOpen className="group/collapsible">
                          <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className="w-full">
                              <div className="text-xl capitalize text-white hover:text-accent transition-all flex items-center justify-between gap-4 w-full">
                                {items.icon}
                                {items.name}

                                <FaChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </div>
                            </CollapsibleTrigger>
                          </SidebarGroupLabel>
                          <CollapsibleContent className="ml-11 mt-4 flex flex-col gap-4">
                            {items.children.map((items, index) => {
                              return (
                                <Link
                                  href={items.path}
                                  key={index}
                                  className={`${
                                    items.path === pathName
                                      ? "text-accent border-b-2 border-accent"
                                      : "text-white"
                                  } text-xl capitalize text-white hover:text-primary hover:border-accent hover:bg-accent transition-all flex items-center gap-4 p-2 rounded-md`}
                                >
                                  {items.name}
                                </Link>
                              );
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="bg-primary border-none border-primary">
            <div
              className="text-xl capitalize text-white hover:text-primary hover:border-accent hover:bg-accent transition-all flex items-center gap-4 p-2 rounded-md"
              onClick={handleLogout}
            >
              <IoLogOut />
              <p>Log out</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="w-full px-4 lg:p-8">
          <SidebarTrigger className="hidden md:block" />
          {/* Main Content */}
          <div>{children}</div>
        </main>
      </SidebarProvider>
    </Fragment>
  );
};

export default DashboardLayout;
