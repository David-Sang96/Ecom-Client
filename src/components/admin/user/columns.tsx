import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { UserBan, UserImage, UserRole } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Ban,
  Mail,
  MailX,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import TableActions from "./TableActions";

export type User = {
  _id: string;
  image: UserImage | null;
  name: string;
  email: string;
  role: UserRole;
  ban: UserBan;
  isEmailVerified: boolean;
  createdAt: Date;
  lastLogin: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => {
      const img = row.getValue("image") as UserImage;
      const username = row.getValue("name") as string;

      const firstLetters = username
        ?.split(" ")
        .map((item) => item.slice(0, 1).toUpperCase())
        .join("");
      return (
        <Avatar>
          <AvatarImage src={img?.url} />
          <AvatarFallback>{firstLetters}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div>
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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const id = row.original._id;
      return (
        <div>
          <div>{name}</div>
          <div className="text-xs">ID: {id?.substring(id?.length - 8)}...</div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      const roleColor = {
        ADMIN: "bg-purple-100 text-purple-800",
        USER: "bg-blue-100 text-blue-800",
      };

      return (
        <div>
          <Badge className={cn(roleColor[role])}>
            {role === "ADMIN" && <ShieldCheck />}
            {role === "ADMIN" ? "Admin" : "User"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "ban",
    accessorFn: (row) => row.ban.isBanned.toString(), //  string for filtering
    id: "status", // set id since accessorKey is for nested value
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.ban.isBanned;

      return (
        <Badge
          className={cn(
            status ? "bg-red-500 text-white" : "bg-green-100 text-green-800",
          )}
        >
          {status ? <Ban /> : <UserCheck />}
          {status ? "Banned" : "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isEmailVerified",
    header: "Email Verified",
    cell: ({ row }) => {
      const isVerified = row.getValue("isEmailVerified") as boolean;

      return (
        <div>
          <Badge
            className={cn(
              isVerified
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800",
            )}
          >
            {isVerified ? <Mail /> : <MailX />}
            {isVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Login
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("lastLogin") as Date;
      return <div>{formatDate(date)}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="text-end">
          <TableActions user={user} />
        </div>
      );
    },
  },
];
