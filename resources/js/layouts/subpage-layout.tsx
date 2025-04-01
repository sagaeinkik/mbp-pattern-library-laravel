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

const SubPageLayout = ({ children, breadcrumbs, navItems }: SubPageLayoutProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SubPageSubMenu navItems={navItems}/>
            <div className="p-4">
                {children}
            </div>
        </AppLayout>
    )
}

export default SubPageLayout