import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const DashboardHeader = () => {
  return (
    <header className="py-3 border-b ">
      <div className="px-4 md:px-6 flex items-center justify-between">
        <SidebarTrigger />

        <div className="space-x-4">
          <Button onClick={toast.success("Successfully created!")}>
            <CircleUser />
            <span>username</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
