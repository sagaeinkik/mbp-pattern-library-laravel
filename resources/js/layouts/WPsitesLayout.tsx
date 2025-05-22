import SubPageLayout from '@/layouts/subpage-layout';
import wpsiteNav from '@/navs/wpsiteNav';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Download } from 'lucide-react';

//Interface
interface WPSitesLayoutProps {
    title: string;
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function WPSitesLayout({ children, breadcrumbs = [] }: WPSitesLayoutProps) {
    const { pluginUrl } = usePage().props;

    // Add plugin download link to nav
    if (pluginUrl && !wpsiteNav.some((item) => item.href === pluginUrl)) {
        wpsiteNav.push({
            title: 'Download Plugin',
            href: pluginUrl as string,
            icon: Download,
            isExternal: true,
        });
    }

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
