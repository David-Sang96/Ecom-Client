import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { OrderProductType, OrderStatus, PaymentStatus } from "@/types/order";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import TableActions from "./TableActions";

export type Order = {
  _id: string;
  status: OrderStatus;
  items: [];
  paymentStatus: PaymentStatus;
  totalPrice: number;
  userId: { name: string; _id: string };
  createdAt: Date;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div>#{id.substring(id.length - 7)}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.getValue("userId") as { _id: string; name: string };
      return <div className="text-center">{user.name}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div className="text-center">{formatDate(date)}</div>;
    },
  },

  {
    accessorKey: "items",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Items
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const items = row.getValue("items") as OrderProductType[];
      return <div className="text-center">{items.length}</div>;
    },
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-center">Payment</div>,
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as Order["paymentStatus"];
      const statusColor = {
        paid: "bg-green-100 text-green-800",
        failed: "bg-red-100 text-red-800",
      };
      return (
        <div className="text-center">
          <Badge className={cn("capitalize", statusColor[status])}>
            {status}
          </Badge>
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
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Order["status"];

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
          <Badge className={cn("capitalize", statusColor[status])}>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="text-end">
          <TableActions order={order} />
        </div>
      );
    },
  },
];
