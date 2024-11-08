"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaHome,
  FaGlobe,
  FaSchool,
  FaSlidersH,
  FaUser,
  FaBriefcase,
  FaBook,
} from "react-icons/fa";

import MobileNav from "./MobileNav";

const menus = [
  {
    icon: <FaHome />,
    name: "Home",
    path: "/dashboard",
  },
  {
    icon: <FaGlobe />,
    name: "Experience",
    path: "/dashboard/experience",
  },
  {
    icon: <FaSchool />,
    name: "Education",
    path: "/dashboard/education",
  },
  {
    icon: <FaBook />,
    name: "Skills",
    path: "/dashboard/skills",
  },
  {
    icon: <FaUser />,
    name: "About Me",
    path: "/dashboard/about-me",
  },
  {
    icon: <FaSlidersH />,
    name: "Service",
    path: "/dashboard/service",
  },
  {
    icon: <FaBriefcase />,
    name: "Work / Project",
    path: "/dashboard/work",
  },
];

const DashboardLayout = ({ children }) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/6 bg-gray-800 text-white p-4 md:p-4 lg:block hidden">
        <h2 className="font-bold mb-4">Left Sidebar</h2>
        <ul>
          {menus.map((items, index) => {
            return (
              <li className="mb-2" key={index}>
                <Link
                  href={items.path}
                  key={index}
                  className={`${
                    items.path !== pathName ||
                    "text-accent border-b-2  border-accent"
                  } text-xl capitalize hover:text-accent transition-all flex items-center gap-4`}
                >
                  {items.icon}
                  {items.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="lg:hidden container mx-auto flex items-center justify-between py-8 xl:py-12 text-white xl:bg-pink-50/20">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Dashboard <span className="text-accent">.</span>
          </h1>
        </Link>
        <MobileNav menus={menus} />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
