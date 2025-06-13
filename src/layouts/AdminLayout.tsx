import AppSidebar from "@/components/admin/AppSidebar";
import ProgressBar from "@/components/ProgressBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";

const AdminLayout = () => {
  return (
    <section>
      <ScrollRestoration />
      <Toaster
        position="top-center"
        closeButton
        richColors
        duration={3000}
        expand={true}
      />
      <ProgressBar />
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
            <section className="px-1.5 pt-2 md:px-4">
              <Outlet />
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
};
export default AdminLayout;
