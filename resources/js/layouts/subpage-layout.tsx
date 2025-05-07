import SubPageSubMenu from '@/components/subpage-submenu';
import { type BreadcrumbItem, NavItem } from '@/types';
import React from 'react';
import AppLayout from './app-layout';

//Interface
interface SubPageLayoutProps {
    children: React.ReactNode;
    breadcrumbs: BreadcrumbItem[];
    navItems: NavItem[];
}

export default function SubPageLayout({ children, breadcrumbs, navItems }: SubPageLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SubPageSubMenu navItems={navItems} />
            <div className="text-bread max-w-8xl p-4">{children}</div>
        </AppLayout>
    );
}
