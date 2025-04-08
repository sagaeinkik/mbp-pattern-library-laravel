import PatternsLayout from "@/layouts/PatternsLayout";
import PatternCard from "@/components/pattern-card";

//Interfaces
interface PatternPreview {
    id: number; 
    pattern_id: number;
    image_path: string;
}

interface Category {
    id: number; 
    name: string; 
}

interface Pattern {
    id: number;
    title: string;
    description: string;
    pattern_data: string;
    category_id: number;
    pattern_previews: PatternPreview[]
    category: Category;
}


export default function PatternsIndex({ patterns }: { patterns: Pattern[] }) {

    return (
        <PatternsLayout title="Patterns">
            <h1 className="text-2xl">Available patterns</h1>
            {patterns.length === 0 ? <p>No patterns available</p> : ""}
            <div className="my-4 flex flex-wrap grow gap-4 w-full max-w-7xl">
                {
                    patterns.map((pattern) => (
                        <PatternCard key={pattern.id} pattern={pattern} />
                    ))
                }
            </div>
        </PatternsLayout>
    )
}