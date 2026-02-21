import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./user/app-sidebar"
import { Navigation } from "lucide-react"
import NavigationBreadCrumbs from "@/components/NavigationBreadCrumbs"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
     

      <main>
        <SidebarTrigger />
        <NavigationBreadCrumbs />
        {children}
      </main>
    </SidebarProvider>
  )
}