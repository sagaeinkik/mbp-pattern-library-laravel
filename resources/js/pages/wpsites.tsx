import SubPageLayout from '@/layouts/subpage-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import wpsiteNav from '@/navs/wpsiteNav';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'WordPress Sites',
        href: route('wordpress.index'),
    },
];

const WPSites = () => {
  return (
    <SubPageLayout breadcrumbs={breadcrumbs} navItems={wpsiteNav}>
        <Head title="WordPress Sites" />
        <h1>This is the page for WPSites</h1>
    </SubPageLayout>
  )
}

export default WPSites