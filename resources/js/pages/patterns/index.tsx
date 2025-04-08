import PatternsLayout from "@/layouts/PatternsLayout";
import PatternCard from "@/components/pattern-card";
import Searchbar from "@/components/searchbar";
import SelectList from "@/components/select-list";
import { useState } from "react";

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
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchFilter, setSearchFilter] = useState<string>("All");

    //Unique categories
    let categories = patterns.map((pattern) => pattern.category.name);
    categories = Array.from(new Set<string>(categories));

    // Filters
    const initialPatterns = patterns;
    let filteredPatterns = initialPatterns;
    //Category filter
    if (searchFilter !== "" && searchFilter !== "All") {
        filteredPatterns = initialPatterns.filter((pattern: Pattern) => pattern.category.name === searchFilter);
    }
    //Search query filter
    filteredPatterns = filteredPatterns.filter((pattern: Pattern) => pattern.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <PatternsLayout title="Patterns">
            <div className="w-full md:grid md:grid-cols-2 gap-5 justify-between items-end">
                <Searchbar onSearch={setSearchQuery} placeholder="Search patterns"/>
                <SelectList onChange={setSearchFilter} options={categories} listId="categorySelect" label="Category" />
            </div>

            <h1 className="text-2xl">Available patterns</h1>
            {filteredPatterns.length === 0 ? <p>No patterns available</p> : ""}
            <div className="my-4 flex flex-wrap grow gap-4 w-full">
                {
                    filteredPatterns.map((pattern) => (
                        <PatternCard key={pattern.id} pattern={pattern} />
                    ))
                }
            </div>
        </PatternsLayout>
    )
}