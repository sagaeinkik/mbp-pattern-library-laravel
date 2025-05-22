//Graphical
import ClipboardCopyButton from '@/components/clipboard-copy-btn';
import PatternWPPopover from '@/components/pattern-wp-popover';
import { Button } from '@/components/ui/button';
import ShowPageHeading from '@/components/ui/showpage-heading';
import PatternsLayout from '@/layouts/PatternsLayout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Download } from 'lucide-react';
import ImageGallery from 'react-image-gallery';

//Interfaces
import { Pattern, PatternPreview } from '@/types/patterns';
import { WPSite } from '@/types/wpsite';

//Functions
import { handleJsonDownload } from '@/lib/handleJson';

export default function ShowPattern() {
    const { pattern, wpSites } = usePage<{ pattern: Pattern; wpSites: WPSite[] }>().props;

    //Breadcrumbs
    const breadCrumbs = [{ title: pattern.title, href: route('patterns.details', { pattern }) }];

    //Images for gallery
    const images = pattern.pattern_previews.map((preview: PatternPreview, index: number) => ({
        original: preview.image_path,
        thumbnail: preview.image_path,
        originalAlt: `Preview ${index} of ${pattern.title}`,
        thumbnailAlt: `Preview ${index} of ${pattern.title}`,
    }));

    return (
        <PatternsLayout title={pattern.title + ' details'} breadcrumbs={breadCrumbs}>
            <Link
                href={route('patterns.all')}
                className="text-foreground/60 hover:text-foreground mb-4 flex w-fit items-center gap-1 text-sm text-wrap break-all"
            >
                <ArrowLeft size={15} />
                Back to all patterns
            </Link>
            <Button
                onClick={() => handleJsonDownload({ title: pattern.title, pattern_data: pattern.pattern_data })}
                variant="secondary"
                className="hover:bg-primary"
            >
                <Download />
                Download as JSON
            </Button>
            <ShowPageHeading headingText={pattern.title} route={route('patterns.edit', { pattern })} value={'Handle pattern'} />
            {pattern.category && <p className="-mt-2 text-sm">Category: {pattern.category.name}</p>}

            {/* Pattern description */}
            <h2 className="mt-6 text-xl">Description</h2>
            <p>{pattern.description}</p>

            {/* Pattern images */}
            <div className="mx-auto my-6 w-2/3">
                <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
            </div>

            {/* Add to WP */}
            <PatternWPPopover wpSites={wpSites} />

            {/* Pattern data */}
            <h2 className="mt-6 text-xl">Pattern data</h2>
            <div className="bg-popover max-h-8xlh relative my-4 overflow-x-scroll overflow-y-scroll rounded-xl border p-6 text-wrap break-all whitespace-pre-line">
                <ClipboardCopyButton copyText={pattern.pattern_data} className="dark:hover:bg-background absolute top-4 right-4 font-sans" />
                <code className="text-xs">{pattern.pattern_data}</code>
            </div>
        </PatternsLayout>
    );
}
