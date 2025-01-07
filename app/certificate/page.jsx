"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { Fragment, useMemo } from "react";
import Header from "@/components/Header";

import Image from "next/image";

import { getListExperience } from "@/service/experience";
import { Skeleton } from "@/components/ui/skeleton";
import AbortController from "@/components/AbortController";

const array = Array(8).fill(null);

const experience = {
  icon: "",
  title: "My Certificate",
  description: "My Certificate",
};

const Certificate = () => {
  // Query
  const getListExperienceData = useQuery({
    queryKey: ["getListExperience"],
    queryFn: getListExperience,
    keepPreviousData: true,
  });

  const RENDER_EXPERIENCE = useMemo(() => {
    if (getListExperienceData?.isLoading || getListExperienceData.isFetching) {
      return (
        <div className="flex flex-col gap-[20px] py-8 text-center xl:text-left">
          <Skeleton className="bg-pink-50/20 h-8 w-full rounded-md" />
          <Skeleton className="bg-pink-50/20 h-8 w-full rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 py-6">
            {array.map((_, index) => {
              return (
                <Skeleton
                  className="bg-pink-50/20 h-72 w-full rounded-md"
                  key={index}
                />
              );
            })}
          </div>
        </div>
      );
    }

    if (getListExperienceData?.isError) {
      return (
        <div className="h-screen">
          <AbortController refetch={() => getListExperienceData.refetch()} />
        </div>
      );
    }

    if (
      getListExperienceData?.data &&
      getListExperienceData?.data?.data?.length > 0
    ) {
      return (
        <div className="flex flex-col gap-[30px] text-center xl:text-left">
          <h3 className="text-4xl font-bold">{experience?.title}</h3>
          <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
            {experience?.description}
          </p>
          <div className="h-[400px]">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
              {getListExperienceData?.data?.data
                ?.sort((a, b) => b.id - a.id)
                .map((items, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-[#232329] h-auto py-6 px-10 rounded-xl flex flex-col items-center lg:items-start gap-1"
                    >
                      <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                        {items.position}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                        <p className="text-white/60">{items.company}</p>
                      </div>
                      <span className="text-accent">
                        {items.startDate} - {items.endDate}
                      </span>

                      <div
                        className="text-white/60"
                        dangerouslySetInnerHTML={{ __html: items?.description }}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="h-96 flex items-center justify-center bg-pink-50/20 rounded-md">
        <h1>No data available</h1>
      </div>
    );
  }, [getListExperienceData]);

  return (
    <Fragment>
      <Header />
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeInOut",
          },
        }}
        className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
      >
        <div className="container mx-auto">{RENDER_EXPERIENCE}</div>
      </motion.section>
    </Fragment>
  );
};

export default Certificate;
