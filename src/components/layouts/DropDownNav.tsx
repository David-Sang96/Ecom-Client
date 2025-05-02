import { LayoutDashboard, Settings, UserRound } from "lucide-react";
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="size-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
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
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>
              <LayoutDashboard aria-hidden="true" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
            <DropdownMenuShortcut>
              <Settings aria-hidden="true" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutBtn isNav />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
