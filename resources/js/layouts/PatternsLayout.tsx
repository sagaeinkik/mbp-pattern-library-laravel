import SubPageLayout from '@/layouts/subpage-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import patternNav from '@/navs/patternNav';

//Interface
interface PatternLayoutProps {
  title: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}


export default function PatternsLayout({ title, children, breadcrumbs = [] }: PatternLayoutProps) {
  //Crumbs to pattern index
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Patterns',
      href: route('patterns.index'),
    },
  ];
  //Extra crumbs
  const allBreadCrumbs = [...defaultBreadcrumbs, ...breadcrumbs];

  return (
    <SubPageLayout breadcrumbs={allBreadCrumbs} navItems={patternNav}>
      <Head title="Pattern" />
      {children}
    </SubPageLayout>
  )
}
