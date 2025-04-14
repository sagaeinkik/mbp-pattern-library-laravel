import PatternsLayout from "@/layouts/PatternsLayout"
import { Pattern, PatternPreview } from "@/types/patterns"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"
import ClipboardCopyButton from "@/components/clipboard-copy-btn"
import ShowPageHeading from "@/components/ui/showpage-heading"
import ImageGallery from "react-image-gallery";

export default function ShowPattern({ pattern }: { pattern: Pattern }) {

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
            <Link href={route("patterns.all")} className="mb-4 flex gap-1 text-sm text-foreground/60 hover:text-foreground items-center w-fit"><ArrowLeft size={15} />Back to all patterns</Link>
            <ShowPageHeading headingText={pattern.title} route={route("patterns.edit", { pattern })} value={"Handle pattern"} />

            {/* Pattern description */}
            <h2 className="text-xl mt-6">Description</h2>
            <p>{pattern.description}</p>

            {/* Pattern images */}
            <div className="my-6 w-2/3 mx-auto">
                <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
            </div>
            {/* Add to WP */}
            <h2 className="text-xl mt-6">Add to WordPress Site</h2>
            <p>(display wordpress sites here)</p>

            {/* Pattern data */}
            <h2 className="text-xl mt-6">Pattern data</h2>
            <pre className="p-6 my-4 rounded-xl border text-xs bg-popover max-h-8xlh overflow-scroll relative">
                <ClipboardCopyButton copyText={pattern.pattern_data} className="absolute right-4 top-4 dark:hover:bg-background font-sans" />
                <code className="w-full">{pattern.pattern_data}</code>
            </pre>


        </PatternsLayout>
    )
}
