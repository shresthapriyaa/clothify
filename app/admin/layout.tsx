import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./user/app-sidebar"
import NavigationBreadCrumbs from "@/components/NavigationBreadCrumbs"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen bg-gray-50">
        <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-4">
          <SidebarTrigger />
          <NavigationBreadCrumbs />
        </div>
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}