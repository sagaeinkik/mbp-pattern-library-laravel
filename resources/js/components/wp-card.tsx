import ClipboardCopyButton from '@/components/clipboard-copy-btn';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';

import { WPSite } from '@/types/wpsite';
import { useState } from 'react';

export default function WPCard({ wpSite }: { wpSite: WPSite }) {
    //States
    const [showKey, setShowKey] = useState(false);

    const toggleKey = () => {
        setShowKey(!showKey);
    };
    return (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-md border p-4 shadow-md">
            <div>
                <h2 className="text-lg">{wpSite.url}</h2>
                <div className="mt-3 flex items-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="cursor-pointer">
                                <KeyRound onClick={toggleKey} />
                            </TooltipTrigger>
                            <TooltipContent>{showKey ? 'Hide site key' : 'Show site key'}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {showKey && <p className="bg-default-hover rounded-xl px-6 py-1 text-sm">{wpSite.key}</p>}
                    <ClipboardCopyButton variant="outline" copyText={wpSite.key} btnText="key" className="ml-2" />
                </div>
            </div>
            <Link
                as="button"
                href={route('wordpress.edit', { wordpress: wpSite })}
                className="bg-primary hover:bg-secondary rounded-md px-4 py-2 text-sm"
            >
                Handle site
            </Link>
        </div>
    );
}
