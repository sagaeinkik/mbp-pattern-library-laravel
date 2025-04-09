import { Link } from "@inertiajs/react"
import { Pattern } from "@/types/patterns"


export default function PatternCard({ pattern }: { pattern: Pattern }) {
    return (
        <Link href="#" as="div" className="border hover:bg-default-card p-4 rounded-md cursor-pointer basis-64 grow max-w-xl">
            <h2 className="text-xl font-bold">{pattern.title}</h2>
            { pattern.category?.name && <p className="text-primary-foreground/70">Category: { pattern.category?.name }</p> }
            { pattern.pattern_previews?.[0] && <img src={pattern.pattern_previews[0].image_path} className="my-2 rounded-sm max-h-50 mx-auto" />}
            <p className="mt-2">{pattern.description}</p>
        </Link>
    )
}
