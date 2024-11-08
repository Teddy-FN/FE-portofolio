"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { CiMenuFries } from "react-icons/ci";

const MobileNav = ({ menus }) => {
  const pathName = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-scroll">
        <div className="my-20 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Teddy Ferdian <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center gap-8">
          {menus.map((items, index) => {
            return (
              <Link
                href={items.path}
                key={index}
                className={`${
                  items.path === pathName ??
                  "text-accent border-b-2  border-accent"
                } text-xl capitalize hover:text-accent transition-all flex items-center gap-4`}
              >
                {items.icon}
                {items.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
