import { Link } from "@inertiajs/react";


//Interfaces
interface Category {
    id: number;
    name: string;
}

interface CategoriesIndexProps {
    category: Category;
}


export default function CategoryCard({ category }: CategoriesIndexProps) {
  return (
    <Link href={route("categories.show", {id: category.id})} as="div" className="bg-category-card hover:bg-category-hover p-4 rounded-md cursor-pointer basis-60 grow">
        <p className="text-lg">{category.name}</p>
        <p className="text-sm mt-3">Patterns: 0</p> {/* Make this a count */}
    </Link>
  )
}
