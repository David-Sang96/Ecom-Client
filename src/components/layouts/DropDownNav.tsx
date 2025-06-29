import useAuthStore from "@/store/authStore";
import { Box, Heart, LayoutDashboard, UserRound } from "lucide-react";
import { Link } from "react-router";
import LogoutBtn from "../auth/LogoutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function DropDownNav() {
  const { image, name, role } = useAuthStore();
  const firstLetters = name
    ?.split(" ")
    .slice(0, 3)
    .map((item) => item.slice(0, 1).toUpperCase())
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="size-9">
          <AvatarImage
            src={image?.url}
            alt="profile picture"
            className="size-full rounded-full border border-green-300 object-cover"
          />
          <AvatarFallback>{firstLetters}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"/me"}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <UserRound aria-hidden="true" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          {role === "ADMIN" && (
            <Link to={"/admin"}>
              <DropdownMenuItem className="cursor-pointer">
                Dashboard
                <DropdownMenuShortcut>
                  <LayoutDashboard aria-hidden="true" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          )}
          <Link to={"/products/favorite"}>
            <DropdownMenuItem className="cursor-pointer">
              Favorite
              <DropdownMenuShortcut>
                <Heart aria-hidden="true" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to={"/products/order"}>
            <DropdownMenuItem className="cursor-pointer">
              Order
              <DropdownMenuShortcut>
                <Box aria-hidden="true" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutBtn isNav />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
