import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
