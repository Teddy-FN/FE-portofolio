"use client";

import { FiDownload } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";

// Component
import { Button } from "@/components/ui/button";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { Fragment } from "react";
import Header from "@/components/Header";

// Service
import { title } from "@/service/home";
import { stats } from "@/service/stats";

export default function Home() {
  // Query
  const titleHome = useQuery({
    queryKey: ["title"],
    queryFn: title,
  });

  const statsHome = useQuery({
    queryKey: ["stats"],
    queryFn: stats,
  });

  return (
    <Fragment>
      <Header />
      <section className="h-full">
        <div className="container mx-auto h-full">
          <div className="flex flex-col xl:flex-row items-center justify-between py-8">
            <div className="text-center xl:text-left order-2 xl:order-none">
              <span className="text-xl">
                {titleHome?.data?.data?.position || "-"}
              </span>
              <h1 className="h1">
                Hello Im <br />
                <span className="text-accent">
                  {titleHome?.data?.data?.name || "-"}
                </span>
              </h1>
              <p className="max-w-[500px] mb-9 text-white/80">
                {titleHome?.data?.data?.position || "-"}
              </p>

              {/* Btn Social Media */}

              <div className="flex flex-col lg:flex-row items-center gap-8">
                <Button
                  variants="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>

                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Photo src={titleHome?.data?.data?.photo || ""} />
            </div>
          </div>
        </div>
        <Stats data={statsHome} />
      </section>
    </Fragment>
  );
}
