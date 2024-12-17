/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Link from "next/link";
import { LuAsterisk } from "react-icons/lu";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
import { useParams } from "next/navigation";
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

import { yearList, endDateExperience } from "@/service/year";
import { getExperienceById, putExperience } from "@/service/experience";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const page = () => {
  const { setActive } = useLoading();
  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const { id } = params;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const currDate = new Date().getFullYear();

  // Query
  const yearListData = useQuery({
    queryKey: ["yearList"],
    queryFn: yearList,
  });

  const endYearListData = useQuery({
    queryKey: ["endDateExperience"],
    queryFn: endDateExperience,
  });

  const getDataExperienceById = useQuery({
    queryKey: ["getExperienceById", id],
    queryFn: () => getExperienceById({ id }),
    keepPreviousData: true,
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
      position: "",
      description: "",
    },
  });

  useMemo(() => {
    if (getDataExperienceById.data) {
      form.setValue(
        "end",
        getDataExperienceById?.data?.data?.endDate?.toString()
      );
      form.setValue(
        "start",
        getDataExperienceById?.data?.data?.startDate?.toString()
      );
      form.setValue("placeWork", getDataExperienceById?.data?.data?.company);
      form.setValue("position", getDataExperienceById?.data?.data?.position);
      form.setValue(
        "description",
        getDataExperienceById?.data?.data?.description
      );
    }
  }, [getDataExperienceById.data]);

  const mutateEditExperience = useMutation({
    mutationFn: (payload) =>
      putExperience({
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
          title: "Success Edit Experience!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        if (typeof window !== "undefined") {
          router.push("/dashboard/experience");
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
    formData.append("id", id);
    formData.append("start", values.start);
    formData.append("end", values.end);
    formData.append("placeWork", values.placeWork);
    formData.append("position", values.position);
    formData.append("description", values.description);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditExperience.mutate(formData);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    const data = draftToHtml(convertToRaw(state.getCurrentContent()));
    form.setValue("description", data, { shouldValidate: true });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">Edit Experience Page</h1>
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
                <BreadcrumbPage>Edit Experience</BreadcrumbPage>
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
                          {endYearListData?.data?.map((items, index) => {
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
                render={() => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Description</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      editorClassName="bg-primary rounded-md min-h-96"
                      wrapperClassName="flex flex-col gap-0"
                      toolbarClassName="bg-blue-500"
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "list",
                          "textAlign",
                          "history",
                        ],
                        blockType: {
                          inDropdown: true,
                          options: [
                            "Normal",
                            "H1",
                            "H2",
                            "H3",
                            "H4",
                            "H5",
                            "H6",
                          ],
                          className:
                            "bg-gray-100 border border-gray-300 rounded-md text-gray-700",
                          dropdownClassName:
                            "bg-white border border-gray-300 shadow-md rounded-md",
                        },
                        fontSize: {
                          options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
                          className:
                            "bg-gray-100 border border-gray-300 rounded-md text-gray-700",
                          dropdownClassName:
                            "bg-white border border-gray-300 shadow-md rounded-md",
                        },
                      }}
                    />
                    {form.formState.errors.description && (
                      <FormMessage>
                        {form.formState.errors.description.message}
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
