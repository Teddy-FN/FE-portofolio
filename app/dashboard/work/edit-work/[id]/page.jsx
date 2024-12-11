/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Components
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
import { Separator } from "@/components/ui/separator";
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
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import { getProjectById, putProject } from "@/service/work";

// Utils
import { generateLinkImageFromGoogleDrive } from "@/utils/generateImageGoogleDrive";
import { getListServiceInputWork } from "@/service/service";
import { getListSkilsInputWork } from "@/service/skills";

const userInfoSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  url: z.string().min(1, "URL cannot be empty"),
});

const page = () => {
  const { setActive } = useLoading();
  const { toast } = useToast();
  const params = useParams();
  const [imagePreview, setImagePreview] = useState(null);

  const { id } = params;

  const getDataWorkById = useQuery({
    queryKey: ["getProjectById"],
    queryFn: () => getProjectById({ id }),
    keepPreviousData: true,
  });

  const formSchema = z.object({
    image: z.union([
      z.instanceof(File).refine((file) => file.size > 0, "Image is required"),
      z.string().min(1, "Image URL is required").optional(),
    ]),
    title: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    description: z.string().min(4, {
      message: "Enter Name Product Minimum Character 4 and max character 30.",
    }),
    stack: z.array(z.string()).min(1, "Select at least one language."),
    live: z.string().min(4, {
      message: "Enter Description Minimum 4 Character & Max 255 Character.",
    }),
    category: z.string().min(4, {
      message: "Enter Category",
    }),
    github: z
      .array(userInfoSchema)
      .refine(
        (val, ctx) => {
          if (val.length === 0) {
            return false;
          }
          return true;
        },
        {
          message:
            "At least one option must be added if 'Adding Option' is enabled.",
        }
      )
      .refine(
        (val) =>
          val.every(
            (item) => item.name.trim() !== "" && item.url.trim() !== ""
          ),
        {
          message: "Name & URL must not be empty.",
        }
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      image: "",
      title: "",
      description: "",
      stack: "",
      live: "",
      category: "",
      github: [
        {
          name: "",
          url: "",
        },
      ],
    },
  });

  useMemo(() => {
    if (getDataWorkById.data && getDataWorkById.isSuccess) {
      form.setValue("title", getDataWorkById?.data?.data?.title);
      form.setValue("description", getDataWorkById?.data?.data?.description);
      form.setValue("stack", getDataWorkById?.data?.data?.stack);
      form.setValue("live", getDataWorkById?.data?.data?.live);
      form.setValue("category", getDataWorkById?.data?.data?.category);
      form.setValue("image", getDataWorkById?.data?.data?.image);

      const dataGithub = getDataWorkById?.data?.data?.github
        ? JSON.parse(getDataWorkById?.data?.data?.github)
        : [];
      form.reset({
        ...form.getValues(),
        github: dataGithub,
      });

      if (getDataWorkById?.data?.data?.img) {
        form.setValue("image", getDataWorkById?.data?.data?.img);

        const linkImage = generateLinkImageFromGoogleDrive(
          getDataWorkById?.data?.data?.img
        );
        setImagePreview(linkImage);
      }
    }
  }, [getDataWorkById.data, getDataWorkById.isSuccess]);

  const { fields, append, remove, update } = useFieldArray({
    name: "github",
    control: form.control,
  });

  const listService = useQuery({
    queryKey: ["getListServiceInputWork"],
    queryFn: getListServiceInputWork,
  });

  const listSkills = useQuery({
    queryKey: ["getListSkilsInputWork"],
    queryFn: getListSkilsInputWork,
  });

  const mutateEditProject = useMutation({
    mutationFn: (payload) =>
      putProject({
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
          title: "Success Edit Work!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        window.location.href = "/dashboard/work";
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
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("live", values.live);
    formData.append("stack", values.stack);
    formData.append("github", JSON.stringify(values.github));
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("createdBy", "Teddy Ferdian");
    formData.append("modifiedBy", "Teddy Ferdian");
    mutateEditProject.mutate(formData);
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

  const ADDING_OPTION = useMemo(() => {
    console.log('form.getValues("github") =>', form.getValues("github"));
    console.log("fields =>", fields);

    if (form.getValues("github")) {
      return (
        <div className="col-span-2">
          {fields?.map((items, index) => {
            const numb = index + 1;
            console.log("ITEMS =>", items);

            return (
              <div key={index}>
                <Separator />
                <div
                  key={index}
                  className="flex py-6 items-start gap-6 justify-between relative"
                >
                  <div className="flex-1">
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Name Github {numb}
                        </FormLabel>
                      </div>
                      <Input
                        type="text"
                        {...form.register(`github.${index}.name`, {
                          onChange: (e) => {
                            const value = e.target.value;

                            // Set the value in the form
                            form.setValue(`github.${index}.name`, value);

                            // If the name length is greater than 1, clear errors for this field
                            if (value.length > 1) {
                              form.clearErrors(`github.${index}.name`);
                            } else {
                              form.trigger(`github.${index}.name`);
                            }
                          },
                          validate: (value) => {
                            if (value === "") {
                              return "Name cannot be empty";
                            }
                            return true;
                          },
                        })}
                        defaultValue={items.name}
                        placeholder="Enter Name Name"
                        className="w-full"
                      />
                      {form.formState.errors?.github?.[index]?.name && (
                        <FormMessage>
                          {form.formState.errors?.github?.[index]?.name.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  </div>
                  <div className="flex-1">
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          URL Github {numb}
                        </FormLabel>
                      </div>
                      <Input
                        type="text"
                        {...form.register(`github.${index}.url`, {
                          onChange: (e) => {
                            const value = e.target.value;

                            // Set the value in the form
                            form.setValue(`github.${index}.url`, value);

                            // If the name length is greater than 1, clear errors for this field
                            if (value.length > 1) {
                              form.clearErrors(`github.${index}.url`);
                            } else {
                              form.trigger(`github.${index}.url`);
                            }
                          },
                          validate: (value) => {
                            if (value === "") {
                              return "Url Name cannot be empty";
                            }
                            return true;
                          },
                        })}
                        defaultValue={items.url}
                        placeholder="Enter Name URL"
                        className="w-full"
                      />
                      {form.formState.errors?.github?.[index]?.url && (
                        <FormMessage>
                          {form.formState.errors?.github?.[index]?.url.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  </div>
                  {/* Delete on Resolution Table - Desktop */}
                  <div
                    className={`justify-end self-center ${
                      form.formState.errors?.github?.[index]?.name ||
                      form.formState.errors?.github?.[index]?.url
                        ? "mt-[18px]"
                        : "mt-12"
                    }  hidden md:flex`}
                    onClick={() => {
                      if (fields?.length === 1) {
                        form.setValue("github", []);
                      } else {
                        remove(index);
                      }
                    }}
                  >
                    <Button
                      variant="ghost"
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <FiTrash className="h-4 w-4" />
                      <p>Delete</p>
                    </Button>
                  </div>

                  {/* Delete on Mobile */}
                  <div
                    className="absolute right-1 top-1 md:hidden"
                    onClick={() => {
                      if (fields?.length === 1) {
                        form.setValue("github", []);
                      } else {
                        remove(index);
                      }
                    }}
                  >
                    <Button
                      variant="ghost" // No background initially (ghost)
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 h-8 w-8 flex items-center justify-center transition-colors duration-200"
                    >
                      <FiTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }, [
    form.getValues("github"),
    form,
    fields,
    remove,
    update,
    form.formState.errors,
    form.register,
    form.trigger,
    form.clearErrors,
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Work / Project Page</h1>
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
                <Link href="/dashboard/work">Project / Work List</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Project / Work</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
                name="title"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Description</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Textarea
                      {...field}
                      type="text"
                      placeholder="Enter Name Product"
                      maxLength={30}
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

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="stack"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Stack</FormLabel>
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
                            placeholder="Select Stack"
                            className="w-full text-left cursor-pointer"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Stack</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {stack?.map((item, index) => {
                          const isSelected =
                            Array.isArray(field.value) &&
                            field.value.includes(item.name);
                          return (
                            <DropdownMenuCheckboxItem
                              key={index}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                let updatedStack;

                                // If checked, add the item to the array
                                if (checked) {
                                  updatedStack = [
                                    ...(field.value || []),
                                    item.name,
                                  ];
                                } else {
                                  // If unchecked, remove the item from the array
                                  updatedStack = (field.value || []).filter(
                                    (lang) => lang !== item.name
                                  );
                                }

                                // Update the field value
                                field.onChange(updatedStack);

                                // To handle the case where you might want to delete data from another context
                                // For example, if you are managing some state or doing an API call to update the data
                                if (!checked) {
                                  // Code to handle deleting the item from your data source
                                  // You can handle deletion here or trigger a separate function to delete data
                                  deleteItemFromData(item.name); // This would be a function to delete the item from data
                                }
                              }}
                              className="flex items-center gap-5"
                            >
                              <p>{item?.name}</p>
                            </DropdownMenuCheckboxItem>
                          );
                        })}
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
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="stack"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Stack</FormLabel>
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
                            placeholder="Select Stack"
                            className="w-full text-left cursor-pointer"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 h-60 overflow-scroll">
                        <DropdownMenuLabel>Stack</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {listSkills?.data?.map((item, index) => {
                          const isSelected =
                            Array.isArray(field.value) &&
                            field.value.includes(item.name);
                          return (
                            <DropdownMenuCheckboxItem
                              key={index}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const updatedStack = checked
                                  ? [...(field.value || []), item.name]
                                  : (field.value || []).filter(
                                      (lang) => lang !== item.name
                                    );
                                field.onChange(updatedStack);
                              }}
                              className="flex items-center gap-5"
                            >
                              <p>{item?.name}</p>
                            </DropdownMenuCheckboxItem>
                          );
                        })}
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
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Category</FormLabel>
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
                        <DropdownMenuLabel>Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          {listService?.data?.map((item, index) => (
                            <DropdownMenuRadioItem
                              key={index}
                              value={item.name}
                            >
                              {item?.name}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {form.formState.errors.category && (
                      <FormMessage>
                        {form.formState.errors.category.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="live"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4 flex items-center gap-2">
                      <FormLabel className="text-base">Live URL</FormLabel>
                      {/* <Asterisk className="w-4 h-4 text-destructive" /> */}
                    </div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter Experience Product"
                      className="w-full"
                    />
                    {form.formState.errors.live && (
                      <FormMessage>{form.formState.errors.live}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Form Adding Option */}
            {ADDING_OPTION}

            <div className="col-span-2 flex justify-center cursor-pointer">
              <div
                className="col-span-2 flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                onClick={() =>
                  append({
                    name: "",
                    url: "",
                  })
                }
              >
                <FiPlus className="h-5 w-5" />
                <span>Add Github URL</span>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
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
