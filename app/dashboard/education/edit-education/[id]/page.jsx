/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLoading } from "@/components/Loading";
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
import {
  educationDegree,
  getEducationById,
  putEducation,
} from "@/service/education";

const page = () => {
  const { setActive } = useLoading();
  const params = useParams();
  const { toast } = useToast();

  const { id } = params;
  // Query
  const yearListData = useQuery({
    queryKey: ["yearList"],
    queryFn: yearList,
  });

  const educationDegreeData = useQuery({
    queryKey: ["educationDegree"],
    queryFn: educationDegree,
  });

  const getDataEducationById = useQuery({
    queryKey: ["getEducationById", id],
    queryFn: () => getEducationById({ id }),
    keepPreviousData: true,
  });

  const mutateEditEducation = useMutation({
    mutationFn: (payload) =>
      putEducation({
        id: id,
        body: payload,
      }),
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Edit Education!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard/education";
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

  const currDate = new Date().getFullYear();

  const formSchema = z.object({
    start: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    end: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    education: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
    degree: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      start: "" || currDate,
      end: "" || currDate,
      education: "",
      degree: "",
    },
  });

  useMemo(() => {
    if (getDataEducationById.data) {
      form.setValue(
        "end",
        getDataEducationById?.data?.data?.endDate?.toString()
      );
      form.setValue(
        "start",
        getDataEducationById?.data?.data?.startDate?.toString()
      );
      form.setValue("education", getDataEducationById?.data?.data?.institution);
      form.setValue("degree", getDataEducationById?.data?.data?.degree);
    }
  }, [getDataEducationById.data]);

  const onSubmit = (values) => {
    const formData = new FormData();
    // Append other fields
    formData.append("start", values.start);
    formData.append("end", values.end);
    formData.append("education", values.education);
    formData.append("degree", values.degree);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditEducation.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Edit Education Page</h1>
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
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
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
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
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
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Education</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Experience Product"
                      className="w-full"
                    />
                    {form.formState.errors.experience && (
                      <FormMessage>
                        {form.formState.errors.experience}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Degree</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            {...field}
                            placeholder="Degree"
                            maxLength={30}
                            className="w-full text-left"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Degree</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field?.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          {educationDegreeData?.data?.map((items, index) => {
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
                    {form.formState.errors.degree && (
                      <FormMessage>{form.formState.errors.degree}</FormMessage>
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
