"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaPhoneAlt, FaHome, FaBriefcase } from "react-icons/fa";

const menus = [
  {
    icon: <FaHome />,
    name: "Home",
    path: "/dashboard",
  },
  {
    icon: <FaPhoneAlt />,
    name: "Contact",
    path: "/dashboard/contact",
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
  console.log("pathName =>", pathName);

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-1/6 bg-gray-800 text-white p-4">
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
                      ? "text-accent border-b-2  border-accent"
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

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
