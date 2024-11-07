"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  return (
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
      <form className="flex flex-col gap-6 p-10 bg-[#272729] rounded-xl mx-auto w-3/4 md:w-2/4">
        <h3 className="text-4xl text-accent text-center">Login</h3>

        {/* Input */}
        <div className="grid grid-cols-1 gap-6">
          <Input type="firstname" placeholder="First Name" />
          <Input type="password" placeholder="Password" />
        </div>

        <Button size="sm" className="max-w-full">
          Login
        </Button>
      </form>
    </motion.div>
  );
};

export default Register;
