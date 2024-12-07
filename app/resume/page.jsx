"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Icons
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVuedotjs,
  SiPostgresql,
  SiSequelize,
} from "react-icons/si";

// Components
import Header from "@/components/Header";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Service
import { getListExperience } from "@/service/experience";
import { getListEducation } from "@/service/education";
import { getListAboutMe } from "@/service/about-me";
import EmptyData from "@/components/EmptyData";

const aboutMe = {
  title: "About Me",
  description: "About Me",
};

const experience = {
  icon: "",
  title: "My Experience",
  description: "My Experience",
};

const education = {
  icon: "",
  title: "My Education",
  description: "My Education",
};

const skills = {
  title: "My Skills",
  description: "My Skills",
  info: [
    {
      icon: <FaHtml5 />,
      name: "HTML 5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS 3",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "React JS",
    },
    {
      icon: <FaNodeJs />,
      name: "Node JS",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next Js",
    },
    {
      icon: <SiVuedotjs />,
      name: "Vuew Js",
    },
    {
      icon: <SiPostgresql />,
      name: "Postgree SQL",
    },
    {
      icon: <SiSequelize />,
      name: "Sequelize (ORM)",
    },
  ],
};

const Resume = () => {
  // Query
  const getListExperienceData = useQuery({
    queryKey: ["getListExperience"],
    queryFn: getListExperience,
    keepPreviousData: true,
  });

  const getListEducationData = useQuery({
    queryKey: ["getListEducation"],
    queryFn: getListEducation,
    keepPreviousData: true,
  });

  const getListAboutMeData = useQuery({
    queryKey: ["getListAboutMe"],
    queryFn: getListAboutMe,
    keepPreviousData: true,
  });

  return (
    <Fragment>
      <Header />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2.4,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs
            defaultValue="experience"
            className="flex flex-col xl:flex-row gap-[60px]"
          >
            <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About Me</TabsTrigger>
            </TabsList>

            <div className="min-h-[70vh] w-full">
              <TabsContent value="experience" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {experience.description}
                  </p>
                  {getListExperienceData?.data?.data?.length > 0 ? (
                    <div className="h-[400px]">
                      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                        {getListExperienceData?.data?.data?.map(
                          (items, index) => {
                            return (
                              <li
                                key={index}
                                className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                              >
                                <span className="text-accent">
                                  {items.duration}
                                </span>
                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                  {items.position}
                                </h3>
                                <div className="flex items-center gap-3">
                                  <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                  <p className="text-white/60">
                                    {items.company}
                                  </p>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  ) : (
                    <EmptyData text="Experience Still Empty" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="education" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{education.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {education.description}
                  </p>
                  {getListEducationData?.data?.data?.length > 0 ? (
                    <div className="h-[400px]">
                      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                        {getListEducationData?.data?.data?.map(
                          (items, index) => {
                            return (
                              <li
                                key={index}
                                className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                              >
                                <span className="text-accent">
                                  {items.duration}
                                </span>
                                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                                  {items.degree}
                                </h3>
                                <div className="flex items-center gap-3">
                                  <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                  <p className="text-white/60">
                                    {items.institution}
                                  </p>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  ) : (
                    <EmptyData text="Education Still Empty" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="w-full h-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <div className="flex flex-col gap-[30px]">
                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                      {skills.description}
                    </p>
                  </div>

                  <div className="h-[400px]">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                      {skills.info.map((items, index) => {
                        return (
                          <li key={index}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                  <div className="text-6xl group-hover:text-accent transition-all duration-500">
                                    {items.icon}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="capitalize">{items.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="about"
                className="w-full text-center xl:text-left"
              >
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{aboutMe.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {aboutMe.description}
                  </p>
                  <div className="h-[400px]">
                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 gap-x-6 max-w-[620px] mx-auto xl:mx-0">
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Name</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.name}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Phone</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.phone}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Experience</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.experience}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Nationality</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.nationality}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Email</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.email}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Freelance</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.freelance
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </li>
                      <li className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">Languages</span>
                        <span className="text-xl">
                          {getListAboutMeData?.data?.data?.languages.length > 0
                            ? getListAboutMeData?.data?.data?.languages.map(
                                (items, index) => (
                                  <span key={index}>
                                    {index !==
                                    getListAboutMeData?.data?.data?.languages
                                      .length -
                                      1
                                      ? `${items}, `
                                      : items}
                                  </span>
                                )
                              )
                            : "-"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Resume;
