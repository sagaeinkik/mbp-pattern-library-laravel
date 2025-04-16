import { WPSite } from "@/types/wpsite";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import PatternWPCard from "@/components/pattern-wp-card";
import { Button } from "./ui/button";
import Searchbar from "./searchbar";
import { useState } from "react";

export default function PatternWPPopover( {wpSites}: {wpSites: WPSite[]}) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredWPSites = wpSites.filter((wpSite: WPSite) => wpSite.url.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button className="text-xl mt-6 py-5 px-6">Add to WordPress Site</Button>
    </DialogTrigger>
    <DialogContent className="max-h-9/12 overflow-y-auto">
        <DialogTitle>
            Add pattern to WordPress
        </DialogTitle>
        <DialogDescription>
            Choose a WordPress site.
        </DialogDescription>
        <Searchbar onSearch={setSearchQuery} />
                {filteredWPSites.length === 0 ? <p>No WordPress sites found</p> : ""}
                <div>

                {filteredWPSites.map((wpSite: WPSite) => (
                    <PatternWPCard key={wpSite.id} wpSite={wpSite} />
                ))}
                </div>
    </DialogContent>
</Dialog>
  )
}
