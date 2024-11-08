"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaHome, FaBriefcase } from "react-icons/fa";

import MobileNav from "./MobileNav";

const menus = [
  {
    icon: <FaHome />,
    name: "Home",
    path: "/dashboard",
  },
  {
    icon: <FaBriefcase />,
    name: "Experience",
    path: "/dashboard/experience",
  },
  {
    icon: <FaBriefcase />,
    name: "Education",
    path: "/dashboard/education",
  },
  {
    icon: <FaBriefcase />,
    name: "Skills",
    path: "/dashboard/skills",
  },
  {
    icon: <FaBriefcase />,
    name: "About Me",
    path: "/dashboard/about-me",
  },
  {
    icon: "",
    name: "Service",
    path: "/dashboard/service",
  },
  {
    icon: "",
    name: "Title",
    path: "/dashboard/title",
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
            console.log(
              "items?.path === pathName =>",
              items?.path === pathName
            );

            return (
              <li className="mb-2" key={index}>
                <Link
                  href={items.path}
                  className={`${
                    items?.path === pathName
                      ? "text-accent border-b-2 border-accent"
                      : ""
                  } text-xl capitalize hover:text-accent transition-all`}
                >
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
