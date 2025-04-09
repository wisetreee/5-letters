import { Button } from "@/components/ui/button";
import {
  CircleHelp,
  Settings,
  Undo2
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import HowToPlayModal from "./modals/HowToPlayModal";
import { SidebarTriggerButton } from "./ui/SidebarTriggerButton";
import { AppSidebar } from "./ui/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/store/userStore";

const Header = () => {

  const menuItems = [
    {
      title: "Помощь",
      icon: <CircleHelp />,
      onClick: () => setHowToPlayModalOpen(true),
    },
    {
      title: "Настройки",
      icon: <Settings />,
      onClick: () => {},
    },
  ];
  const IsMobile = useIsMobile();
  const [HowToPlayModalOpen, setHowToPlayModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  return (
    <header className="container flex my-8 items-center">
      <div className="flex flex-1/3 justify-start">
        {window.location.pathname !== "/" && (
          <Button size="icon" variant="ghost">
            <Undo2 />
          </Button>
        )}
      </div>
      <div className="flex flex-1/3 justify-center">
        <Logo />
      </div>
      <div className="flex flex-1/3 justify-end">
      <div className="hidden sm:flex sm:gap-2 items-center">
            {menuItems.map((item) => (
              <Button
                key={item.title}
                size="icon"
                variant="ghost"
                onClick={() => item.onClick()}
              >
                {item.icon}
              </Button>
            ))}
            <Button
              size="icon"
              variant="ghost"
            >
              <Avatar>
                <AvatarImage src={user?.photo_url} />
                <AvatarFallback>Профиль</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        <SidebarTriggerButton/>
      </div>
      {IsMobile && <AppSidebar menuItems={menuItems} user={user} />}    
      <HowToPlayModal
        isOpen={HowToPlayModalOpen}
        onClose={() => setHowToPlayModalOpen(false)}
      />
    </header>
  );
};

export default Header;
