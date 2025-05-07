import PatternWPCard from '@/components/pattern-wp-card';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { WPSite } from '@/types/wpsite';
import { useState } from 'react';
import Searchbar from './searchbar';
import { Button } from './ui/button';

export default function PatternWPPopover({ wpSites }: { wpSites: WPSite[] }) {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredWPSites = wpSites.filter((wpSite: WPSite) => wpSite.url.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-6 px-6 py-5 text-xl">Add to WordPress Site</Button>
            </DialogTrigger>
            <DialogContent className="max-h-9/12 overflow-y-auto">
                <DialogTitle>Add pattern to WordPress</DialogTitle>
                <DialogDescription>Choose a WordPress site.</DialogDescription>
                <Searchbar onSearch={setSearchQuery} />
                {filteredWPSites.length === 0 ? <p>No WordPress sites found</p> : ''}
                <div>
                    {filteredWPSites.map((wpSite: WPSite) => (
                        <PatternWPCard key={wpSite.id} wpSite={wpSite} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
