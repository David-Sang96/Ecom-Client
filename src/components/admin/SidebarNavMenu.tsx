import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { ModeToggler } from "../ModeToggler";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const navigation = [
  { name: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { name: "Products", url: "/admin/products", icon: Package },
  { name: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { name: "Users", url: "/admin/users", icon: Users },
  { name: "Settings", url: "/admin/settings", icon: Settings },
];

const SidebarNavMenu = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between text-base">
        <>
          Features
          <ModeToggler />
        </>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span className="text-base">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavMenu;
