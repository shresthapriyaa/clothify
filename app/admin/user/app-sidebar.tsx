
"use client";

import Link from "next/link";
import { Home, User, Package, Layers, Settings, ShoppingCart } from "lucide-react";
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
  return (
    <Sidebar className="h-full min-h-screen border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}