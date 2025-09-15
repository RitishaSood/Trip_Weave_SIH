import { 
  LayoutDashboard, 
  MapPin, 
  Route, 
  Car, 
  Utensils, 
  Shield, 
  User, 
  ClipboardList,
  Plane
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Trip Planner", url: "/trip-planner", icon: MapPin },
  { title: "Itinerary", url: "/itinerary", icon: Route },
  { title: "Rides", url: "/rides", icon: Car },
  { title: "Food", url: "/food", icon: Utensils },
  { title: "Safety", url: "/safety", icon: Shield },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Trip Logger", url: "/trip-logger", icon: ClipboardList },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h2 className="font-bold text-sidebar-foreground">TripWeave</h2>
                <p className="text-xs text-sidebar-foreground/70">Travel Smart</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-medium">
            {state !== "collapsed" && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: active }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                        ${active || isActive(item.url)
                          ? 'bg-sidebar-accent text-sidebar-primary font-medium shadow-sm' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary'
                        }
                        ${state === "collapsed" ? 'justify-center' : ''}
                      `}
                    >
                      <item.icon className={`${state === "collapsed" ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                      {state !== "collapsed" && <span className="text-sm">{item.title}</span>}
                    </NavLink>
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