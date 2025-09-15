import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center px-6 bg-header border-b border-border shadow-sm">
          <SidebarTrigger className="text-header-foreground hover:bg-header/10" />
          <div className="ml-4">
            <h1 className="text-xl font-bold text-header-foreground">TripWeave</h1>
            <p className="text-sm text-header-foreground/70">Plan. Travel. Explore.</p>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}