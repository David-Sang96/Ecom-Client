import { Globe } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { SidebarNavFooter } from "./SidebarNavFooter";
import NavMenu from "./SidebarNavMenu";

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="text-xl">
        <Globe size={24} aria-hidden={true} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
