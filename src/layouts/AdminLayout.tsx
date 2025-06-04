import AppSidebar from "@/components/admin/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <div className="pt-2">
          <SidebarTrigger />
          <section className="px-4 pt-2">
            <Outlet />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default AdminLayout;
