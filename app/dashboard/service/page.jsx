/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";

import { FiEdit, FiTrash } from "react-icons/fi";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import Link from "next/link";

const limitsOptions = [10, 20, 50];

import { getListTableService, deleteService } from "@/service/service";

const page = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterBy, setFilterBy] = useState({
    value: "name",
    name: "Name Category",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    statusCategory: "all",
  });

  const fetchListServiceTable = useCallback(() => {
    return getListTableService({
      page: pagination.page,
      limit: pagination.limit,
    });
  }, [pagination]);

  // QUERY
  const getServiceData = useQuery({
    queryKey: ["getListAboutMe", pagination.page, pagination.limit],
    queryFn: fetchListServiceTable,
    keepPreviousData: true, // Prevent refetch while changing pages
    refetchOnWindowFocus: false, // Avoid refetch on focus
  });

  const delService = useMutation({
    mutationFn: deleteService,
    onMutate: () => {
      // setActive(true, null)
    },
    onSuccess: () => {
      getServiceData.refetch();
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

  useEffect(() => {
    if (getServiceData.isSuccess) {
      console.log("Fetched data:", getServiceData.data);
    }
  }, [getServiceData.isSuccess, getServiceData.data]);

  const updatePagination = (updates) => {
    setPagination((prev) => ({ ...prev, ...updates }));
  };

  const columns = [
    {
      accessorKey: "name",
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
              Name
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("name") || "-"}</div>
      ),
    },
    {
      accessorKey: "description",
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
              Description
              {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("description") || "-"}</div>
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
                  pathname: `/dashboard/service/edit-service/${row.original.id}`,
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
              onClick={() => delService.mutate({ id: row.original.id })}
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
    data: getServiceData?.data?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Service Page</h1>
          <Button>
            <Link
              href="/dashboard/service/add-service"
              className={`text-xl capitalize flex items-center gap-4`}
            >
              Add Service
            </Link>
          </Button>
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 py-4">
          {/* Limit Selector */}
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

          {/* Page Navigation */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Button
              onClick={() => updatePagination({ page: pagination.page - 1 })}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <span>
              Page {pagination.page} of{" "}
              {getServiceData?.data?.meta?.totalPages || "0"}
            </span>
            <Button
              onClick={() => updatePagination({ page: pagination.page + 1 })}
              disabled={
                pagination.page === getServiceData?.data?.meta?.totalPages
              }
              // Disable next if no more pages
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
