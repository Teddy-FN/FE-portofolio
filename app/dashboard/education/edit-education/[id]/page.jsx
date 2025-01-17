/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, Fragment, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
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
import {
  educationDegree,
  getEducationById,
  putEducation,
  typeEducation,
  formalMajorList,
  nonFormalEducation,
} from "@/service/education";

const page = () => {
  const { setActive } = useLoading();
  const params = useParams();
  const { toast } = useToast();

  const { id } = params;

  // State
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const data = window.sessionStorage.getItem("data");
    console.log("DATA =>", data);

    if (data === null) {
      router.push("/login");
    } else {
      const formatData = JSON.parse(data);
      setDataUser(formatData?.user);
    }
  }, []);

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

  const educationTypeData = useQuery({
    queryKey: ["typeEducation"],
    queryFn: typeEducation,
  });

  const educationMajorData = useQuery({
    queryKey: ["formalMajorList"],
    queryFn: formalMajorList,
  });

  const educationNonFormalData = useQuery({
    queryKey: ["nonFormalEducation"],
    queryFn: nonFormalEducation,
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
      message: "Start Date Not Empty",
    }),
    end: z.string().min(4, {
      message: "End Date Not Empty",
    }),
    education: z.string().min(4, {
      message: "Enter Education Minimum 4 Character & Max 255 Character.",
    }),
    typeEducation: z.string().min(4, {
      message: "Enter Type Education Minimum 4 Character & Max 255 Character.",
    }),
    major: z
      .string()
      .optional()
      .refine((value) => value === "" || value.length >= 2, {
        message: "Enter Major Minimum 2 Characters if not empty.",
      }),
    degree: z
      .string()
      .optional()
      .refine((value) => value === "" || value.length >= 2, {
        message: "Enter Degree Minimum 2 Characters if not empty.",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      start: "" || currDate.toString(),
      end: "" || currDate.toString(),
      typeEducation: "",
      education: "",
      major: "",
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
      form.setValue("major", getDataEducationById?.data?.data?.major);
      form.setValue(
        "typeEducation",
        getDataEducationById?.data?.data?.typeEducation
      );
      form.setValue("degree", getDataEducationById?.data?.data?.degree);
    }
  }, [getDataEducationById.data]);

  const onSubmit = (values) => {
    const formData = new FormData();
    // Append other fields
    formData.append("start", values.start);
    formData.append("end", values.end);
    formData.append("typeEducation", values.typeEducation);
    formData.append("major", values.major);
    formData.append("education", values.education);
    formData.append("degree", values.degree);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditEducation.mutate(formData);
  };

  const MAJORING_LIST = useMemo(() => {
    if (form.watch("typeEducation") === "Primary education") {
      return (
        <Fragment>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4 flex items-center gap-2">
                    <FormLabel className="text-base">Degree</FormLabel>
                    <LuAsterisk className="w-4 h-4 text-red-600" />
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
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4 flex items-center gap-2">
                    <FormLabel className="text-base">Major</FormLabel>
                    <LuAsterisk className="w-4 h-4 text-red-600" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <Input
                          {...field}
                          placeholder="Major"
                          maxLength={30}
                          className="w-full text-left"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                      <DropdownMenuLabel>Major</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field?.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        {educationMajorData?.data?.data?.map((items, index) => {
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
        </Fragment>
      );
    }

    if (form.watch("typeEducation") === "No formal education") {
      return (
        <Fragment>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4 flex items-center gap-2">
                    <FormLabel className="text-base">
                      Type Non Formal Education
                    </FormLabel>
                    <LuAsterisk className="w-4 h-4 text-red-600" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <Input
                          {...field}
                          placeholder="Select Type Non Formal Education"
                          maxLength={30}
                          className="w-full text-left"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                      <DropdownMenuLabel>
                        Type Non Formal Education
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field?.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        {educationNonFormalData?.data?.map((items, index) => {
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
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4 flex items-center gap-2">
                    <FormLabel className="text-base">
                      Name Education (Non Formal Education)
                    </FormLabel>
                    <LuAsterisk className="w-4 h-4 text-red-600" />
                  </div>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Enter Name Education"
                    className="w-full"
                  />
                  {form.formState.errors.degree && (
                    <FormMessage>{form.formState.errors.degree}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
        </Fragment>
      );
    }

    return null;
  }, [
    form.watch("typeEducation"),
    form,
    educationDegreeData,
    educationMajorData,
    educationNonFormalData,
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">Edit Education Page</h1>
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
                  <Link href="/dashboard/education">Education List</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Education</BreadcrumbPage>
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
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Institute</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                name="typeEducation"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="mb-4 flex items-center gap-2">
                        <FormLabel className="text-base">
                          Type Education
                        </FormLabel>
                        <LuAsterisk className="w-4 h-4 text-red-600" />
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
                          <DropdownMenuLabel>Type Education</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={field?.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (
                                value ===
                                getDataEducationById?.data?.data?.typeEducation
                              ) {
                                form.setValue(
                                  "major",
                                  getDataEducationById?.data?.data?.major
                                );
                                form.setValue(
                                  "degree",
                                  getDataEducationById?.data?.data?.degree
                                );
                              } else {
                                form.setValue("major", "");
                                form.setValue("degree", "");
                              }
                            }}
                          >
                            {educationTypeData?.data?.map((items, index) => {
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
                      {form.formState.errors.typeEducation && (
                        <FormMessage>
                          {form.formState.errors.typeEducation}
                        </FormMessage>
                      )}
                    </FormItem>
                  );
                }}
              />
            </div>

            {MAJORING_LIST}

            <div className="col-span-2">
              <div className="flex items-center justify-between">
                <Button size="sm" className="max-w-full">
                  Cancel
                </Button>
                {dataUser?.userType !== "user" && (
                  <Button size="sm" className="max-w-full" type="submit">
                    Save
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default page;
