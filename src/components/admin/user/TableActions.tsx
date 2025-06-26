/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchApi from "@/api";
import { queryClient } from "@/api/query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Ban, Edit, Eye, MoreHorizontal, Shield, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const TableActions = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);
  const userEmail = useAuthStore((store) => store.email);
  const userID = useAuthStore((store) => store.id);
  const username = useAuthStore((store) => store.name);

  const isCurrentLoginUser =
    user.name === username && userEmail === user.email && user._id === userID;

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetchApi.put(`/admin/user`, data);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["users", "all"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["users", "details", user._id],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message || "something went wrong";
        toast.error(errorMessage);
      }
      toast.error("something went wrong");
    },
  });

  const handleUpdateUser = (userRole?: string, isBan?: boolean) => {
    const role =
      userRole === undefined
        ? user.role
        : userRole === "ADMIN"
          ? "USER"
          : "ADMIN";
    const ban = isBan === undefined ? user.ban.isBanned : !isBan;
    const data = {
      name: user.name,
      role,
      ban,
      isEmailVerified: user.isEmailVerified,
      reason: "",
      userId: user._id,
    };
    mutate(data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={`${user._id}`}>
            <Eye />
            View details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link to={`${user._id}/edit`}>
            <Edit />
            Edit user
          </Link>
        </DropdownMenuItem>
        {!isCurrentLoginUser && <DropdownMenuSeparator />}
        {!isCurrentLoginUser && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdateUser(user.role)}
            >
              <Shield />
              {user.role === "ADMIN" ? " Remove admin" : "Make admin"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleUpdateUser(undefined, user.ban.isBanned)}
            >
              <Ban />
              {user.ban.isBanned ? "Unban user" : "Ban user"}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
              <Trash className="text-red-500" />
              Delete user
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActions;
