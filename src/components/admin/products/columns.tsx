import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { decode } from "html-entities";
import { ArrowUpDown } from "lucide-react";
import TableActions from "./TableActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  _id: string;
  name: string;
  price: number;
  countInStock: number;
  images: { url: string; public_id: string }[];
  categories: string[];
};

type ColumsProp = {
  setSliderOpen: (value: boolean) => void;
  setSliderImages: (images: string[]) => void;
};

export const getColumns = ({
  setSliderOpen,
  setSliderImages,
}: ColumsProp): ColumnDef<Payment>[] => [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as {
        url: string;
        public_id: string;
      }[];
      const handleHover = () => {
        setSliderImages(images.map((img) => img.url));
        setSliderOpen(true);
      };

      return (
        <div className="flex gap-2">
          {images.slice(0, 3).map((img, i) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={`img-${img.public_id}`}
              className={`h-10 w-10 rounded object-cover ${
                i > 0 && "hidden md:block"
              }`}
              loading="lazy"
              decoding="async"
              onMouseEnter={handleHover}
            />
          ))}
          {images.length > 3 && (
            <span className="mt-6 hidden text-sm text-gray-500 md:block">
              +{images.length - 3}
            </span>
          )}
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
      <div className="max-w-[200px] truncate text-center md:max-w-[100px] lg:max-w-full">
        {decode(row.getValue("name"))}
      </div>
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
