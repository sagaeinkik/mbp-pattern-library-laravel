import AppLayout from "./app-layout";
import SubPageSubMenu from "@/components/subpage-submenu";
import { type BreadcrumbItem, NavItem } from "@/types";
import React from "react";

//Interface
interface SubPageLayoutProps {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItem[];
    navItems: NavItem[];
}

export default function SubPageLayout({ children, breadcrumbs, navItems }: SubPageLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SubPageSubMenu navItems={navItems}/>
            <div className="p-4 text-bread">
                {children}
            </div>
        </AppLayout>
    )
}
