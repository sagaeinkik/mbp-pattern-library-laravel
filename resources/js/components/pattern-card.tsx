import { Pattern } from '@/types/patterns';
import { Link } from '@inertiajs/react';

export default function PatternCard({ pattern }: { pattern: Pattern }) {
    return (
        <Link
            href={route('patterns.details', { pattern })}
            as="div"
            className="hover:bg-default-card grow basis-80 cursor-pointer rounded-md border p-4 pattern-card"
        >
            <div className="flex justify-between items-center flex-wrap mb-3">
            <h2 className="text-xl font-bold">{pattern.title}</h2>
            {pattern.category?.name && <p className="bg-secondary dark:bg-default-hover w-fit text-xs py-1 px-4 rounded-xl category-tag">{pattern.category?.name}</p>}
            </div>
            {pattern.pattern_previews?.[0] && <img src={pattern.pattern_previews[0].image_path} className="mx-auto my-2 max-h-46 rounded-sm" alt={`Preview of ${pattern.title}`}/>}
            <p className="mt-2">{pattern.description}</p>
        </Link>
    );
}
