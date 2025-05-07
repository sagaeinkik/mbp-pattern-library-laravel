import { useState } from 'react';

interface SelectListProps {
    label: string;
    options: string[];
    onChange: (value: string) => void;
    className?: string;
    listId: string;
}

export default function SelectList({ label, options, onChange, className, listId }: SelectListProps) {
    const [queryFilter, setQueryFilter] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setQueryFilter(value);
        onChange(value);
    };

    return (
        <div className="mt-1 mb-4">
            <label htmlFor={listId}>{label}</label>
            <select
                id={listId}
                className={`${className} border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                onChange={handleChange}
                value={queryFilter}
            >
                <option value="">All</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
