/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState, useCallback, useMemo, Fragment } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardTemplate";

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
import Link from "next/link";

const limitsOptions = [10, 20, 50];
import { getListTableSkills, deleteSkills } from "@/service/skills";

const page = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // QUERY
  const getSkillData = useQuery({
    queryKey: ["getListTableSkills", pagination.page, pagination.limit],
    queryFn: () =>
      getListTableSkills({
        page: pagination.page,
        limit: pagination.limit,
      }),
  });

  const delExperience = useMutation({
    mutationFn: (payload) => deleteSkills(payload),
    onSuccess: () => {
      // Refetch data after successful deletion
      getSkillData.refetch();
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name") || "-"}</div>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => <div>{row.getValue("createdBy") || "-"}</div>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-center gap-6">
          <Button
            variants="outline"
            className="bg-blue-500 text-white cursor-pointer flex items-center gap-6 w-max"
          >
            <Link
              href={`/dashboard/experience/edit-experience/${row.original.id}`}
              className={`text-xl capitalize flex items-center gap-4`}
            >
              <FiEdit />
              Edit
            </Link>
          </Button>
          <Button
            variants="outline"
            className="bg-red-500 text-white cursor-pointer flex items-center gap-6 w-max"
            onClick={() => delExperience.mutate({ id: row.original.id })}
          >
            <FiTrash />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: getSkillData?.data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
  });

  const TABLES_DATA = useMemo(() => {
    if (getSkillData.isFetching && getSkillData.isLoading) {
      return <h1>LOADING</h1>;
    }

    if (getSkillData.isError) {
      return <AbortController refetch={() => getSkillData.refetch()} />;
    }

    if (getSkillData.data && getSkillData.isSuccess) {
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
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
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
                disabled={pagination.page === 1 || getSkillData.isFetching}
              >
                Previous
              </Button>
              <span>
                Page {pagination.page} of{" "}
                {getSkillData?.data?.meta?.totalPages || 1}
              </span>
              <Button
                onClick={() => updatePagination({ page: pagination.page + 1 })}
                disabled={
                  pagination.page >=
                    (getSkillData?.data?.meta?.totalPages || 1) ||
                  getSkillData.isFetching
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Fragment>
      );
    }
  }, [getSkillData, table]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Skills Page</h1>
          <Button>
            <Link href="/dashboard/skills/add-skill">Add Skills</Link>
          </Button>
        </div>
        {TABLES_DATA}
      </div>
    </DashboardLayout>
  );
};

export default page;
