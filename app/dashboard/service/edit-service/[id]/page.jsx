/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";
import { useParams } from "next/navigation";
import {
  Form,
  // FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getServiceById, putService } from "@/service/service";

const page = () => {
  const params = useParams();

  const { id } = params;

  const getDataServiceById = useQuery({
    queryKey: ["getServiceById", id],
    queryFn: () => getServiceById({ id }),
    keepPreviousData: true,
  });

  const formSchema = z.object({
    name: z.string().min(4, {
      message: "Enter Name Minimum 4 Character & Max 255 Character.",
    }),
    description: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useMemo(() => {
    if (getDataServiceById.data) {
      form.setValue("name", getDataServiceById?.data?.data?.name);
      form.setValue("description", getDataServiceById?.data?.data?.description);
    }
  }, [getDataServiceById.data]);

  const mutateEditService = useMutation({
    mutationFn: (payload) =>
      putService({
        id: id,
        body: payload,
      }),
    onMutate: () => {
      // setActive(true, null)
    },
    onSuccess: () => {
      // setActive(false, "success");
      // toast.success("Success", {
      //   description: "Successfully added about me",
      // });
    },
    onError: (err) => {
      // setActive(false, "error");
      // toast.error("Error", {
      //   description: err.message,
      // });
    },
  });

  const onSubmit = (values) => {
    console.log("values =>", values);

    const formData = new FormData();
    // Append other fields
    formData.append("id", id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditService.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Service Page</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-8 p-10 bg-[#272729] rounded-xl"
          >
            <div className="col-span-2 lg:col-span-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Title</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Title Service"
                      className="w-full"
                    />
                    {form.formState.errors.name && (
                      <FormMessage>{form.formState.errors.name}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Description</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Experience Product"
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