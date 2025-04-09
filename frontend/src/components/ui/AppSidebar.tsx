import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { userData } from "@/lib/types";


interface MenuItem {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface AppSidebarProps {
  menuItems: MenuItem[];
  user?: userData | null;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ menuItems, user }) => {
  
  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={"lg"}>
                      <button onClick={() => item.onClick()}>
                      {item.icon}
                      <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
           <SidebarMenuItem>
             <SidebarMenuButton asChild size={"lg"}>
                
                <button>
                  <Avatar>
                     <AvatarImage src={user?.photo_url} />
                     <AvatarFallback>Профиль</AvatarFallback>
                  </Avatar>
                  <span>{user?.username}</span>
                </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
