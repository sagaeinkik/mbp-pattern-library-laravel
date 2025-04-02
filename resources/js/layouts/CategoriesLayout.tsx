import SubPageLayout from '@/layouts/subpage-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import categoryNav from '@/navs/categoryNav';
import React from 'react';


//Interface
interface CategoriesLayoutProps {
    title: string; 
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}


export default function CategoriesLayout({ title, children, breadcrumbs = [] }: CategoriesLayoutProps) {
    //Crumbs back to index
    const defaultBreadcrumbs: BreadcrumbItem[] = [
        {
          title: 'Categories',
          href: route('categories.index'),
        },
      ];

      //Crumbs after index
      const allBreadCrumbs = [...defaultBreadcrumbs, ...breadcrumbs];


    return (
        <SubPageLayout breadcrumbs={allBreadCrumbs} navItems={categoryNav}>
            <Head title="Categories" />
            {children}
        </SubPageLayout>
    );
}