import { PatternJson } from '@/types/patterns';
import { WPSite } from '@/types/wpsite';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

import { formatPatternJson } from '@/lib/handleJson';
import { Hourglass } from 'lucide-react';

export default function PatternWPCard({ wpSite }: { wpSite: WPSite }) {
    const { pattern } = usePage().props;
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [added, setAdded] = useState<boolean>(false);

    // Format pattern data
    const patternData = formatPatternJson(pattern as PatternJson);

    // Pattern suffix
    const apiSuffix = import.meta.env.VITE_API_SUFFIX;

    // Post pattern to WP-Plugin API
    async function handleAddToSite() {
        setAddLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${wpSite.url}${apiSuffix}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + wpSite.key,
                },
                body: JSON.stringify(patternData),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('Pattern added to site!');
                setAdded(true);
            } else if (data.code && data.code === 'pattern_exists') {
                setMessage('Pattern already added to this site!');
            }
        } catch {
            setMessage('Error adding pattern to site. Please try again later.');
        } finally {
            setAddLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={handleAddToSite}
                className={`hover:bg-secondary mb-3 w-full cursor-pointer gap-3 rounded-xl border px-4 py-2 text-left text-sm ${addLoading && 'bg-muted'} flex items-center justify-between`}
                disabled={added}
            >
                {wpSite.url}
                {addLoading && <Hourglass size="20" />}
            </button>
            {message && <p className="text-foreground/60 mt-0 mb-4 ml-2 text-sm">{message}</p>}
        </>
    );
}
