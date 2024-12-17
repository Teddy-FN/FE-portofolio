/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
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

import { getServiceById, putService } from "@/service/service";

const page = () => {
  const { setActive } = useLoading();
  const { toast } = useToast();
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
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Edit Service!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard/service";
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
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditService.mutate(formData);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">Service Page</h1>
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
                  <Link href="/dashboard/service">Service List</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Textarea
                      {...field}
                      type="text"
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
