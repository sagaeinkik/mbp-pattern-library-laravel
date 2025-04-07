import PatternsLayout from "@/layouts/PatternsLayout";

//Interfaces
interface Pattern {
    id: number; 
    title: string; 
    description: string;
    pattern_data: string; 
    category_id: number;
}

export default function PatternsIndex({ patterns }: { patterns: Pattern[] }) {
    return (
        <PatternsLayout title="Patterns">
            <h1 className="text-2xl">Available patterns</h1>
            { patterns.length === 0 ? <p>No patterns available</p> : ""}
             <div className="my-4 flex flex-wrap grow gap-4 w-full max-w-7xl">
                            {
                                patterns.map((pattern) => (
                                    <div key={pattern.id} className="border p-4 rounded-md shadow-md w-full md:w-1/3 lg:w-1/4">
                                        <h2 className="text-xl font-bold">{pattern.title}</h2>
                                        <p>{pattern.description}</p>
                                        <p>Category ID: {pattern.category_id}</p>
                                        <p>Pattern Data: {pattern.pattern_data}</p>
                                    </div>
                                ))
                            }
                        </div>
        </PatternsLayout>
    )
}