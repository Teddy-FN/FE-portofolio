"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const link = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Resume", path: "/resume" },
  { name: "Work", path: "/work" },
  { name: "Contact", path: "/contact" },
];

const Nav = () => {
  const pathName = usePathname();
  console.log("pathName =>", pathName);

  return (
    <div className="flex items-center gap-8">
      {link?.map((items, index) => {
        return (
          <Link
            href={items.path}
            key={index}
            className={`${
              items.path === pathName && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {items.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Nav;
