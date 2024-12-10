"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import Header from "@/components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useParams } from "next/navigation";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

import WorkSlideBtn from "@/components/WorkSlideBtn";

import { getProjectByCategory } from "@/service/work";
import EmptyData from "@/components/EmptyData";

const Work = () => {
  const params = useParams();
  const { id } = params;

  // Query
  const getWorkData = useQuery({
    queryKey: ["getProjectByCategory", id],
    queryFn: () => getProjectByCategory(id),
  });

  const [project, setProject] = useState({});

  const handleSlideChnage = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(getWorkData?.data?.data[currentIndex]);
  };

  useEffect(() => {
    if (getWorkData?.data && getWorkData?.isSuccess) {
      setProject(
        getWorkData?.data?.data?.length > 0 ? getWorkData?.data?.data[0] : {}
      );
    }
  }, [getWorkData.data, getWorkData?.isSuccess]);

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
        <div className="container mx-auto">
          {getWorkData?.data?.data?.length > 0 ? (
            <div className="flex flex-col xl:flex-row xl:gap-[30px]">
              <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                <div className="flex flex-col gap-[30px]">
                  <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                    {project?.num}
                  </div>
                  <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                    {project?.title} Project
                  </h2>
                  <p className="font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                    {project?.category} Project
                  </p>
                  <p className="text-white/60">{project?.description}</p>
                  <ul className="flex gap-4">
                    {project?.stack?.map((items, index) => {
                      return (
                        <li key={index} className="text-accent text-xl">
                          {items}
                          {index !== project?.stack?.length - 1 && ","}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border border-white/20"></div>
                  <div className="flex items-center gap-4">
                    <Link href={project?.live || ""}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Live Project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Link>
                    {project?.github
                      ? JSON?.parse(project?.github || "").map(
                          (items, index) => {
                            return (
                              <Link href={items.url || ""} key={index}>
                                <TooltipProvider delayDuration={100}>
                                  <Tooltip>
                                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                                      <BsGithub className="text-white text-3xl group-hover:text-accent" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Github Repo {items.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </Link>
                            );
                          }
                        )
                      : null}
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-[50%]">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  className="xl:h-[520px] mb-12"
                  onSlideChange={handleSlideChnage}
                >
                  {getWorkData?.data?.data?.map((items, index) => {
                    return (
                      <SwiperSlide key={index} className="w-full">
                        <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded-lg">
                          <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>

                          <div>
                            <Image
                              src={items.img}
                              alt={items.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                  <WorkSlideBtn
                    containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                    btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all duration-500"
                  />
                </Swiper>
              </div>
            </div>
          ) : (
            <EmptyData text="Work Empty" />
          )}
        </div>
      </motion.section>
    </Fragment>
  );
};

export default Work;