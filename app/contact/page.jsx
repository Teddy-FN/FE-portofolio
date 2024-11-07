"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Fragment } from "react";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+62123124123",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "tedd.ferdy@gmail.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "INI ADDRESS",
  },
];

const Contact = () => {
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
            ease: "easeIn",
          },
        }}
        className="py-6"
      >
        <div className="container mx-auto">
          <div className="flex flex-col xl:flex-row gap-4">
            {/* Form */}
            <div className="flex flex-1 order-2 xl:order-none w-full">
              <form className="flex flex-col gap-6 p-10 bg-[#272729] rounded-xl w-full">
                <h3 className="text-4xl text-accent">Let's Work Together</h3>
                <p className="text-white/60">lorem</p>

                {/* Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input type="firstname" placeholder="First Name" />
                  <Input type="lastname" placeholder="Last Name" />
                  <Input type="email" placeholder="Email" />
                  <Input type="phone" placeholder="Phone Number" />
                </div>

                {/* Select */}
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select A Service</SelectLabel>
                      <SelectItem value="fe">FE Development</SelectItem>
                      <SelectItem value="be">BE Development</SelectItem>
                      <SelectItem value="fullstack">
                        Full Stack Development
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Textarea */}
                <Textarea
                  className="h-[200px]"
                  placeholder="Enter Your Message"
                />

                <Button size="sm" className="max-w-40">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
              <ul className="flex flex-col gap-10">
                {info.map((items, index) => {
                  return (
                    <li key={index} className="flex items-center gap-6">
                      <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                        <div className="text-[28px]">{items.icon}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white/60">{items.title}</p>
                        <h3 className="text-xl">{items.description}</h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </Fragment>
  );
};

export default Contact;
