import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const roles = ["ADMIN", "USER"];
  const roleValue = table.getColumn("role")?.getFilterValue() as
    | string
    | undefined;
  const roleLabel =
    roleValue === "ADMIN" ? "Admin" : roleValue === "USER" ? "User" : "All";

  const statusOptions = [
    { label: "Banned", value: "true" },
    { label: "Active", value: "false" },
  ];
  const statusValue = table.getColumn("status")?.getFilterValue() as
    | string
    | undefined;
  const statusLabel =
    statusValue === "true"
      ? "Banned"
      : statusValue === "false"
        ? "Active"
        : "All";

  return (
    <section>
      <div className="pb-4 sm:flex sm:items-center sm:justify-between">
        <Input
          placeholder="Filter name..."
          defaultValue={
            (table.getColumn("name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm max-sm:mb-3"
        />
        <div className="space-y-2.5 space-x-2.5 justify-self-end max-sm:w-full sm:space-x-3">
          {/* Role Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <>
                  Role: {roleLabel}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={!table.getColumn("role")?.getFilterValue()}
                onCheckedChange={() =>
                  table.getColumn("role")?.setFilterValue(undefined)
                }
              >
                All
              </DropdownMenuCheckboxItem>
              {roles.map((role) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={table.getColumn("role")?.getFilterValue() === role}
                  onCheckedChange={() =>
                    table.getColumn("role")?.setFilterValue(role)
                  }
                >
                  {role === "ADMIN" ? "Admin" : "User"}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <>
                  Status: {statusLabel}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                checked={!table.getColumn("status")?.getFilterValue()}
                onCheckedChange={() =>
                  table.getColumn("status")?.setFilterValue(undefined)
                }
              >
                All
              </DropdownMenuCheckboxItem>
              {statusOptions.map((s) => (
                <DropdownMenuCheckboxItem
                  key={s.value}
                  checked={
                    table.getColumn("status")?.getFilterValue() === s.value
                  }
                  onCheckedChange={() =>
                    table.getColumn("status")?.setFilterValue(s.value)
                  }
                >
                  {s.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Column Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="pb-5">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
        <div className="flex items-center justify-end space-x-2 px-3 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
