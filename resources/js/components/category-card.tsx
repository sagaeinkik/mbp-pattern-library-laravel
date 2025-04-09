import { Link } from "@inertiajs/react";
import { Category } from "@/types/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={route("categories.details", {id: category.id})} as="div" className="border hover:bg-default-card p-4 rounded-md cursor-pointer basis-60 grow">
        <p className="text-lg">{category.name}</p>
        <p className="text-sm mt-3">Patterns: { category.pattern_count } </p> 
    </Link>
  )
}
