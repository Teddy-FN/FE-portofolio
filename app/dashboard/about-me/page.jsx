/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

// Components
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
import { Switch } from "@/components/ui/switch";
import { nationality } from "@/service/nationality";

const page = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Query
  const natinaolityData = useQuery({
    queryKey: ["nationality"],
    queryFn: nationality,
  });

  console.log("natinaolityData =>", natinaolityData);

  const formSchema = z.object({
    image: z.union([
      z.instanceof(File).refine((file) => file.size > 0, "Image is required"),
      z.string().min(1, "Image URL is required").optional(),
    ]),
    name: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    experience: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    email: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
    nationality: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
    languages: z.string().min(2, {
      message:
        "Enter Price Minimum 2 Character Price Product Must Number And Not Alphabet",
    }),
    freelance: z.boolean(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      image: "",
      name: "",
      experience: "",
      email: "",
      nationality: "",
      languages: "",
      freelance: true,
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

  const handleResetImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">About Me Page</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 bg-[#272729] rounded-xl"
          >
            <div className="col-span-1 lg:col-span-2">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Photo</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:cursor-pointer file:px-4 file:rounded-lg file:border-none file:bg-blue-700 file:text-white hover:file:bg-blue-600 file:h-full p-0 h-10 w-full"
                      placeholder="imageName"
                    />

                    {form.formState.errors.image && (
                      <FormMessage>
                        {form.formState.errors.image.message}
                      </FormMessage>
                    )}

                    {imagePreview && (
                      <div className="mt-4 relative flex justify-center items-center w-full lg:w-1/2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-auto border-2 border-gray-300 rounded-md object-contain"
                        />
                        <button
                          type="button"
                          onClick={handleResetImage}
                          className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-1"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Name</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Name Product"
                      maxLength={30}
                      className="w-full"
                    />
                    {form.formState.errors.name && (
                      <FormMessage>{form.formState.errors.name}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Email</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter Name Product"
                      maxLength={30}
                      className="w-full"
                    />
                    {form.formState.errors.email && (
                      <FormMessage>{form.formState.errors.email}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Experience</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Experience Product"
                      onInput={handleInput}
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
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="freelance"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="mb-4">
                      <FormLabel className="text-base">Freelance</FormLabel>
                    </div>
                    <div className="flex items-center gap-6 mb-4">
                      <p>No</p>
                      <Switch
                        name={field.name}
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={(val) => {
                          if (!val) {
                            form.setValue("subCategory", []);
                          }
                          field.onChange(val);
                        }}
                      />
                      <p>Yes</p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Nationality</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter Name Product"
                      maxLength={30}
                      className="w-full"
                    />
                    {form.formState.errors.nationality && (
                      <FormMessage>
                        {form.formState.errors.nationality}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Languages</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter Name Product"
                      maxLength={30}
                      className="w-full"
                    />
                    {form.formState.errors.languages && (
                      <FormMessage>
                        {form.formState.errors.languages}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="col-span-3 lg:col-span-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="mb-4 flex items-center gap-2">
                        <FormLabel className="text-base">Category</FormLabel>
                      </div>
                      <div>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              disabled={allCategory.isLoading}
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {field.value
                                ? allCategory?.data?.data?.find(
                                    (location) => location.id === field.value
                                  )?.name
                                : "Select Category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search Category" />
                              <CommandList>
                                <CommandEmpty>No Category found.</CommandEmpty>
                                <CommandGroup>
                                  {allCategory?.data?.data?.map((location) => {
                                    return (
                                      <CommandItem
                                        key={location.name}
                                        value={location.id}
                                        onSelect={() => {
                                          field.onChange(location.id);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === location.id
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {location.name}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {form.formState.errors.parentCategory && (
                        <FormMessage>
                          {form.formState.errors.parentCategory}
                        </FormMessage>
                      )}
                    </FormItem>
                  );
                }}
              />
            </div> */}

            <div className="col-span-1 lg:col-span-2">
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
