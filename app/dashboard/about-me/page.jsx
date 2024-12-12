/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { LuAsterisk } from "react-icons/lu";

// Components
import { useLoading } from "@/components/Loading";
import { useToast } from "@/hooks/use-toast";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

// Utils
import { generateLinkImageFromGoogleDrive } from "@/utils/generateImageGoogleDrive";

// Service
import { getListAboutMe, postAboutMe, putAboutMe } from "@/service/about-me";
import { nationality } from "@/service/nationality";

const page = () => {
  const { toast } = useToast();
  const { setActive } = useLoading();
  const geAboutMeData = useQuery({
    queryKey: ["getListAboutMe"],
    queryFn: getListAboutMe,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Query
  const nationalityData = useQuery({
    queryKey: ["nationality"],
    queryFn: nationality,
  });

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
    experience: z.string().min(1, "Enter an experience description (min 4)."),
    email: z.string().email("Enter a valid email."),
    phoneNumber: z.string().min(4, "Enter a name with at least 4 characters."),
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
      phoneNumber: "",
      address: "",
      experience: "",
      email: "",
      nationality: "",
      languages: [],
      freelance: true,
    },
  });

  useMemo(() => {
    if (geAboutMeData.data && geAboutMeData.isSuccess) {
      form.setValue("name", geAboutMeData?.data?.data?.name);
      form.setValue(
        "experience",
        Number(geAboutMeData?.data?.data?.experience || 0)
      );
      form.setValue("email", geAboutMeData?.data?.data?.email);
      form.setValue("phoneNumber", geAboutMeData?.data?.data?.phoneNumber);
      form.setValue("address", geAboutMeData?.data?.data?.address);
      form.setValue("nationality", geAboutMeData?.data?.data?.nationality);
      form.setValue("languages", geAboutMeData?.data?.data?.languages);
      form.setValue("freelance", geAboutMeData?.data?.data?.freelance);
      if (geAboutMeData?.data?.data?.photo) {
        form.setValue("image", geAboutMeData?.data?.data?.photo);

        const linkImage = generateLinkImageFromGoogleDrive(
          geAboutMeData?.data?.data?.photo
        );
        setImagePreview(linkImage);
      }
    }
  }, [geAboutMeData.data, geAboutMeData.isSuccess]);

  const mutateAddAboutMe = useMutation({
    mutationFn: postAboutMe,
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Add New About Me!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard";
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

  const mutateEditAboutMe = useMutation({
    mutationFn: putAboutMe,
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Edit About Me!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard";
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
    console.log("values =>", values);

    const formData = new FormData();

    // Append other fields
    formData.append("name", values.name);
    formData.append("experience", values.experience);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("nationality", values.nationality);
    formData.append("languages", values.languages);
    formData.append("freelance", values.freelance);
    formData.append("createdBy", "Teddy Ferdian"); // Assuming you need this as well

    // Use mutate function to send the formData
    if (geAboutMeData?.data?.id) {
      if (values.image instanceof File) {
        formData.append("image", values.image);
        formData.append("modifiedBy", "Teddy Ferdian");
      } else {
        formData.append("image", values.image);
      }
      formData.append("id", state.data.id);
      mutateEditAboutMe.mutate(formData);
    } else {
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      console.log("HELLO =>", formData.get("image"));
      mutateAddAboutMe.mutate(formData);
    }
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
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">About Me Page</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Me Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:cursor-pointer file:px-4 file:rounded-lg file:border-none file:bg-blue-700 file:text-white hover:file:bg-blue-600 file:h-full p-0 h-10 w-full"
                      placeholder="imageName"
                      name="image"
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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Freelance</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Phone Number</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Phone Number"
                      onInput={handleInput}
                      className="w-full"
                    />
                    {form.formState.errors.phoneNumber && (
                      <FormMessage>
                        {form.formState.errors.phoneNumber}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Address</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Address"
                      className="w-full"
                    />
                    {form.formState.errors.address && (
                      <FormMessage>{form.formState.errors.address}</FormMessage>
                    )}
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
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Nationality</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
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
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                  {geAboutMeData?.data?.data?.id ? "Edit" : "Save"}
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
