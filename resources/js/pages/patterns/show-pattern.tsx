//Graphical
import PatternsLayout from "@/layouts/PatternsLayout"
import ClipboardCopyButton from "@/components/clipboard-copy-btn"
import ShowPageHeading from "@/components/ui/showpage-heading"
import ImageGallery from "react-image-gallery";
import { Link } from "@inertiajs/react"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button";
import PatternWPPopover from "@/components/pattern-wp-popover";

//Interfaces
import { Pattern, PatternPreview } from "@/types/patterns"
import { WPSite } from "@/types/wpsite";

//Functions
import { handleJsonDownload } from "@/lib/handleJson"


export default function ShowPattern({ pattern, wpSites }: { pattern: Pattern, wpSites: WPSite[] }) {

    //Breadcrumbs
    const breadCrumbs = [
        { title: pattern.title, href: route("patterns.details", { pattern }) },
    ]

    //Images for gallery
    const images = pattern.pattern_previews.map((preview: PatternPreview) => ({
        original: preview.image_path,
        thumbnail: preview.image_path,
    }))

    return (
        <PatternsLayout title={pattern.title + " details"} breadcrumbs={breadCrumbs}>
            <Link href={route("patterns.all")} className="mb-4 flex gap-1 text-sm text-foreground/60 hover:text-foreground text-wrap break-all items-center w-fit"><ArrowLeft size={15} />Back to all patterns</Link>
            <Button onClick={() => handleJsonDownload({ title: pattern.title, pattern_data: pattern.pattern_data })} variant="secondary" className="hover:bg-primary"><Download />Download as JSON</Button>
            <ShowPageHeading headingText={pattern.title} route={route("patterns.edit", { pattern })} value={"Handle pattern"} />
            {pattern.category && <p className="-mt-2 text-sm">Category: {pattern.category.name}</p>}

            {/* Pattern description */}
            <h2 className="text-xl mt-6">Description</h2>
            <p>{pattern.description}</p>

            {/* Pattern images */}
            <div className="my-6 w-2/3 mx-auto">
                <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
            </div>

            {/* Add to WP */}
            <PatternWPPopover wpSites={wpSites} />

            {/* Pattern preview */}

            {/* Pattern data */}
            <h2 className="text-xl mt-6">Pattern data</h2>
            <div className="p-6 my-4 rounded-xl border bg-popover overflow-x-scroll max-h-8xlh overflow-y-scroll whitespace-pre-line text-wrap break-all relative">
                <ClipboardCopyButton copyText={pattern.pattern_data} className="absolute right-4 top-4 dark:hover:bg-background font-sans" />
                <code className="text-xs">{pattern.pattern_data}</code>
            </div>


        </PatternsLayout>
    )
}
