import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";

export const SidebarTriggerButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className="sm:hidden"
      size="icon"
      variant="ghost"
      onClick={toggleSidebar}
    >
      <AlignJustify />
    </Button>
  );
};
