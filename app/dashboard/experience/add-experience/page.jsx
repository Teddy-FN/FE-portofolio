/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { LuAsterisk } from "react-icons/lu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLoading } from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { yearList } from "@/service/year";

import { postExperience } from "@/service/experience";

const page = () => {
  const { setActive } = useLoading();
  const { toast } = useToast();
  const currDate = new Date().getFullYear();
  // Query
  const yearListData = useQuery({
    queryKey: ["yearList"],
    queryFn: yearList,
  });

  const mutateAddExperience = useMutation({
    mutationFn: postExperience,
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Add New Experience!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard/experience";
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

  const formSchema = z.object({
    start: z.string().min(4, {
      message: "Start Date Not Empty",
    }),
    end: z.string().min(4, {
      message: "End Date Not Empty",
    }),
    placeWork: z.string().min(4, {
      message: "Enter Company Minimum 4 Character & Max 255 Character.",
    }),
    position: z.string().min(4, {
      message: "Enter Position Minimum 4 Character & Max 255 Character.",
    }),
    description: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      start: "" || currDate.toString(),
      end: "" || currDate.toString(),
      placeWork: "",
      description: "",
      position: "",
    },
  });

  const onSubmit = (values) => {
    console.log("values =>", values);

    const formData = new FormData();
    // Append other fields
    formData.append("start", values.start);
    formData.append("end", values.end);
    formData.append("placeWork", values.placeWork);
    formData.append("position", values.position);
    formData.append("description", values.description);
    formData.append("createdBy", "Teddy Ferdian");
    mutateAddExperience.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">Experience Page</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/dashboard/experience">Experience List</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Experience</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-8 p-10 bg-[#272729] rounded-xl"
          >
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Start Date</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            {...field}
                            placeholder="Start Date"
                            maxLength={30}
                            className="w-full text-left"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Start Date</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field?.value}
                          onValueChange={(value) =>
                            field.onChange(value.toString())
                          }
                        >
                          {yearListData?.data?.map((items, index) => {
                            return (
                              <DropdownMenuRadioItem
                                value={items.value}
                                key={index}
                              >
                                {items.label}
                              </DropdownMenuRadioItem>
                            );
                          })}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.start && (
                      <FormMessage>{form.formState.errors.start}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">End Date</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            {...field}
                            placeholder="End Date"
                            className="w-full text-left"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>End Date</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field?.value}
                          onValueChange={(value) =>
                            field.onChange(value.toString())
                          }
                        >
                          {yearListData?.data?.map((items, index) => {
                            return (
                              <DropdownMenuRadioItem
                                value={items.value}
                                key={index}
                              >
                                {items.label}
                              </DropdownMenuRadioItem>
                            );
                          })}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.end && (
                      <FormMessage>{form.formState.errors.end}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="placeWork"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Company</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Company"
                      className="w-full"
                    />
                    {form.formState.errors.placeWork && (
                      <FormMessage>
                        {form.formState.errors.placeWork}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Position</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Company"
                      className="w-full"
                    />
                    {form.formState.errors.position && (
                      <FormMessage>
                        {form.formState.errors.position}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Description</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Textarea
                      type="text"
                      {...field}
                      placeholder="Enter Company"
                      className="w-full"
                    />
                    {form.formState.errors.description && (
                      <FormMessage>
                        {form.formState.errors.description}
                      </FormMessage>
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
