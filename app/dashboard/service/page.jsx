/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  // FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";

const page = () => {
  const formSchema = z.object({
    title: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
    description: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    console.log("values =>", values);

    const formData = new FormData();
    // Append other fields
    formData.append("nameProduct", values.nameProduct);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("status", values.status);
    formData.append("price", values.price);
    formData.append("isOption", values.isOption);
    formData.append("option", values.subCategory);
    formData.append("store", cookie?.user?.store);
    formData.append("createdBy", cookie.user.userName); // Assuming you need this as well

    // // Use mutate function to send the formData
    // if (state?.data?.id) {
    //   if (values.image instanceof File) {
    //     formData.append("image", values.image);
    //     formData.append("modifiedBy", cookie.user.userName);
    //   } else {
    //     formData.append("image", values.image);
    //   }
    //   formData.append("id", state.data.id);
    //   mutateEditProduct.mutate(formData);
    // } else {
    //   if (values.image instanceof File) {
    //     formData.append("image", values.image);
    //   }
    //   console.log("HELLO =>", formData.get("image"));
    //   mutateAddProduct.mutate(formData);
    // }
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
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Title</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Experience Product"
                      className="w-full"
                    />
                    {form.formState.errors.title && (
                      <FormMessage>{form.formState.errors.title}</FormMessage>
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
                <Button size="sm" className="max-w-full">
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
