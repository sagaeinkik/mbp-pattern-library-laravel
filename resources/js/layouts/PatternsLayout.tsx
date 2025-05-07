import SubPageLayout from '@/layouts/subpage-layout';
import patternNav from '@/navs/patternNav';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

//Interface
interface PatternLayoutProps {
    title: string;
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function PatternsLayout({ children, breadcrumbs = [] }: PatternLayoutProps) {
    //Crumbs to pattern index
    const defaultBreadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Patterns',
            href: route('patterns.all'),
        },
    ];
    //Extra crumbs
    const allBreadCrumbs = [...defaultBreadcrumbs, ...breadcrumbs];

    return (
        <SubPageLayout breadcrumbs={allBreadCrumbs} navItems={patternNav}>
            <Head title="Pattern" />
            {children}
        </SubPageLayout>
    );
}
