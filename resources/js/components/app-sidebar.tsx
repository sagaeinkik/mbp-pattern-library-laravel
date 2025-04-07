import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Shapes, Sparkle, MonitorUp } from 'lucide-react';
import AppLogo from './app-logo';


/* Add menu items in the sidebar here: */
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route("dashboard"),
        icon: LayoutGrid,
    },
    {
        title: "Patterns", 
        href: route("patterns.all"),
        icon: Sparkle
    },
    {
        title: "Categories", 
        href: route("categories.all"),
        icon: Shapes
    },
    {
        title: "WordPress Sites", 
        href: route("wordpress.index"),
        icon: MonitorUp
    }
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
