import PatternsLayout from "@/layouts/PatternsLayout";
import PatternCard from "@/components/pattern-card";
import Searchbar from "@/components/searchbar";
import SelectList from "@/components/select-list";
import { useState, useEffect } from "react";
import { Pattern } from "@/types/patterns";
import Pagination from "@/components/ui/pagination";


export default function PatternsIndex({ patterns }: { patterns: Pattern[] }) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchFilter, setSearchFilter] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 16;

    //Unique categories
    let categories = patterns.map((pattern) => pattern.category!.name);
    categories = Array.from(new Set<string>(categories));

    // Filters
    const initialPatterns = patterns;
    let filteredPatterns = initialPatterns;
    //Category filter
    if (searchFilter !== "" && searchFilter !== "All") {
        filteredPatterns = initialPatterns.filter((pattern: Pattern) => pattern.category!.name === searchFilter);
    }
    //Search query filter
    filteredPatterns = filteredPatterns.filter((pattern: Pattern) => pattern.title.toLowerCase().includes(searchQuery.toLowerCase()));

    //Pagination
    const totalPages = Math.ceil(filteredPatterns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPatterns = filteredPatterns.slice(startIndex, endIndex);

    //Reset pagination when search query or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, searchFilter]);

    return (
        <PatternsLayout title="Patterns">
            <div className="w-full md:grid md:grid-cols-2 gap-5 justify-between items-end">
                <Searchbar onSearch={setSearchQuery} placeholder="Search patterns"/>
                <SelectList onChange={setSearchFilter} options={categories} listId="categorySelect" label="Category" />
            </div>

            <h1 className="text-2xl">Available patterns</h1>
            {paginatedPatterns.length === 0 ? <p>No patterns available</p> : ""}
            <div className="my-4 flex flex-wrap gap-4 w-full">
                {
                    paginatedPatterns.map((pattern, index) => (
                        <PatternCard key={`${pattern.id}_${index}`} pattern={pattern} />
                    ))
                }
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </PatternsLayout>
    )
}