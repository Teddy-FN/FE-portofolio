"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { title } from "@/service/home";
import AbortController from "./AbortController";

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Resume",
    path: "/resume",
  },
  {
    name: "Work",
    path: "/work",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  // Query
  const titleHome = useQuery({
    queryKey: ["title"],
    queryFn: title,
  });

  const DATAS_HEADER = useMemo(() => {
    if (titleHome?.isLoading || titleHome.isFetching) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 py-6">
          <Skeleton className="bg-pink-50/20 h-8 w-40 rounded-md" />
        </div>
      );
    }

    if (titleHome?.isError) {
      return (
        <h1 className="text-4xl font-semibold">
          - <span className="text-accent">.</span>
        </h1>
      );
    }

    if (titleHome?.data && titleHome?.isSuccess) {
      return (
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            {titleHome?.data?.data?.name || "-"}{" "}
            <span className="text-accent">.</span>
          </h1>
        </Link>
      );
    }
  }, [titleHome]);

  return (
    <header className="py-8 xl:py-12 text-white xl:bg-pink-50/20">
      <div className="container mx-auto flex items-center justify-between">
        {DATAS_HEADER}

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="xl:hidden">
          <MobileNav menus={menus} />
        </div>
      </div>
    </header>
  );
};

export default Header;
