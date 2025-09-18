import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-header border-b border-border shadow-sm">
          <div className="flex items-center">
            <SidebarTrigger className="text-header-foreground hover:bg-header/10" />
            <div className="ml-4">
              <h1 className="text-xl font-bold text-header-foreground">TripWeave</h1>
              <p className="text-sm text-header-foreground/70">
                {profile?.role === 'traveler' ? 'Plan. Travel. Explore.' : 'Transportation Data & Analytics'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-header-foreground/70">
            <span className="text-sm capitalize">{profile?.role}</span>
            <span className="text-xs">•</span>
            <span className="text-sm">{profile?.email}</span>
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