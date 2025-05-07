import SubPageLayout from '@/layouts/subpage-layout';
import wpsiteNav from '@/navs/wpsiteNav';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

//Interface
interface WPSitesLayoutProps {
    title: string;
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function WPSitesLayout({ children, breadcrumbs = [] }: WPSitesLayoutProps) {
    //Crumbs to wpsites index
    const defaultBreadcrumbs: BreadcrumbItem[] = [
        {
            title: 'WordPress Sites',
            href: route('wordpress.all'),
        },
    ];

    //Extra crumbs
    const allBreadCrumbs = [...defaultBreadcrumbs, ...breadcrumbs];

    return (
        <SubPageLayout breadcrumbs={allBreadCrumbs} navItems={wpsiteNav}>
            <Head title="WordPress Sites" />
            {children}
        </SubPageLayout>
    );
}
