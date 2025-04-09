import CategoriesLayout from "@/layouts/CategoriesLayout";
import CategoryCard from "@/components/category-card";
import Searchbar from "@/components/searchbar";
import { useState } from "react";
import { Category } from "@/types/categories";


export default function CategoriesIndex({ categories }: { categories: Category[]}) {
    // Search vars
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Filter categories based on search query
    const initialCats = categories; 
    const filteredCategories = initialCats.filter((category: Category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <CategoriesLayout title="Categories">
            <Searchbar onSearch={setSearchQuery} placeholder="Search categories" className="md:w-1/2"/>
            <h1 className="text-2xl">Available categories</h1>
            { filteredCategories.length === 0 ? <p>No categories available</p> : ""}
            <div className="my-4 flex flex-wrap grow gap-4 w-full">
                {
                    filteredCategories.map((category: Category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                }
            </div>
        </CategoriesLayout>
    )
}
