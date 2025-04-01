import SubPageLayout from '@/layouts/subpage-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import patternNav from '@/navs/patternNav';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patterns',
        href: route('patterns.index'),
    },
];

const Patterns = () => {
  return (
    <SubPageLayout breadcrumbs={breadcrumbs} navItems={patternNav}>
        <Head title="Pattern" />
        <h1>This is the page for patterns</h1>
    </SubPageLayout>
  )
}

export default Patterns