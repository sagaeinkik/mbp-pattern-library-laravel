import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import DashboardCard from '@/components/dashboard-card';
import { Check } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Dashboard( { patternCount, categoryCount, wordpressCount} : { patternCount: number, categoryCount: number, wordpressCount: number } ) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
    ];

    const featureList = [
        "Add and manage patterns and categories", 
        "Image previews",
        "Download patterns as JSON files ready to use on WordPress",
        "Syncronize library with WordPress sites",
        "Quickly add patterns to WordPress sites with a click",
        "Overview of patterns in categories",
        "Search and filter patterns, categories and WordPress sites", 
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                <p>Hi. Welcome to the pattern library.</p>

                <div className="flex flex-1 flex-col gap-4 rounded-xl my-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                        <DashboardCard headline={`Browse among ${patternCount} patterns`} description="Manage and explore custom block patterns to reuse on your WordPress site. You can even add your own!" linkText="Browse patterns" linkTo={route("patterns.all")} className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-tl from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2" />
                        <DashboardCard headline="Sort into categories" description={`Check out our categories! We've got ${categoryCount} of them. You can always add more, if you need.`} linkText="Explore categories" linkTo={route("categories.all")} className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-tr from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2"/>
                    </div>
                    <DashboardCard headline="Connect to WordPress" description={`These patterns are being used on no fewer than ${wordpressCount} WordPress ${ wordpressCount === 1 ? "site" : "sites" }. Connect your site to add block patterns to it with just a click; it's ridiculously easy.`} linkText="See the sites" linkTo={route("wordpress.all")} className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-linear-to-bl from-lm-mediumbright to-background dark:from-background dark:to-middark flex flex-col items-center justify-center gap-2" />
                </div>
                <h2 className="text-xl mt-4 mb-2">What is this?</h2>
                <p>The Laravel Pattern Library is a place to import and export block patterns for WordPress, to make it easier for you to reuse your favorite patterns across multiple sites.</p>
                <p>You can upload block patterns, download them as JSON files, or connect the library to your WordPress site in order to quickly add the patterns to your site.</p>
            
                <div className="bg-lm-medium dark:bg-secondary p-4 rounded-xl my-4 border">
                    <h2 className="text-xl mb-2">Features</h2>
                    <ul>
                        { featureList.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 mb-2">
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
