import CategoryCard from '@/components/category-card';
import Searchbar from '@/components/searchbar';
import Pagination from '@/components/ui/pagination';
import CategoriesLayout from '@/layouts/CategoriesLayout';
import { Category } from '@/types/categories';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CategoriesIndex() {
    const { categories } = usePage<{ categories: Category[] }>().props;
    // Search vars
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    // Filter categories based on search query
    const initialCats = categories;
    const filteredCategories = initialCats.filter((category: Category) => category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Pagination
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

    // Reset pagination when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <CategoriesLayout title="Categories">
            <Searchbar onSearch={setSearchQuery} placeholder="Search categories" className="md:w-1/2" />
            <h1 className="text-2xl">Available categories</h1>
            {paginatedCategories.length === 0 ? <p>No categories available</p> : ''}
            <div className="my-4 flex w-full grow flex-wrap gap-4">
                {paginatedCategories.map((category: Category, index) => (
                    <CategoryCard key={`${category.id}_${index}`} category={category} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </CategoriesLayout>
    );
}
