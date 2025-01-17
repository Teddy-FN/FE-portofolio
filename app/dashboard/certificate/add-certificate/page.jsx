/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { LuAsterisk } from "react-icons/lu";

// Components
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
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { typeCertificate, postCertificate } from "@/service/certificate";

const page = () => {
  const { setActive } = useLoading();
  const { toast } = useToast();
  const router = useRouter();

  // State
  const [imagePreview, setImagePreview] = useState(null);
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

  const formSchema = z.object({
    image: z.union([
      z.instanceof(File).refine((file) => file.size > 0, "Image is required"),
      z.string().min(1, "Image URL is required").optional(),
    ]),
    type: z.string().min(4, {
      message: "Enter type Project Minimum Character 4 and max character 30.",
    }),
    description: z.string().min(4, {
      message: "Enter Description Minimum Character 4 and max character 30.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      image: "",
      type: "",
      description: "",
    },
  });

  const listTypeCertificate = useQuery({
    queryKey: ["typeCertificate"],
    queryFn: typeCertificate,
  });

  const mutateAddCertificate = useMutation({
    mutationFn: postCertificate,
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Add New Certificate!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        if (typeof window !== "undefined") {
          router.push("/dashboard/certificate");
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
    console.log("values =>", values);

    const formData = new FormData();
    // Append other fields
    formData.append("image", values.image);
    formData.append("type", values.type);
    formData.append("description", values.description);
    formData.append("createdBy", "Teddy Ferdian"); // Assuming you need this as well
    mutateAddCertificate.mutate(formData);
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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex-col flex gap-4">
          <h1 className="text-2xl font-bold">Certificate Page</h1>
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
                  <Link href="/dashboard/certificate">Certificate List</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Certificate</BreadcrumbPage>
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
                      <FormLabel className="text-base">
                        Certificate Image
                      </FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Description</FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <Textarea
                      {...field}
                      placeholder="Enter Description Certificate"
                      className="w-full"
                    />
                    {form.formState.errors.title && (
                      <FormMessage>{form.formState.errors.title}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">
                        Type Certificate
                      </FormLabel>
                      <LuAsterisk className="w-4 h-4 text-red-600" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div>
                          <Input
                            {...field}
                            placeholder="Select Category"
                            readOnly
                            className="w-full text-left cursor-pointer"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Type Certificate</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          {listTypeCertificate?.data?.map((item, index) => (
                            <DropdownMenuRadioItem
                              key={index}
                              value={item.value}
                            >
                              {item?.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.stack && (
                      <FormMessage>
                        {form.formState.errors.stack.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
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
