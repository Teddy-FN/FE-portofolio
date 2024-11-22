/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useMemo } from "react";
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
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { nationality } from "@/service/nationality";

const page = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Query
  const nationalityData = useQuery({
    queryKey: ["nationality"],
    queryFn: nationality,
  });

  console.log("nationalityData =>", nationalityData);

  // Sort nationality data once for reuse
  const sortedNationalities = useMemo(() => {
    return nationalityData?.data?.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }, [nationalityData]);

  const formSchema = z.object({
    image: z.union([
      z.instanceof(File).refine((file) => file.size > 0, "Image is required"),
      z.string().min(1, "Image URL is required").optional(),
    ]),
    name: z.string().min(4, "Enter a name with at least 4 characters."),
    experience: z.string().min(4, "Enter an experience description (min 4)."),
    email: z.string().email("Enter a valid email."),
    nationality: z.string().nonempty("Select a nationality."),
    languages: z.array(z.string()).min(1, "Select at least one language."),
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
              {/* nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            {...field}
                            placeholder="Select nationality"
                            readOnly
                            className="w-full text-left cursor-pointer"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Nationality</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          {sortedNationalities?.map((item, index) => (
                            <DropdownMenuRadioItem
                              key={index}
                              value={item.name.common}
                            >
                              {item.flag} {item.name.common}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.nationality && (
                      <FormMessage>
                        {form.formState.errors.nationality.message}
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
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            value={
                              Array.isArray(field.value)
                                ? field.value.join(", ")
                                : ""
                            }
                            readOnly
                            placeholder="Select languages"
                            className="w-full text-left cursor-pointer"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Languages</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {nationalityData?.data
                          ?.sort((a, b) =>
                            a.name.common.localeCompare(b.name.common)
                          )
                          ?.map((item, index) => {
                            const isSelected =
                              Array.isArray(field.value) &&
                              field.value.includes(item.name.common);
                            return (
                              <DropdownMenuCheckboxItem
                                key={index}
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  const updatedLanguages = checked
                                    ? [...(field.value || []), item.name.common]
                                    : (field.value || []).filter(
                                        (lang) => lang !== item.name.common
                                      );
                                  field.onChange(updatedLanguages);
                                }}
                                className="flex items-center gap-5"
                              >
                                <p>{item?.flag || "-"}</p>
                                <p>{item?.name?.common}</p>
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.languages && (
                      <FormMessage>
                        {form.formState.errors.languages.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center justify-between">
                <Button size="sm" className="max-w-full" type="button">
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
