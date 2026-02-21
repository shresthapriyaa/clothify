"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  User,
  Package,
  Layers,
  Settings,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Users", url: "/admin/user", icon: User },
  { title: "Products", url: "/admin/product", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Categories", url: "/admin/categories", icon: Layers },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); 
  };

  


  return (

    <Sidebar className="h-full min-h-screen border-r flex flex-col">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>

                    <Link
                      href={item.url}
                      className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition ${
                        pathname === item.url ? "bg-gray-200 font-semibold" : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout button just after Settings */}
              {session && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
