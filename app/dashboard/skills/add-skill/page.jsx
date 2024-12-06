/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";
import {
  Form,
  // FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { postSkills } from "@/service/skills";

const page = () => {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(4, {
      message: "Enter Company Minimum 4 Character & Max 255 Character.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const mutateAddSkills = useMutation({
    mutationFn: postSkills,
    onMutate: () => {
      // setActive(true, null)
    },
    onSuccess: () => {
      // setActive(false, "success");
      toast({
        variant: "success",
        title: "Success Add New Skills!",
      });
      window.location.href = "/dashboard/skills";
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    },
  });

  const onSubmit = (values) => {
    console.log("values =>", values);

    const formData = new FormData();
    // Append other fields
    formData.append("name", values.name);
    formData.append("createdBy", "Teddy Ferdian");
    mutateAddSkills.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Add Skill Page</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-8 p-10 bg-[#272729] rounded-xl"
          >
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Name Skill</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Name Skill"
                      className="w-full"
                    />
                    {form.formState.errors.name && (
                      <FormMessage>{form.formState.errors.name}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center justify-between">
                <Button size="sm" className="max-w-full">
                  Cancel
                </Button>
                <Button size="sm" className="max-w-full" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default page;
