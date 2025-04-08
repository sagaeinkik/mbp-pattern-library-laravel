import { Link } from "@inertiajs/react"

//Interfaces
interface Pattern {
    id: number;
    title: string;
    description: string;
    pattern_data: string;
    category_id: number;
    pattern_previews: PatternPreview[]
    category: Category;
}

interface Category {
    id: number; 
    name: string; 
}

interface PatternPreview {
    id: number; 
    pattern_id: number;
    image_path: string;
}

export default function PatternCard({ pattern }: { pattern: Pattern }) {
    return (
        <Link href="#" as="div" className="border hover:bg-default-card p-4 rounded-md cursor-pointer basis-60 grow max-w-2xl">
            <h2 className="text-xl font-bold">{pattern.title}</h2>
            <p>Category: {pattern.category.name}</p>
            {pattern.pattern_previews?.[0] && <img src={pattern.pattern_previews[0].image_path} />}
            <p>{pattern.description}</p>
        </Link>
    )
}
