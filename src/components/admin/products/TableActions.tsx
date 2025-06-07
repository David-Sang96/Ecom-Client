/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon, MoreHorizontal, TrashIcon } from "lucide-react";
import { Link } from "react-router";

const TableActions = ({ payment }: { payment: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(payment._id)}
          className="cursor-pointer"
        >
          Copy payment ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link to={`${payment._id}`}>
          <DropdownMenuItem className="flex cursor-pointer justify-between text-green-500 focus:text-green-400">
            Update
            <Edit2Icon />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex cursor-pointer justify-between text-red-500 focus:text-red-400">
          Delete
          <TrashIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
