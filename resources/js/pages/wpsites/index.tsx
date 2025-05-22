// Graphical
import ClipboardCopyButton from '@/components/clipboard-copy-btn';
import Searchbar from '@/components/searchbar';
import Pagination from '@/components/ui/pagination';
import WPCard from '@/components/wp-card';
import WPSitesLayout from '../../layouts/WPsitesLayout';

// Interfaces
import { WPSite } from '@/types/wpsite';
// Functionality
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function WPSitesIndex() {
    const { wpSites, pluginUrl, appUrl } = usePage().props;

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const initialSites = wpSites as WPSite[];
    const filteredWPSites = initialSites.filter((site: WPSite) => site.url.toLowerCase().includes(searchQuery.toLowerCase()));

    //Pagination
    const totalPages = Math.ceil(filteredWPSites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedWPSites = filteredWPSites.slice(startIndex, endIndex);

    //Reset pagination when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <WPSitesLayout title="WordPress Sites">
            <Searchbar onSearch={setSearchQuery} placeholder="Search sites" className="md:w-1/2" />
            <h1 className="mt-6 mb-2 text-2xl">Connect a WordPress site</h1>
            <div className="mb-6">
                <p>
                    You can easily add WordPress block patterns from this library onto your existing WordPress site with just the click of a button.
                </p>
                <p className="mt-2">Follow these steps in order to do so: </p>
                <ol className="list-inside list-decimal">
                    <li>First, download the MBP Pattern Library plugin for WordPress and add it to your plugin folder.</li>
                    <li>
                        The plugin will ask you to input the URL to the pattern library API, which is{' '}
                        <span className="bg-accent dark:bg-muted ml-1 rounded-xl px-2 py-1">{appUrl as string}</span>
                        <ClipboardCopyButton copyText={appUrl as string} className="ml-3" variant="outline" />
                    </li>
                    <li>
                        Next, register your WordPress site (without /wp-admin) on{' '}
                        <a href={route('wordpress.add')} className="text-primary-foreground-links hover:text-foreground underline decoration-dotted">
                            Add new site
                        </a>
                        . This will generate a unique site key.
                    </li>
                    <li>Copy the site key and paste it into the site key-field of the plugin, then hit activate.</li>
                    <li>
                        Browse{' '}
                        <a href={route('patterns.all')} className="text-primary-foreground-links hover:text-foreground underline decoration-dotted">
                            patterns
                        </a>
                        , pick one you like, and add it onto your site, just like that.
                    </li>
                </ol>
                <p>You can also browse and add patterns to your WordPress site from the plugin itself; they're synced!</p>

                <div>
                    <p className="text-foreground/60 mt-3 text-xs">{pluginUrl ? 'Got a new version?' : 'No plugin uploaded yet?'}</p>
                    <Link href={route('plugin-form.show')} className="text-primary-foreground-links/70 hover:text-foreground text-xs underline">
                        {pluginUrl ? 'Update plugin' : 'Upload plugin'}
                    </Link>
                </div>
            </div>

            <h2 className="mb-2 text-xl">Registered WordPress sites</h2>
            {paginatedWPSites.length === 0 ? <p>No WordPress sites available</p> : ''}

            {paginatedWPSites.map((site: WPSite, index: number) => (
                <WPCard key={`${site.id}_${index}`} wpSite={site} />
            ))}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </WPSitesLayout>
    );
}
