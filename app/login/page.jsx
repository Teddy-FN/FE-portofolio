"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Icons
import { LuAsterisk } from "react-icons/lu";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

// Components
import { useLoading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Service
import { login } from "@/service/auth";

const Register = () => {
  const { setActive } = useLoading();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    userName: z.string().min(2, {
      message: "User Name / Email Cannot Empty.",
    }),
    password: z.string().min(2, {
      message: "Password Cannot Empty.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const mutateLogin = useMutation({
    mutationFn: login,
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: (data) => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Login!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        if (typeof window !== "undefined") {
          router.push("/dashboard");
          window.sessionStorage.setItem("data", JSON.stringify(data));
        }
      }, 2000);
    },
    onError: (err) => {
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err.message,
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
      }, 2000);
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    // Append other fields
    formData.append("userName", values.userName);
    formData.append("password", values.password);
    mutateLogin.mutate(formData);
  };

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
      className="min-h-screen flex items-center justify-center py-12 xl:py-0"
    >
      <div className="flex flex-col gap-6 p-10 bg-[#272729] rounded-xl mx-auto w-3/4 md:w-2/4">
        <h3 className="text-4xl text-accent text-center">Login</h3>

        {/* Input */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 bg-[#272729] rounded-xl"
          >
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">
                        User Name / Email
                      </FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Name Project"
                      maxLength={30}
                      className="w-full"
                    />
                    {form.formState.errors.userName && (
                      <FormMessage>
                        {form.formState.errors.userName}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Password</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="Enter Password"
                        className="w-full"
                      />
                      <div className="absolute top-[24%] right-[4%] z-30">
                        {showPassword ? (
                          <PiEyeBold
                            color="#fff"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <PiEyeClosedBold
                            color="#fff"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </div>
                    </div>
                    {form.formState.errors.password && (
                      <FormMessage>
                        {form.formState.errors.password}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <Button size="sm" className="max-w-full col-span-1" type="submit">
              Login
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`text-base capitalize flex items-center gap-4 text-accent hover:text-white transition-all`}
          >
            See My Portofolio
          </Link>
          <Link
            href="/register"
            className={`text-base capitalize flex items-center gap-4 text-accent hover:text-white transition-all`}
          >
            Register
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
