import WPSitesLayout from "../../layouts/WPsitesLayout";
import { WPSite } from "@/types/wpsite";
import WPCard from "@/components/wp-card";
import Searchbar from "@/components/searchbar";
import { useState, useEffect } from "react";

export default function WPSitesIndex({ wpSites }: { wpSites: WPSite[] }) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const initialSites = wpSites; 
    const filteredWPSites = initialSites.filter((site: WPSite) =>
        site.url.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <WPSitesLayout title="WordPress Sites">
             <Searchbar onSearch={setSearchQuery} placeholder="Search sites" className="md:w-1/2"/>
            <h1 className="text-2xl mb-4">Available WordPress Sites</h1>
            {filteredWPSites.length === 0 ? <p>No WordPress sites available</p> : ""}

            {filteredWPSites.map((site: WPSite, index) => (
                <WPCard key={`${site.id}_${index}`} wpSite={site} />
            ))}
        </WPSitesLayout>
    )
}