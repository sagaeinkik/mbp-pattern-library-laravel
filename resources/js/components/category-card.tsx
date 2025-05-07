import { Category } from '@/types/categories';
import { Link } from '@inertiajs/react';

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <Link
            href={route('categories.details', { id: category.id })}
            as="div"
            className="hover:bg-default-card grow basis-60 cursor-pointer rounded-md border p-4"
        >
            <p className="text-lg">{category.name}</p>
            <p className="mt-3 text-sm">Patterns: {category.pattern_count} </p>
        </Link>
    );
}
