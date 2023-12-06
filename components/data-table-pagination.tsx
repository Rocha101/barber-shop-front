import { useState } from "react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: {
    page: number;
    size: number;
  };
  setPagination?: React.Dispatch<
    React.SetStateAction<{
      page: number;
      size: number;
    }>
  >;
}

export function DataTablePagination<TData>({
  table,
  pagination,
  setPagination,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between overflow-auto px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="hidden items-center space-x-2 md:flex">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: any) => {
              table.setPageSize(Number(value));
              setPagination &&
                setPagination((prev) => ({ ...prev, size: Number(value) }));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              setPagination && setPagination((prev) => ({ ...prev, page: 0 }));
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Vá para a primeira pág.</span>
            <AiOutlineDoubleLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
              setPagination &&
                pagination &&
                setPagination((prev) => ({
                  ...prev,
                  page: pagination?.page - 1,
                }));
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Vá para a ant.</span>
            <AiOutlineLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
              setPagination &&
                pagination &&
                setPagination((prev) => ({
                  ...prev,
                  page: pagination?.page + 1,
                }));
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Vá para a próx.</span>
            <AiOutlineRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              setPagination &&
                setPagination((prev) => ({
                  ...prev,
                  page: table.getPageCount(),
                }));
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Vá para a ult.</span>
            <AiOutlineDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
