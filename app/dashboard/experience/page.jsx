/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useCallback, useMemo, Fragment } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLoading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";
import { Skeleton } from "@/components/ui/skeleton";
import { FiEdit, FiTrash } from "react-icons/fi";
import AbortController from "@/components/AbortController";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const limitsOptions = [10, 20, 50];

import { getListExperienceTable, deleteExperience } from "@/service/experience";

const page = () => {
  const { toast } = useToast();
  const { setActive } = useLoading();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const getListExperience = useQuery({
    queryKey: ["getListExperience", pagination.page, pagination.limit],
    queryFn: () =>
      getListExperienceTable({
        page: pagination.page,
        limit: pagination.limit,
      }),
  });

  const delExperience = useMutation({
    mutationFn: (payload) => deleteExperience({ id: payload?.id }),
    onMutate: () => {
      setActive(true, null);
    },
    onSuccess: () => {
      setTimeout(() => {
        toast({
          variant: "success",
          title: "Successfully Deleted Data Experience!",
        });
      }, 1000);
      setTimeout(() => {
        setActive(null, null);
        getListExperience.refetch();
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

  const updatePagination = useCallback(
    (updates) => {
      setPagination((prev) => ({
        ...prev,
        ...updates,
      }));
    },
    [setPagination]
  );

  const columns = [
    {
      accessorKey: "company",
      header: ({ column }) => {
        return (
          <div className="justify-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-center"
            >
              Company
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("company") || "-"}</div>
      ),
    },
    {
      accessorKey: "position",
      header: ({ column }) => {
        return (
          <div className="justify-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-center"
            >
              Position
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("position") || "-"}</div>
      ),
    },
    // {
    //   accessorKey: "description",
    //   header: ({ column }) => {
    //     return (
    //       <div className="justify-center flex">
    //         <Button
    //           variant="ghost"
    //           onClick={() =>
    //             column.toggleSorting(column.getIsSorted() === "asc")
    //           }
    //           className="text-center"
    //         >
    //           Description
    //           {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
    //         </Button>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="text-center">{row.getValue("description") || "-"}</div>
    //   ),
    // },
    {
      accessorKey: "startDate",
      header: ({ column }) => {
        return (
          <div className="justify-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-center"
            >
              Start Date
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("startDate") || "-"}</div>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => {
        return (
          <div className="justify-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-center"
            >
              End Date
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("endDate") || "-"}</div>
      ),
    },

    {
      accessorKey: "createdBy",
      header: ({ column }) => {
        return (
          <div className="justify-center flex">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Created By
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("createdBy") || "-"}</div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col justify-center gap-6">
            <Button
              variants="outline"
              className="bg-blue-500 text-white cursor-pointer flex items-center gap-6"
            >
              <Link
                href={{
                  pathname: `/dashboard/experience/edit-experience/${row.original.id}`,
                }}
                className={`text-xl capitalize flex items-center gap-4`}
              >
                <FiEdit className="text-xl" />
                <p>Edit</p>
              </Link>
            </Button>
            <Button
              variants="outline"
              className="bg-red-500 text-white cursor-pointer flex items-center gap-6"
              onClick={() => delExperience.mutate({ id: row.original.id })}
            >
              <FiTrash className="text-xl" />
              <p>Delete</p>
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: getListExperience?.data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
  });

  const TABLES_DATA = useMemo(() => {
    if (getListExperience.isLoading) {
      return (
        <div className="flex flex-col gap-8">
          <Skeleton className="w-full h-96 rounded-md bg-pink-50/20" />
          <div className="flex justify-between items-center">
            <Skeleton className="w-20 h-10 rounded-md bg-pink-50/20" />
            <Skeleton className="w-20 h-10 rounded-md bg-pink-50/20" />
          </div>
        </div>
      );
    }

    if (getListExperience.isError) {
      return (
        <div className="h-screen">
          <AbortController refetch={() => getListExperience.refetch()} />
        </div>
      );
    }

    if (getListExperience.data && getListExperience.data.data?.length > 0) {
      return (
        <Fragment>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1">
              <label htmlFor="limit" className="whitespace-nowrap">
                Rows per page:
              </label>
              <select
                id="limit"
                value={pagination.limit}
                onChange={(e) =>
                  updatePagination({ limit: parseInt(e.target.value), page: 1 })
                }
                className="border rounded-md p-1 bg-transparent"
              >
                {limitsOptions.map((limitOption) => (
                  <option key={limitOption} value={limitOption}>
                    {limitOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <Button
                onClick={() => updatePagination({ page: pagination.page - 1 })}
                disabled={pagination.page === 1 || getListExperience.isFetching}
              >
                Previous
              </Button>
              <span>
                Page {pagination.page} of{" "}
                {getListExperience?.data?.meta?.totalPages || 1}
              </span>
              <Button
                onClick={() => updatePagination({ page: pagination.page + 1 })}
                disabled={
                  pagination.page >=
                    (getListExperience?.data?.meta?.totalPages || 1) ||
                  getListExperience.isFetching
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <div className="h-96 flex items-center justify-center bg-pink-50/20 rounded-md">
        <h1>No data available</h1>
      </div>
    );
  }, [getListExperience, table, columns, pagination]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex-col flex gap-4">
            <h1 className="text-2xl font-bold">Experience Page</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Experience Page</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Button>
            <Link
              href="/dashboard/experience/add-experience"
              className={`text-xl capitalize flex items-center gap-4`}
            >
              Add Experience
            </Link>
          </Button>
        </div>
        {TABLES_DATA}
      </div>
    </DashboardLayout>
  );
};

export default page;
