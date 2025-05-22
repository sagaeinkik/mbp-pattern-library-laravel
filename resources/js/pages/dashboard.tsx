import DashboardCard from '@/components/dashboard-card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Check } from 'lucide-react';

export default function Dashboard({
    patternCount,
    categoryCount,
    wordpressCount,
}: {
    patternCount: number;
    categoryCount: number;
    wordpressCount: number;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
    ];

    const featureList = [
        'Add and manage patterns and categories',
        'Image previews',
        'Download patterns as JSON files ready to use on WordPress',
        'Syncronize library with WordPress plugin',
        'Add patterns to sites from the library',
        'Add patterns to sites from the plugin',
        'Overview of patterns in categories',
        'Search and filter patterns, categories and WordPress sites',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <h1 className="mb-2 text-2xl font-bold">Dashboard</h1>
                <p>Hi. Welcome to the pattern library.</p>

                <div className="my-4 flex flex-1 flex-col gap-4 rounded-xl">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <DashboardCard
                            headline={`Browse among ${patternCount} patterns`}
                            description="Manage and explore custom block patterns to reuse on your WordPress site. You can even add your own!"
                            linkText="Browse patterns"
                            linkTo={route('patterns.all')}
                            className="border-sidebar-border/70 dark:border-sidebar-border from-lm-mediumbright to-background dark:from-background dark:to-middark relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-linear-to-tl"
                        />
                        <DashboardCard
                            headline="Sort into categories"
                            description={`Check out our categories! We've got ${categoryCount} of them. You can always add more, if you need.`}
                            linkText="Explore categories"
                            linkTo={route('categories.all')}
                            className="border-sidebar-border/70 dark:border-sidebar-border from-lm-mediumbright to-background dark:from-background dark:to-middark relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-linear-to-tr"
                        />
                    </div>
                    <DashboardCard
                        headline="Connect to WordPress"
                        description={`These patterns are being used on no fewer than ${wordpressCount} WordPress ${wordpressCount === 1 ? 'site' : 'sites'}. Connect your site to add block patterns to it with just a click, quick and easy!`}
                        linkText="See the sites"
                        linkTo={route('wordpress.all')}
                        className="border-sidebar-border/70 dark:border-sidebar-border from-lm-mediumbright to-background dark:from-background dark:to-middark relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-linear-to-bl"
                    />
                </div>
                <h2 className="mt-4 mb-2 text-xl">What is this?</h2>
                <p>
                    WordPress block patterns can be exported as JSON files from WordPress itself, so you can reuse them on other sites without having
                    to recreate them all the time. That's all nice and neat, but you'd still have to import them on every site manually. The MBP
                    Pattern Library is a digital solution designed to save you a lot of time and trouble in that regard.
                </p>
                <p className="my-2">
                    MBP Pattern Library consists of two parts; the web application (the one you're on right now) that serves as the library itself,
                    and the WordPress plugin you can use to syncronize the library to your WordPress sites.
                </p>
                <p>
                    You can upload block patterns to the library, browse patterns by categories, download them as JSON files, or add them to your
                    sites with just a click from either the library or the plugin. It's ridiculously easy.
                </p>
                <p className="mt-2">
                    The plugin is available for download{' '}
                    <a href={route('wordpress.all')} className="text-primary-foreground-links hover:text-foreground underline decoration-dotted">
                        here
                    </a>
                    !
                </p>

                <div className="bg-lm-medium dark:bg-secondary my-4 rounded-xl border p-4">
                    <h2 className="mb-2 text-xl">Features</h2>
                    <ul>
                        {featureList.map((feature, index) => (
                            <li key={index} className="mb-2 flex items-center gap-2">
                                <Check color="green" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
