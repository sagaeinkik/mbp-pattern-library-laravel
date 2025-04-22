import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import DashboardCard from '@/components/dashboard-card';

export default function Dashboard() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Hi. Welcome to the pattern library.</p>
                <div className="flex flex-1 flex-col gap-4 rounded-xl my-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <DashboardCard headline="A headline!" description="A short text!" linkText="Leading somewhere!" linkTo={route("categories.all")} className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-tl from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2" />
                        <DashboardCard headline="A second headline!" description="Even more text!" linkText="Also leads elsewhere!" linkTo="#" className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-tr from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2"/>
                    </div>
                    <DashboardCard headline="Wow!" description="Woohoo!" linkText="Click me. Nothing bad is gonna happen, I swear :)" linkTo="#" className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-bl from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2" />
                </div>
            </div>
        </AppLayout>
    );
}
