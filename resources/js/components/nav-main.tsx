import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { url } = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Explore</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const basePath = new URL(item.href).pathname;
                    const isActive = url.startsWith(basePath);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={isActive ? "bg-sidebar-accent" : ""}
                            >
                                <Link href={item.href} className="text-smallbread">
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
