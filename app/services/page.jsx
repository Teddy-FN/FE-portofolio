"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

// Icons
import { BsArrowDownRight } from "react-icons/bs";

// Component
import Header from "@/components/Header";

// Service
import { service } from "@/service/service";

const Services = () => {
  // Query
  const getServiceData = useQuery({
    queryKey: ["service"],
    queryFn: service,
  });

  return (
    <Fragment>
      <Header />
      <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
        <div className="container mx-auto">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                delay: 2.4,
                duration: 0,
                ease: "easeIn",
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
          >
            {getServiceData?.data?.map((items, index) => {
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col justify-center gap-6 group"
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                      {items.num}
                    </div>
                    <Link
                      href={items.href}
                      className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                    >
                      <BsArrowDownRight className="text-primary text-3xl" />
                    </Link>
                  </div>
                  {/* Heading Title */}
                  <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                    {items.title}
                  </h2>

                  <p className="text-white/60">{items.description}</p>

                  <div className="border-b border-white/20 w-full"></div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </Fragment>
  );
};

export default Services;
