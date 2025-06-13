import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import TableActions from "./TableActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  _id: string;
  name: string;
  price: number;
  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "shipped"
    | "cancelled";
  countInStock: number;
  images: { url: string; public_id: string }[];
  categories: string[];
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as { url: string }[];
      return (
        <div className="flex gap-2">
          {images.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`img-${i}`}
              className={`h-10 w-10 rounded object-cover ${
                i > 0 ? "hidden md:block" : ""
              }`}
              loading="lazy"
              decoding="async"
            />
          ))}
          {images.length > 3 && (
            <span className="hidden text-sm text-gray-500 md:block">
              +{images.length - 3}
            </span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Payment["status"];

      const statusColor = {
        pending: "bg-yellow-100 text-black",
        processing: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
        shipped: "bg-purple-100 text-purple-800",
        cancelled: "bg-gray-200 text-gray-800",
      };

      return (
        <div className="text-center">
          <span
            className={cn(
              "rounded px-2 py-1 text-xs font-semibold capitalize",
              statusColor[status],
            )}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "categories",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categories
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const categories = row.getValue("categories") as string[];
      return (
        <div className="text-center">
          {categories.map((cat, i) => (
            <span
              key={i}
              className="mr-1 rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "countInStock",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const stock = row.getValue("countInStock") as number;
      return (
        <div
          className={cn("text-center", stock < 5 && "font-bold text-red-500")}
        >
          {stock}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="text-end">
          <TableActions payment={payment} />
        </div>
      );
    },
  },
];
