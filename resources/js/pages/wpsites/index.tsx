import Searchbar from '@/components/searchbar';
import Pagination from '@/components/ui/pagination';
import WPCard from '@/components/wp-card';
import { WPSite } from '@/types/wpsite';
import { useEffect, useState } from 'react';
import WPSitesLayout from '../../layouts/WPsitesLayout';

export default function WPSitesIndex({ wpSites }: { wpSites: WPSite[] }) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    const initialSites = wpSites;
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
            <h1 className="mb-4 text-2xl">Available WordPress Sites</h1>
            {paginatedWPSites.length === 0 ? <p>No WordPress sites available</p> : ''}

            {paginatedWPSites.map((site: WPSite, index) => (
                <WPCard key={`${site.id}_${index}`} wpSite={site} />
            ))}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </WPSitesLayout>
    );
}
